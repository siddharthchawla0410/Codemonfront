import { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button, Typography, Card } from '@repo/ui';
import { formatComplexityLabel } from '@repo/utils';
import type { ComplexityLevel } from '@repo/types';

const LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
];

const COMPLEXITY_LEVELS: ComplexityLevel[] = [
  'single_file_single_thread',
  'multiple_files_single_thread',
  'asynchronous',
  'multithreading',
];

export default function Home() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedComplexity, setSelectedComplexity] = useState<ComplexityLevel | null>(null);

  const canContinue = selectedLanguage && selectedComplexity;

  const handleContinue = () => {
    if (canContinue) {
      router.push({
        pathname: '/browse',
        params: { language: selectedLanguage, complexity: selectedComplexity },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Typography variant="h1" style={styles.title}>
          Codemon
        </Typography>
        <Typography variant="body" color="secondary" style={styles.subtitle}>
          Compare boilerplate code across programming languages
        </Typography>

        {/* Language Selection */}
        <Card variant="elevated" style={styles.card}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Select Language
          </Typography>
          <View style={styles.optionsGrid}>
            {LANGUAGES.map((lang) => (
              <Pressable
                key={lang.id}
                style={[
                  styles.optionButton,
                  selectedLanguage === lang.id && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedLanguage(lang.id)}
              >
                <Typography
                  variant="body"
                  style={[
                    styles.optionText,
                    selectedLanguage === lang.id && styles.optionTextSelected,
                  ]}
                >
                  {lang.name}
                </Typography>
              </Pressable>
            ))}
          </View>
        </Card>

        {/* Complexity Selection */}
        <Card variant="elevated" style={styles.card}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Select Complexity
          </Typography>
          <View style={styles.optionsColumn}>
            {COMPLEXITY_LEVELS.map((complexity) => (
              <Pressable
                key={complexity}
                style={[
                  styles.optionButton,
                  styles.complexityButton,
                  selectedComplexity === complexity && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedComplexity(complexity)}
              >
                <Typography
                  variant="body"
                  style={[
                    styles.optionText,
                    selectedComplexity === complexity && styles.optionTextSelected,
                  ]}
                >
                  {formatComplexityLabel(complexity)}
                </Typography>
              </Pressable>
            ))}
          </View>
        </Card>

        {/* Continue Button */}
        {canContinue && (
          <Button
            title="Continue"
            variant="primary"
            onPress={handleContinue}
            style={styles.continueButton}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionsColumn: {
    gap: 12,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  complexityButton: {
    width: '100%',
  },
  optionButtonSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  optionText: {
    color: '#374151',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  continueButton: {
    marginTop: 8,
  },
});
