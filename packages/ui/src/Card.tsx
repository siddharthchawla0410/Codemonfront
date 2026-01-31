import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { defaultTheme } from './theme';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  variant = 'elevated',
  padding = 'md',
  style,
  children,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        styles.base,
        styles[`${variant}Variant`],
        styles[`${padding}Padding`],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: defaultTheme.borderRadius.lg,
    overflow: 'hidden',
  },

  // Variants
  elevatedVariant: {
    backgroundColor: defaultTheme.colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlinedVariant: {
    backgroundColor: defaultTheme.colors.background,
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
  },
  filledVariant: {
    backgroundColor: defaultTheme.colors.surface,
  },

  // Padding
  nonePadding: {
    padding: 0,
  },
  smPadding: {
    padding: defaultTheme.spacing.sm,
  },
  mdPadding: {
    padding: defaultTheme.spacing.md,
  },
  lgPadding: {
    padding: defaultTheme.spacing.lg,
  },
});
