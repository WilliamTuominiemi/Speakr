'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import Controls from '@/components/Controls';
import Feed from '@/components/Feed';
import Toolbar from '@/components/Toolbar';

export default function Home() {
  const { data: session, status } = useSession();

  const [reply, setReply] = useState<string | null>(null);

  const handleReply = (postId: string) => {
    if (postId == reply) {
      setReply(null);
    } else {
      setReply(postId);
    }
  };

  return (
    <main className="flex flex-col h-screen desktop:w-2/3 phone:w-11/12 bg-slate-100  dark:bg-gray-800 mx-auto relative desktop:rounded-lg outline outline-1 outline-zinc-500">
      <Feed replying={handleReply} />
      <div className="sticky bottom-0 w-full flex flex-col items-end">
        <Controls userId={session?.user.id} reply={reply} />
        <Toolbar status={status} username={session?.user.name} image={session?.user.image} />
      </div>
    </main>
  );
}
