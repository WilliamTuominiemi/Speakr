'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

import Player from '@/components/Player';

interface PostProps {
  post: {
    base64: string;
    createdAt: string;
    id: string;
    userId: string;
    user: {
      name: string;
      image: string;
    };
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const formattedTime = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <div className="w-11/12 p-4 m-1 mb-5 rounded-md bg-gray-700 outline outline-1 outline-slate-500">
      <div className="flex items-center mb-2">
        <Image
          src={post.user.image}
          alt="Profile Picture"
          className="w-7 h-7 rounded-full mr-2"
          width={50}
          height={50}
        />
        <h2 className="text-lg">{post.user.name}</h2>
      </div>
      <p className="text-gray-500 mb-2">Posted {formattedTime}</p>

      <div className="flex">
        <Player base64={post.base64} />
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded-md">
          <Image src="/icons/reply.svg" alt="Share" width={25} height={25} />
        </button>
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1 px-4 rounded-md ml-auto">
          <Image src="/icons/dropdown.svg" alt="Share" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default Post;
