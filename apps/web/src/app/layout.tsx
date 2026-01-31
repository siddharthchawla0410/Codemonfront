import type { Metadata } from 'next';
import './globals.css';
import { SidebarLayout } from '@/components/SidebarLayout';

export const metadata: Metadata = {
  title: 'Codemonfront Web',
  description: 'Web application built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
