import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { defaultTheme } from './theme';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  onPress,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyles = [
    styles.base,
    styles[`${variant}Button`],
    styles[`${size}Size`],
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && !isDisabled && styles.pressed,
      ]}
      disabled={isDisabled}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFFFFF' : defaultTheme.colors.primary}
          size="small"
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: defaultTheme.borderRadius.md,
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },

  // Variants
  primaryButton: {
    backgroundColor: defaultTheme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: defaultTheme.colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: defaultTheme.colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },

  // Sizes
  smSize: {
    paddingHorizontal: defaultTheme.spacing.sm,
    paddingVertical: defaultTheme.spacing.xs,
    minHeight: 32,
  },
  mdSize: {
    paddingHorizontal: defaultTheme.spacing.md,
    paddingVertical: defaultTheme.spacing.sm,
    minHeight: 44,
  },
  lgSize: {
    paddingHorizontal: defaultTheme.spacing.lg,
    paddingVertical: defaultTheme.spacing.md,
    minHeight: 56,
  },

  // Text styles
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: defaultTheme.colors.primary,
  },
  ghostText: {
    color: defaultTheme.colors.primary,
  },

  // Text sizes
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },

  disabledText: {
    opacity: 0.7,
  },
});
