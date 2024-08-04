import type { Metadata } from 'next';
import './globals.css';

import Provider from '@/components/Provider';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Speakr',
  description: 'Audio forum',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Providers>{children}</Providers>
        </Provider>
      </body>
    </html>
  );
}
