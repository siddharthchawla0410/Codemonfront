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

const MAX_LANGUAGES = 3;

export default function Home() {
  const router = useRouter();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<ComplexityLevel | null>(null);

  const canContinue = selectedLanguages.length > 0 && selectedComplexity;

  const handleLanguageToggle = (langId: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(langId)) {
        // Remove if already selected
        return prev.filter((id) => id !== langId);
      } else if (prev.length < MAX_LANGUAGES) {
        // Add if under limit
        return [...prev, langId];
      }
      // At limit, don't add
      return prev;
    });
  };

  const handleContinue = () => {
    if (canContinue) {
      const languagesParam = selectedLanguages.join(',');
      router.push({
        pathname: '/browse',
        params: { languages: languagesParam, complexity: selectedComplexity },
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
            Select Languages (up to {MAX_LANGUAGES})
          </Typography>
          <View style={styles.optionsGrid}>
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguages.includes(lang.id);
              const isDisabled = !isSelected && selectedLanguages.length >= MAX_LANGUAGES;
              return (
                <Pressable
                  key={lang.id}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected,
                    isDisabled && styles.optionButtonDisabled,
                  ]}
                  onPress={() => handleLanguageToggle(lang.id)}
                  disabled={isDisabled}
                >
                  <Typography
                    variant="body"
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                      isDisabled && styles.optionTextDisabled,
                    ]}
                  >
                    {lang.name}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
          {selectedLanguages.length > 0 && (
            <Typography variant="caption" color="secondary" style={styles.selectionCount}>
              {selectedLanguages.length} of {MAX_LANGUAGES} selected
            </Typography>
          )}
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
  optionButtonDisabled: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    opacity: 0.5,
  },
  optionText: {
    color: '#374151',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  optionTextDisabled: {
    color: '#9CA3AF',
  },
  selectionCount: {
    marginTop: 12,
  },
  continueButton: {
    marginTop: 8,
  },
});
