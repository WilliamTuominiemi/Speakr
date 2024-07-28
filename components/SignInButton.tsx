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
    >
      Sign in
    </button>
  );
};

export default SignInButton;
