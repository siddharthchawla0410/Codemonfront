'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Pressable, StyleSheet } from 'react-native';
import { Typography, Card, Button } from '@repo/ui';
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
      router.push(`/browse?languages=${languagesParam}&complexity=${selectedComplexity}`);
    }
  };

  return (
    <View style={styles.content}>
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
        <View style={styles.optionsGrid}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    maxWidth: 800,
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  card: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    minWidth: 180,
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
    alignSelf: 'flex-start',
  },
});
