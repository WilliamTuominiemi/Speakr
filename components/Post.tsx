'use client';

import Image from 'next/image';

import Player from '@/components/Player';

interface PostProps {
  base64: string;
}

const Post: React.FC<PostProps> = ({ base64 }) => {
  return (
    <div className="w-full p-2 m-2 rounded-md bg-gray-700 outline outline-1 outline-slate-500">
      <div className="flex items-center mb-2">
        <Image src="/icons/user.svg" alt="Profile Picture" className="w-7 h-7 rounded-full mr-2" width={5} height={5} />
        <h2 className="text-lg font-bold">Username</h2>
      </div>
      <p className="text-gray-500 mb-2">Posted 2 hours ago</p>

      <div className="flex">
        <Player base64={base64} />
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">
          <Image src="/icons/reply.svg" alt="Share" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default Post;
