'use client';

import { signIn } from 'next-auth/react';

const SignInButton = () => {
  return (
    <button
      onClick={async () => {
        await signIn('google', {
          redirect: false,
          callbackUrl: '/',
        });
      }}
      className="h-full text-white bg-teal-700 hover:bg-teal-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Sign in
    </button>
  );
};

export default SignInButton;
