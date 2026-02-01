'use client';

import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Sidebar, CodeIcon, Typography } from '@repo/ui';
import type { SidebarItem } from '@repo/ui';
import type { Operation, ComplexityLevel } from '@repo/types';
import { fetchOperations, formatComplexityLabel } from '@repo/utils';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [complexity, setComplexity] = useState<ComplexityLevel>('single_file_single_thread');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOperations() {
      setLoading(true);
      try {
        const data = await fetchOperations(complexity);
        setOperations(data);
        if (data.length > 0 && !activeItemId) {
          setActiveItemId(data[0].slug);
        }
      } catch (error) {
        console.error('Failed to fetch operations:', error);
      } finally {
        setLoading(false);
      }
    }

    loadOperations();
  }, [complexity]);

  const menuItems: SidebarItem[] = operations.map((op) => ({
    id: op.slug,
    label: op.name,
    icon: <CodeIcon color={activeItemId === op.slug ? '#3B82F6' : undefined} />,
    onPress: () => setActiveItemId(op.slug),
  }));

  return (
    <View style={styles.container}>
      <Sidebar
        items={menuItems}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        activeItemId={activeItemId ?? undefined}
        header={
          <Typography variant="h3" style={styles.headerText}>
            {formatComplexityLabel(complexity)}
          </Typography>
        }
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
  headerText: {
    fontSize: 14,
  },
});
