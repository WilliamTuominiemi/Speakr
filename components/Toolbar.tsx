import SignInButton from '@/components/SignInButton';

const Toolbar = () => {
  return (
    <div className="bg-gray-700 p-4 min-h-20 flex items-center shadow-lg justify-between w-11/12 rounded-tl-xl rounded-br-lg">
      <div className="flex items-center">
        <span className="text-2xl font-bold">William</span>
        <SignInButton />
      </div>
      <button className="text-lg">⚙️</button>
    </div>
  );
};

export default Toolbar;
