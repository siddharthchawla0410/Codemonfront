import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { defaultTheme } from './theme';

export interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  explanation?: string | null;
}

const LANGUAGE_MAP: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  typescript: 'typescript',
};

function toHighlighterLanguage(language: string): string {
  return LANGUAGE_MAP[language.toLowerCase()] ?? language.toLowerCase();
}

export function CodeBlock({ code, language, title, explanation }: CodeBlockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.languageLabel}>{title || language}</Text>
        <Text style={styles.languageBadge}>{language}</Text>
      </View>
      <ScrollView horizontal style={styles.codeScroll}>
        <SyntaxHighlighter
          language={toHighlighterLanguage(language)}
          style={atomOneDark}
          customStyle={{ backgroundColor: '#0F172A', padding: 16, margin: 0, fontSize: 13 }}
        >
          {code}
        </SyntaxHighlighter>
      </ScrollView>
      {explanation ? (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanation}>{explanation}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: defaultTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
  },
  languageLabel: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
  },
  languageBadge: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  codeScroll: {
    backgroundColor: '#0F172A',
  },
  explanationContainer: {
    padding: 12,
    backgroundColor: defaultTheme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: defaultTheme.colors.border,
  },
  explanation: {
    fontSize: 13,
    lineHeight: 18,
    color: defaultTheme.colors.textSecondary,
  },
});
