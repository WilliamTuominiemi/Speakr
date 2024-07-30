'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import Feed from '@/components/Feed';
import Controls from '@/components/Controls';
import Toolbar from '@/components/Toolbar';

const queryClient = new QueryClient();

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col h-screen w-2/3 bg-gray-800 mx-auto relative rounded-lg">
        <Feed />
        <div className="sticky bottom-0 w-full flex flex-col items-end">
          <Controls userId={session?.user.id} />
          <Toolbar status={status} username={session?.user.name} image={session?.user.image} />
        </div>
      </main>
    </QueryClientProvider>
  );
}
