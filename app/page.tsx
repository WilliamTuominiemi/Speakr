'use client';

import Feed from '@/components/Feed';
import Controls from '@/components/Controls';
import Toolbar from '@/components/Toolbar';

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-2/3 bg-gray-800 mx-auto relative rounded-lg">
      <Feed />
      <div className="sticky bottom-0 w-full flex flex-col items-end">
        <Controls />
        <Toolbar />
      </div>
    </main>
  );
}
