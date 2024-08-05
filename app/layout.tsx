import type { Metadata } from 'next';
import './globals.css';

import { Session } from 'next-auth';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Speakr',
  description: 'Audio forum',
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session?: Session; }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
