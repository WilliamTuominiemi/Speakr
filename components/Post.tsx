'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formattedTime = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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
        <button
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1 px-4 rounded-md ml-auto"
          onClick={toggleDropdown}
        >
          <motion.div className="ml-auto" animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 1 }}>
            <Image src="/icons/dropdown.svg" alt="Dropdown" width={20} height={20} />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-gray-600 text-white p-2 rounded-md">
              {/* Dropdown content goes here */}
              Lots and lots of replies
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Post;
