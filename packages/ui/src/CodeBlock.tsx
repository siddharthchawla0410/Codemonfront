import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// @ts-ignore
import lowlight from 'lowlight/lib/core';
// @ts-ignore
import langPython from 'highlight.js/lib/languages/python';
// @ts-ignore
import langJavaScript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import langJava from 'highlight.js/lib/languages/java';
import { defaultTheme } from './theme';

lowlight.registerLanguage('python', langPython);
lowlight.registerLanguage('javascript', langJavaScript);
lowlight.registerLanguage('java', langJava);

export interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  explanation?: string | null;
}

// atomOneDark token colors
const TOKEN_COLORS: Record<string, string> = {
  'hljs-keyword': '#c678dd',
  'hljs-built_in': '#e06c75',
  'hljs-type': '#e5c07b',
  'hljs-literal': '#d19a66',
  'hljs-number': '#d19a66',
  'hljs-string': '#98c379',
  'hljs-regexp': '#98c379',
  'hljs-subst': '#e06c75',
  'hljs-symbol': '#61afef',
  'hljs-class': '#e5c07b',
  'hljs-function': '#61afef',
  'hljs-title': '#61afef',
  'hljs-params': '#abb2bf',
  'hljs-comment': '#5c6370',
  'hljs-doctag': '#c678dd',
  'hljs-meta': '#5c6370',
  'hljs-attr': '#d19a66',
  'hljs-attribute': '#98c379',
  'hljs-name': '#e06c75',
  'hljs-tag': '#e06c75',
  'hljs-variable': '#e06c75',
  'hljs-template-variable': '#e06c75',
  'hljs-operator': '#56b6c2',
  'hljs-punctuation': '#abb2bf',
  'hljs-section': '#e06c75',
  'hljs-link': '#98c379',
};

const DEFAULT_COLOR = '#abb2bf';

const LANGUAGE_MAP: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
};

type HastNode = {
  type: 'text' | 'element';
  value?: string;
  properties?: { className?: string[] };
  children?: HastNode[];
};

function renderNodes(nodes: HastNode[], color: string, keyPrefix: string): React.ReactNode {
  return nodes.map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.type === 'text') {
      return <Text key={key} style={{ color }}>{node.value}</Text>;
    }
    if (node.type === 'element' && node.children) {
      const cls = node.properties?.className?.[0];
      const nodeColor = (cls && TOKEN_COLORS[cls]) ?? color;
      return (
        <Text key={key} style={{ color: nodeColor }}>
          {renderNodes(node.children, nodeColor, key)}
        </Text>
      );
    }
    return null;
  });
}

export function CodeBlock({ code, language, title, explanation }: CodeBlockProps) {
  const lang = LANGUAGE_MAP[language.toLowerCase()] ?? 'javascript';

  let nodes: HastNode[] = [];
  try {
    nodes = lowlight.highlight(lang, code).value as HastNode[];
  } catch {
    nodes = [{ type: 'text', value: code }];
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.languageLabel}>{title || language}</Text>
        <Text style={styles.languageBadge}>{language}</Text>
      </View>
      <ScrollView horizontal style={styles.codeScroll} contentContainerStyle={styles.codeContent}>
        <Text style={styles.code}>
          {renderNodes(nodes, DEFAULT_COLOR, 'root')}
        </Text>
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
  codeContent: {
    padding: 16,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
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
