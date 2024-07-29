import Image from 'next/image';

import SignInButton from '@/components/SignInButton';

interface ToolbarProps {
  username: string;
  image: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ username, image }) => {
  return (
    <div className="bg-gray-700 p-4 min-h-20 flex items-center shadow-lg justify-between w-11/12 rounded-tl-xl rounded-br-lg">
      <div className="flex items-center">
        {username ? (
          <>
            <Image src={image} alt="Profile Picture" className="w-7 h-7 rounded-full mr-2" width={5} height={5} />
            <span className="text-2xl font-bold">{username}</span>
          </>
        ) : (
          <SignInButton />
        )}
      </div>
      <button className="text-lg">⚙️</button>
    </div>
  );
};

export default Toolbar;
