import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coding Turf',
  description: 'Compare boilerplate code across programming languages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7966243121986483"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
