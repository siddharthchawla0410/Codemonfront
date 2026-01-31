import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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

          <View style={styles.buttonColumn}>
            <Button title="Primary" variant="primary" style={styles.button} />
            <Button title="Secondary" variant="secondary" style={styles.button} />
            <Button title="Outline" variant="outline" style={styles.button} />
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

        <Card variant="filled" style={styles.card}>
          <Typography variant="h3">Shared Types</Typography>
          <Typography variant="body" style={styles.cardText}>
            TypeScript interfaces are shared between platforms.
          </Typography>
          <Typography variant="caption">
            Email: {mockUser.email}
          </Typography>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  cardText: {
    marginVertical: 12,
  },
  buttonColumn: {
    marginTop: 16,
    gap: 12,
  },
  button: {
    width: '100%',
  },
});
