import React from 'react';
import { Text as RNText, StyleSheet, type TextProps as RNTextProps } from 'react-native';
import { defaultTheme } from './theme';

export interface TypographyProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'error' | 'success';
}

export function Typography({
  variant = 'body',
  color,
  style,
  children,
  ...props
}: TypographyProps) {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        color && styles[`${color}Color`],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: defaultTheme.colors.text,
  },

  // Variants
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: defaultTheme.colors.textSecondary,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },

  // Colors
  primaryColor: {
    color: defaultTheme.colors.primary,
  },
  secondaryColor: {
    color: defaultTheme.colors.textSecondary,
  },
  errorColor: {
    color: defaultTheme.colors.error,
  },
  successColor: {
    color: defaultTheme.colors.success,
  },
});
