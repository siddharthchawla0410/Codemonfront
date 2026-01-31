import type { Theme } from '@repo/types';

export const defaultTheme: Theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6366F1',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#60A5FA',
    secondary: '#818CF8',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    error: '#F87171',
    success: '#4ADE80',
    warning: '#FBBF24',
  },
  spacing: defaultTheme.spacing,
  borderRadius: defaultTheme.borderRadius,
};
