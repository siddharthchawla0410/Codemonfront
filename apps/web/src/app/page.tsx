'use client';

import { View, StyleSheet } from 'react-native';
import { Button, Typography, Card, Input } from '@repo/ui';
import { capitalize, formatDate } from '@repo/utils';
import type { User } from '@repo/types';

const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'john doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Home() {
  return (
    <View style={styles.content}>
        <Typography variant="h1" style={styles.title}>
          Welcome to Codemonfront
        </Typography>
        <Typography variant="body" color="secondary" style={styles.subtitle}>
          A monorepo with Next.js and React Native
        </Typography>

        <Card variant="elevated" style={styles.card}>
          <Typography variant="h3">Shared Components</Typography>
          <Typography variant="body" style={styles.cardText}>
            These components come from @repo/ui and work on both web and mobile.
          </Typography>

          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <View style={styles.buttonRow}>
            <Button title="Primary" variant="primary" />
            <Button title="Secondary" variant="secondary" />
            <Button title="Outline" variant="outline" />
          </View>
        </Card>

        <Card variant="outlined" style={styles.card}>
          <Typography variant="h3">Shared Utilities</Typography>
          <Typography variant="body" style={styles.cardText}>
            User: {capitalize(mockUser.name)}
          </Typography>
          <Typography variant="caption">
            Created: {formatDate(mockUser.createdAt)}
          </Typography>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    maxWidth: 800,
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  card: {
    marginBottom: 24,
  },
  cardText: {
    marginVertical: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
});
