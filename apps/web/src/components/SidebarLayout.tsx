'use client';

import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Sidebar, HomeIcon, SettingsIcon, ProfileIcon, Typography } from '@repo/ui';
import type { SidebarItem } from '@repo/ui';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItemId, setActiveItemId] = useState('home');

  const menuItems: SidebarItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon color={activeItemId === 'home' ? '#3B82F6' : undefined} />,
      onPress: () => setActiveItemId('home'),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <ProfileIcon color={activeItemId === 'profile' ? '#3B82F6' : undefined} />,
      onPress: () => setActiveItemId('profile'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon color={activeItemId === 'settings' ? '#3B82F6' : undefined} />,
      onPress: () => setActiveItemId('settings'),
    },
  ];

  return (
    <View style={styles.container}>
      <Sidebar
        items={menuItems}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        activeItemId={activeItemId}
        header={<Typography variant="h3">Codemonfront</Typography>}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: '100vh' as any,
  },
  content: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});
