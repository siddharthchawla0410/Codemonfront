import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Typography } from './Typography';
import { defaultTheme } from './theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography variant="label" style={styles.label}>
          {label}
        </Typography>
      )}
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.inputFocused : undefined,
          error ? styles.inputError : undefined,
          style,
        ]}
        placeholderTextColor={defaultTheme.colors.textSecondary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && (
        <Typography variant="caption" color="error" style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: defaultTheme.spacing.md,
  },
  label: {
    marginBottom: defaultTheme.spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
    borderRadius: defaultTheme.borderRadius.md,
    paddingHorizontal: defaultTheme.spacing.md,
    fontSize: 16,
    color: defaultTheme.colors.text,
    backgroundColor: defaultTheme.colors.background,
  },
  inputFocused: {
    borderColor: defaultTheme.colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: defaultTheme.colors.error,
  },
  error: {
    marginTop: defaultTheme.spacing.xs,
  },
});
