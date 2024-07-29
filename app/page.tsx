'use client';

import Feed from '@/components/Feed';
import Controls from '@/components/Controls';
import SignInButton from '@/components/SignInButton';

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-2/3 bg-gray-800 mx-auto relative rounded-lg">
      <div className="flex flex-col justify-center items-center flex-1 overflow-y-auto scrollbar-thin">
        <div className="w-1/2">
          <h1 className="text-white text-3xl mb-4 pt-5">🗣️ Speakr</h1>
          <p className="text-white text-lg mb-4">What others have to say:</p>
        </div>
        <Feed />
      </div>

      <div className="sticky bottom-0 w-full flex flex-col items-end">
        <Controls />
        <div className="bg-gray-700 p-4 flex items-center shadow-lg justify-between w-11/12 rounded-tl-xl rounded-br-lg">
          <div className="flex items-center">
            <span className="text-2xl font-bold">William</span>
            <SignInButton />
          </div>
          <button className="text-lg">⚙️</button>
        </div>
      </div>
    </main>
  );
}
