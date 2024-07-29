'use client';

import { signOut } from 'next-auth/react';

const signOutButton = () => {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </button>
  );
};

export default signOutButton;
