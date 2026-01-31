import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Typography } from './Typography';
import { defaultTheme } from './theme';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onToggle: () => void;
  expandedWidth?: number;
  collapsedWidth?: number;
  style?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  activeItemId?: string;
}

export function Sidebar({
  items,
  isOpen,
  onToggle,
  expandedWidth = 250,
  collapsedWidth = 60,
  style,
  header,
  footer,
  activeItemId,
}: SidebarProps) {
  const animatedWidth = useRef(new Animated.Value(isOpen ? expandedWidth : collapsedWidth)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isOpen ? expandedWidth : collapsedWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, expandedWidth, collapsedWidth]);

  return (
    <Animated.View style={[styles.container, { width: animatedWidth }, style]}>
      {/* Toggle Button */}
      <Pressable style={styles.toggleButton} onPress={onToggle}>
        <View style={styles.toggleIcon}>
          <View style={[styles.toggleBar, isOpen && styles.toggleBarRotateTop]} />
          <View style={[styles.toggleBar, !isOpen && styles.toggleBarMiddle]} />
          <View style={[styles.toggleBar, isOpen && styles.toggleBarRotateBottom]} />
        </View>
      </Pressable>

      {/* Header */}
      {header && isOpen && <View style={styles.header}>{header}</View>}

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.menuItem,
              activeItemId === item.id && styles.menuItemActive,
              pressed && styles.menuItemPressed,
            ]}
            onPress={item.onPress}
          >
            {item.icon && <View style={styles.menuIcon}>{item.icon}</View>}
            {isOpen && (
              <Typography
                variant="body"
                style={[
                  styles.menuLabel,
                  activeItemId === item.id && styles.menuLabelActive,
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Typography>
            )}
          </Pressable>
        ))}
      </View>

      {/* Footer */}
      {footer && isOpen && <View style={styles.footer}>{footer}</View>}
    </Animated.View>
  );
}

// Simple icon components for the sidebar
export function HomeIcon({ color = defaultTheme.colors.text }: { color?: string }) {
  return (
    <View style={iconStyles.container}>
      <View style={[iconStyles.homeRoof, { borderBottomColor: color }]} />
      <View style={[iconStyles.homeBase, { backgroundColor: color }]} />
    </View>
  );
}

export function SettingsIcon({ color = defaultTheme.colors.text }: { color?: string }) {
  return (
    <View style={iconStyles.container}>
      <View style={[iconStyles.settingsOuter, { borderColor: color }]} />
      <View style={[iconStyles.settingsInner, { backgroundColor: color }]} />
    </View>
  );
}

export function ProfileIcon({ color = defaultTheme.colors.text }: { color?: string }) {
  return (
    <View style={iconStyles.container}>
      <View style={[iconStyles.profileHead, { backgroundColor: color }]} />
      <View style={[iconStyles.profileBody, { backgroundColor: color }]} />
    </View>
  );
}

export function MenuIcon({ color = defaultTheme.colors.text }: { color?: string }) {
  return (
    <View style={iconStyles.menuContainer}>
      <View style={[iconStyles.menuBar, { backgroundColor: color }]} />
      <View style={[iconStyles.menuBar, { backgroundColor: color }]} />
      <View style={[iconStyles.menuBar, { backgroundColor: color }]} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    gap: 4,
  },
  menuBar: {
    width: 20,
    height: 2,
    borderRadius: 1,
  },
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeBase: {
    width: 14,
    height: 10,
    marginTop: -1,
  },
  settingsOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  settingsInner: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  profileHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 2,
  },
  profileBody: {
    width: 16,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultTheme.colors.surface,
    borderRightWidth: 1,
    borderRightColor: defaultTheme.colors.border,
    height: '100%' as any,
    overflow: 'hidden',
  },
  toggleButton: {
    padding: defaultTheme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: defaultTheme.colors.border,
  },
  toggleIcon: {
    width: 24,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBar: {
    width: 20,
    height: 2,
    backgroundColor: defaultTheme.colors.text,
    marginVertical: 2,
    borderRadius: 1,
  },
  toggleBarMiddle: {
    width: 14,
  },
  toggleBarRotateTop: {
    transform: [{ rotate: '45deg' }, { translateY: 4 }],
  },
  toggleBarRotateBottom: {
    transform: [{ rotate: '-45deg' }, { translateY: -4 }],
  },
  header: {
    padding: defaultTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: defaultTheme.colors.border,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: defaultTheme.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: defaultTheme.spacing.sm,
    paddingHorizontal: defaultTheme.spacing.md,
    marginHorizontal: defaultTheme.spacing.xs,
    borderRadius: defaultTheme.borderRadius.md,
  },
  menuItemActive: {
    backgroundColor: defaultTheme.colors.primary + '15',
  },
  menuItemPressed: {
    backgroundColor: defaultTheme.colors.border,
  },
  menuIcon: {
    width: 28,
    alignItems: 'center',
  },
  menuLabel: {
    marginLeft: defaultTheme.spacing.sm,
    flex: 1,
  },
  menuLabelActive: {
    color: defaultTheme.colors.primary,
    fontWeight: '600',
  },
  footer: {
    padding: defaultTheme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: defaultTheme.colors.border,
  },
});
