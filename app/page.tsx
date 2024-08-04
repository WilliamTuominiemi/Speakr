'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import Feed from '@/components/Feed';
import Controls from '@/components/Controls';
import Toolbar from '@/components/Toolbar';

const queryClient = new QueryClient();

export default function Home() {
  const { data: session, status } = useSession();
  const refreshFeedRef = useRef<() => void>(() => {});

  const [reply, SetReply] = useState<string | null>(null);

  const handleReply = (postId: string) => {
    if (postId == reply) SetReply(null);
    else SetReply(postId);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col h-screen w-2/3 bg-slate-100 text-black dark:bg-gray-800 dark:text-white  mx-auto relative rounded-lg outline outline-1 outline-zinc-500">
        <Feed onRefresh={(refreshFeed) => (refreshFeedRef.current = refreshFeed)} replying={handleReply} />
        <div className="sticky bottom-0 w-full flex flex-col items-end">
          <Controls userId={session?.user.id} refreshFeed={() => refreshFeedRef.current()} reply={reply} />
          <Toolbar status={status} username={session?.user.name} image={session?.user.image} />
        </div>
      </main>
    </QueryClientProvider>
  );
}
