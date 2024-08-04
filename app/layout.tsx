import type { Metadata } from 'next';
import './globals.css';

import Provider from '@/components/Provider';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Speakr',
  description: 'Audio forum',
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider session={session}>
          <Providers>{children}</Providers>
        </Provider>
      </body>
    </html>
  );
}
