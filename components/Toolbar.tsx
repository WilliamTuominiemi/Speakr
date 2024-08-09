import React, { useState } from 'react';

import Image from 'next/image';
import { FiSettings } from 'react-icons/fi';

import SignInButton from '@/components/SignInButton';
import SignOutButton from '@/components/SignOutButton';
import ThemeSwitch from '@/components/ThemeSwitch';

interface ToolbarProps {
  status: string;
  username: string;
  image: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ status, username, image }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-zinc-300 dark:bg-gray-700 outline outline-1 outline-zinc-400 p-4 min-h-20 flex items-center shadow-lg justify-between w-11/12 rounded-tl-xl rounded-br-lg">
      {status === 'loading' ? (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-500 rounded-full mr-4 animate-pulse" />
          <div className="w-32 h-6 bg-gray-500 rounded animate-pulse" />
        </div>
      ) : (
        <>
          {username ? (
            <>
              <div className="flex items-center">
                <Image
                  src={image}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full mr-4"
                  width={50}
                  height={50}
                />
                <span className="text-2xl font-bold">{username}</span>
              </div>
              <FiSettings onClick={toggleMenu} />
            </>
          ) : (
            <>
              <SignInButton />
              <Link href="https://github.com/WilliamTuominiemi/Speakr">GitHub</Link>
              <ThemeSwitch />
            </>
          )}

          {isMenuOpen && (
            <div className="absolute bottom-full right-2 mb-2 bg-zinc-300 dark:bg-gray-700 border border-gray-300 rounded shadow-lg">
              <div className="p-2 flex flex-col text-lg content-center items-center space-y-2">
                <SignOutButton />
                <ThemeSwitch />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Toolbar;
