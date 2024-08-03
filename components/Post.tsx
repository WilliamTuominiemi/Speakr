'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

import Player from '@/components/Player';

interface User {
  name: string;
  image: string;
}

interface Reply {
  id: string;
  base64: string;
  createdAt: string;
  userId: string;
  user: User;
}

interface PostProps {
  post: {
    base64: string;
    createdAt: string;
    id: string;
    userId: string;
    user: User;
    replies: Reply[];
  };
  onReplyClick: (postId: string) => void;
}

const Post: React.FC<PostProps> = ({ post, onReplyClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formattedTime = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleReply = () => {
    onReplyClick(post.id);
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
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded-md"
          onClick={toggleReply}
        >
          <Image src="/icons/reply.svg" alt="Share" width={25} height={25} />
        </button>
        <button
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1 px-4 rounded-md ml-auto flex items-center"
          onClick={toggleDropdown}
          disabled={post.replies.length == 0}
        >
          <p className="text-xs mr-2">{post.replies.length} replies</p>
          <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.5 }}>
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
            {post.replies.length > 0 ? (
              post.replies.map((reply) => (
                <div key={reply.id} className="m-2 border-b border-gray-500 pb-2">
                  <div className="flex items-center mb-1">
                    <Image
                      src={reply.user.image}
                      alt="Reply Profile Picture"
                      className="w-5 h-5 rounded-full mr-2"
                      width={30}
                      height={30}
                    />
                    <h2 className="text-sm font-semibold">{reply.user.name}</h2>
                  </div>
                  <div className="p-2 flex flex-row ">
                    <Player base64={reply.base64} />
                    <p className="text-gray-400 text-xs">
                      Replied {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No replies yet</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Post;
