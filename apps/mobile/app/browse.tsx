import { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer, MenuIcon, CodeIcon, Typography, Card } from '@repo/ui';
import type { DrawerItem } from '@repo/ui';
import type { Operation, ComplexityLevel } from '@repo/types';
import { fetchOperations, formatComplexityLabel } from '@repo/utils';

const LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
];

const VALID_COMPLEXITIES: ComplexityLevel[] = [
  'single_file_single_thread',
  'multiple_files_single_thread',
  'asynchronous',
  'multithreading',
];

export default function BrowseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ languages: string; complexity: string }>();

  const languagesParam = params.languages;
  const complexity = params.complexity as ComplexityLevel;

  // Parse languages from comma-separated string
  const selectedLanguages = languagesParam ? languagesParam.split(',').filter(Boolean) : [];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);

  // Validate params
  useEffect(() => {
    if (selectedLanguages.length === 0 || !complexity) {
      router.replace('/');
      return;
    }

    if (!VALID_COMPLEXITIES.includes(complexity)) {
      router.replace('/');
      return;
    }

    // Validate all selected languages
    const allLanguagesValid = selectedLanguages.every(lang => LANGUAGES.find(l => l.id === lang));
    if (!allLanguagesValid) {
      router.replace('/');
      return;
    }
  }, [selectedLanguages, complexity, router]);

  // Fetch operations
  useEffect(() => {
    if (!complexity || !VALID_COMPLEXITIES.includes(complexity)) return;

    async function loadOperations() {
      try {
        const data = await fetchOperations(complexity);
        setOperations(data);
        if (data.length > 0 && !activeOperation) {
          setActiveOperation(data[0].slug);
        }
      } catch (error) {
        console.error('Failed to fetch operations:', error);
        setOperations([]);
      }
    }

    loadOperations();
  }, [complexity]);

  const menuItems: DrawerItem[] = operations.map((op) => ({
    id: op.slug,
    label: op.name,
    icon: <CodeIcon color={activeOperation === op.slug ? '#3B82F6' : undefined} />,
    onPress: () => setActiveOperation(op.slug),
  }));

  // Get language names for display
  const languageNames = selectedLanguages
    .map(id => LANGUAGES.find(l => l.id === id)?.name || id)
    .join(', ');

  if (selectedLanguages.length === 0 || !complexity) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: languageNames,
          headerLeft: () => (
            <Pressable onPress={() => setIsDrawerOpen(true)} style={styles.menuButton}>
              <MenuIcon color="#fff" />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
          <Typography variant="h2" style={styles.title}>
            {languageNames}
          </Typography>
          <Typography variant="body" color="secondary" style={styles.subtitle}>
            {formatComplexityLabel(complexity)}
          </Typography>

          {activeOperation ? (
            <Card variant="elevated" style={styles.card}>
              <Typography variant="h3" style={styles.operationTitle}>
                {activeOperation.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Typography>
              <Typography variant="body" color="secondary">
                Select an operation from the menu to view code snippets
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
      </SafeAreaView>

      <Drawer
        items={menuItems}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeItemId={activeOperation ?? undefined}
        header={
          <View>
            <Typography variant="h2">{formatComplexityLabel(complexity)}</Typography>
            <Typography variant="caption">Operations</Typography>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  operationTitle: {
    marginBottom: 12,
  },
  menuButton: {
    padding: 8,
    marginLeft: 8,
  },
});
