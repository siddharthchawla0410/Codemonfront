import React, { useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  Modal,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Typography } from './Typography';
import { defaultTheme } from './theme';

export interface DrawerItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

export interface DrawerProps {
  items: DrawerItem[];
  isOpen: boolean;
  onClose: () => void;
  width?: number;
  style?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  activeItemId?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function Drawer({
  items,
  isOpen,
  onClose,
  width = 280,
  style,
  header,
  footer,
  activeItemId,
}: DrawerProps) {
  const translateX = useRef(new Animated.Value(-width)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -width,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, width]);

  if (!isOpen) return null;

  return (
    <Modal transparent visible={isOpen} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity }]}>
          <Pressable style={styles.backdropPressable} onPress={onClose} />
        </Animated.View>

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawer,
            { width, transform: [{ translateX }] },
            style,
          ]}
        >
          {/* Header */}
          {header && <View style={styles.header}>{header}</View>}

          {/* Menu Items */}
          <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={true}>
            {items.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.menuItem,
                  activeItemId === item.id && styles.menuItemActive,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => {
                  item.onPress?.();
                  onClose();
                }}
              >
                {item.icon && <View style={styles.menuIcon}>{item.icon}</View>}
                <Typography
                  variant="body"
                  style={[
                    styles.menuLabel,
                    activeItemId === item.id && styles.menuLabelActive,
                  ]}
                >
                  {item.label}
                </Typography>
              </Pressable>
            ))}
          </ScrollView>

          {/* Footer */}
          {footer && <View style={styles.footer}>{footer}</View>}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropPressable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: defaultTheme.colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    padding: defaultTheme.spacing.lg,
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
    paddingVertical: defaultTheme.spacing.md,
    paddingHorizontal: defaultTheme.spacing.lg,
  },
  menuItemActive: {
    backgroundColor: defaultTheme.colors.primary + '15',
  },
  menuItemPressed: {
    backgroundColor: defaultTheme.colors.border,
  },
  menuIcon: {
    width: 32,
    alignItems: 'center',
  },
  menuLabel: {
    marginLeft: defaultTheme.spacing.md,
    flex: 1,
  },
  menuLabelActive: {
    color: defaultTheme.colors.primary,
    fontWeight: '600',
  },
  footer: {
    padding: defaultTheme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: defaultTheme.colors.border,
  },
});
