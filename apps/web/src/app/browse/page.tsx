'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { View, StyleSheet } from 'react-native';
import { Typography, Card } from '@repo/ui';
import { SidebarLayout } from '@/components/SidebarLayout';
import { formatComplexityLabel } from '@repo/utils';
import type { ComplexityLevel } from '@repo/types';

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const languageParam = searchParams.get('language');
  const complexityParam = searchParams.get('complexity') as ComplexityLevel | null;

  const [activeOperation, setActiveOperation] = useState<string | null>(null);

  // Validate params and redirect if invalid
  useEffect(() => {
    if (!languageParam || !complexityParam) {
      router.push('/');
      return;
    }

    if (!VALID_COMPLEXITIES.includes(complexityParam)) {
      router.push('/');
      return;
    }

    if (!LANGUAGES.find(l => l.id === languageParam)) {
      router.push('/');
      return;
    }
  }, [languageParam, complexityParam, router]);

  // Don't render if params are invalid
  if (!languageParam || !complexityParam || !VALID_COMPLEXITIES.includes(complexityParam)) {
    return null;
  }

  const languageName = LANGUAGES.find(l => l.id === languageParam)?.name || languageParam;

  return (
    <SidebarLayout
      complexity={complexityParam}
      activeOperation={activeOperation}
      onOperationSelect={setActiveOperation}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            {languageName}
          </Typography>
          <Typography variant="body" color="secondary">
            {formatComplexityLabel(complexityParam)}
          </Typography>
        </View>

        {activeOperation ? (
          <Card variant="elevated" style={styles.card}>
            <Typography variant="h3" style={styles.operationTitle}>
              {activeOperation.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </Typography>
            <Typography variant="body" color="secondary" style={styles.operationDescription}>
              Select an operation from the sidebar to view code snippets
            </Typography>
          </Card>
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
    marginBottom: 12,
  },
  operationDescription: {
    marginTop: 8,
  },
});
