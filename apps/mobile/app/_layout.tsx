import { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Drawer, MenuIcon, HomeIcon, ProfileIcon, SettingsIcon, Typography } from '@repo/ui';
import type { DrawerItem } from '@repo/ui';

export default function RootLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('home');

  const menuItems: DrawerItem[] = [
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
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3B82F6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => (
            <Pressable
              onPress={() => setIsDrawerOpen(true)}
              style={styles.menuButton}
            >
              <MenuIcon color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Drawer
        items={menuItems}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeItemId={activeItemId}
        header={
          <View>
            <Typography variant="h2">Codemonfront</Typography>
            <Typography variant="caption">Mobile App</Typography>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
    marginLeft: 8,
  },
});
