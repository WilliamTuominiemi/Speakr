import React, { useState } from 'react';

import Image from 'next/image';

import SignInButton from '@/components/SignInButton';
import SignOutButton from '@/components/SignOutButton';

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
    <div className="bg-gray-700 p-4 min-h-20 flex items-center shadow-lg justify-between w-11/12 rounded-tl-xl rounded-br-lg">
      {status === 'loading' ? (
        <span className="font-bold pl-10">Loading...</span>
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
              <button className="text-2xl" onClick={toggleMenu}>
                ⚙️
              </button>
            </>
          ) : (
            <SignInButton />
          )}

          {isMenuOpen && (
            <div className="absolute bottom-full right-2 mb-2 bg-gray-700 border border-gray-300 rounded shadow-lg">
              <div className="p-2 flex flex-col text-lg">
                <SignOutButton />
                <button>Settings</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Toolbar;
