import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Codemon',
  description: 'Compare boilerplate code across programming languages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
