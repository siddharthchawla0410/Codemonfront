import { useState, useEffect } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Drawer, MenuIcon, CodeIcon, Typography } from '@repo/ui';
import type { DrawerItem } from '@repo/ui';
import type { Operation, ComplexityLevel } from '@repo/types';
import { fetchOperations, formatComplexityLabel } from '@repo/utils';

export default function RootLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [complexity, setComplexity] = useState<ComplexityLevel>('single_file_single_thread');

  useEffect(() => {
    async function loadOperations() {
      try {
        console.log('Fetching operations for complexity:', complexity);
        const data = await fetchOperations(complexity);
        console.log('Fetched operations:', data.length);
        setOperations(data);
        if (data.length > 0 && !activeItemId) {
          setActiveItemId(data[0].slug);
        }
      } catch (error) {
        console.error('Failed to fetch operations:', error);
        // Set empty array on error so UI doesn't break
        setOperations([]);
      }
    }

    loadOperations();
  }, [complexity]);

  const menuItems: DrawerItem[] = operations.map((op) => ({
    id: op.slug,
    label: op.name,
    icon: <CodeIcon color={activeItemId === op.slug ? '#3B82F6' : undefined} />,
    onPress: () => setActiveItemId(op.slug),
  }));

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
        activeItemId={activeItemId ?? undefined}
        header={
          <View>
            <Typography variant="h2">{formatComplexityLabel(complexity)}</Typography>
            <Typography variant="caption">Operations</Typography>
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
