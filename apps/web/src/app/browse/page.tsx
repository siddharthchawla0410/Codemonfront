'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Typography, Card, CodeBlock } from '@repo/ui';
import { SidebarLayout } from '@/components/SidebarLayout';
import { formatComplexityLabel, fetchSnippetComparison } from '@repo/utils';
import type { ComplexityLevel, SnippetComparison } from '@repo/types';

const VALID_COMPLEXITIES: ComplexityLevel[] = [
  'single_file_single_thread',
  'multiple_files_single_thread',
  'asynchronous',
  'multithreading',
];

const LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
];

export default function BrowsePage() {
  return (
    <Suspense fallback={null}>
      <BrowseContent />
    </Suspense>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const languagesParam = searchParams.get('languages');
  const complexityParam = searchParams.get('complexity') as ComplexityLevel | null;

  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [comparison, setComparison] = useState<SnippetComparison | null>(null);
  const [snippetsLoading, setSnippetsLoading] = useState(false);

  // Parse languages from comma-separated string
  const selectedLanguages = languagesParam ? languagesParam.split(',').filter(Boolean) : [];

  // Validate params and redirect if invalid
  useEffect(() => {
    if (selectedLanguages.length === 0 || !complexityParam) {
      router.push('/');
      return;
    }

    if (!VALID_COMPLEXITIES.includes(complexityParam)) {
      router.push('/');
      return;
    }

    // Validate all selected languages
    const allLanguagesValid = selectedLanguages.every(lang => LANGUAGES.find(l => l.id === lang));
    if (!allLanguagesValid) {
      router.push('/');
      return;
    }
  }, [selectedLanguages, complexityParam, router]);

  // Fetch snippets when active operation changes
  useEffect(() => {
    if (!activeOperation || selectedLanguages.length === 0) {
      setComparison(null);
      return;
    }

    let cancelled = false;
    async function loadSnippets() {
      setSnippetsLoading(true);
      try {
        const data = await fetchSnippetComparison(selectedLanguages, activeOperation!);
        if (!cancelled) {
          setComparison(data);
        }
      } catch (error) {
        console.error('Failed to fetch snippets:', error);
        if (!cancelled) {
          setComparison(null);
        }
      } finally {
        if (!cancelled) {
          setSnippetsLoading(false);
        }
      }
    }

    loadSnippets();
    return () => { cancelled = true; };
  }, [activeOperation, languagesParam]);

  // Don't render if params are invalid
  if (selectedLanguages.length === 0 || !complexityParam || !VALID_COMPLEXITIES.includes(complexityParam)) {
    return null;
  }

  // Get language names for display
  const languageNames = selectedLanguages
    .map(id => LANGUAGES.find(l => l.id === id)?.name || id)
    .join(', ');

  const formatOperationName = (slug: string) =>
    slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <SidebarLayout
      complexity={complexityParam}
      activeOperation={activeOperation}
      onOperationSelect={setActiveOperation}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            {languageNames}
          </Typography>
          <Typography variant="body" color="secondary">
            {formatComplexityLabel(complexityParam)}
          </Typography>
        </View>

        {activeOperation ? (
          <View>
            <Typography variant="h2" style={styles.operationTitle}>
              {formatOperationName(activeOperation)}
            </Typography>
            {comparison?.operation.description ? (
              <Typography variant="body" color="secondary" style={styles.operationDescription}>
                {comparison.operation.description}
              </Typography>
            ) : null}

            {snippetsLoading ? (
              <Card variant="outlined" style={styles.card}>
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#3B82F6" />
                  <Typography variant="body" color="secondary" style={styles.loadingText}>
                    Loading snippets...
                  </Typography>
                </View>
              </Card>
            ) : comparison ? (
              <View style={styles.snippetsContainer}>
                {selectedLanguages.map((langSlug) => {
                  const snippet = comparison.snippets[langSlug];
                  const langName = LANGUAGES.find(l => l.id === langSlug)?.name || langSlug;

                  if (!snippet) {
                    return (
                      <Card key={langSlug} variant="outlined" style={styles.card}>
                        <Typography variant="body" color="secondary">
                          No snippet available for {langName}
                        </Typography>
                      </Card>
                    );
                  }

                  return (
                    <CodeBlock
                      key={langSlug}
                      code={snippet.code}
                      language={langName}
                      explanation={snippet.explanation}
                    />
                  );
                })}
              </View>
            ) : (
              <Card variant="outlined" style={styles.card}>
                <Typography variant="body" color="secondary">
                  No snippets found for this operation.
                </Typography>
              </Card>
            )}
          </View>
        ) : (
          <Card variant="outlined" style={styles.card}>
            <Typography variant="body" color="secondary">
              Loading operations...
            </Typography>
          </Card>
        )}
      </View>
    </SidebarLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    maxWidth: 1000,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  card: {
    marginBottom: 24,
  },
  operationTitle: {
    marginBottom: 4,
  },
  operationDescription: {
    marginBottom: 20,
  },
  snippetsContainer: {
    gap: 20,
    marginTop: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginLeft: 12,
  },
});
