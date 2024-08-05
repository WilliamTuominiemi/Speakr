import Post from '@/components/Post';
import { useQuery } from '@tanstack/react-query';

const Feed = ({ replying }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/audio').then((res) => res.json()),
  });

  const handleReplyClick = (postId: string) => {
    replying(postId);
  };

  return (
    <div className="flex flex-col justify-center items-center flex-1 overflow-y-auto ">
      <div className="w-1/2">
        <h1 className=" text-3xl mb-4 pt-5">🗣️ Speakr</h1>
        <p className=" text-lg mb-4">What others have to say:</p>
      </div>
      <div className="flex-1 w-2/5 overflow-y-auto p-4">
        {isPending && (
          <div className="flex flex-col space-y-6">
            <div className="h-20 bg-gray-500 rounded animate-pulse" />
            <div className="h-20 bg-gray-500 rounded animate-pulse" />
            <div className="h-20 bg-gray-500 rounded animate-pulse" />
          </div>
        )}

        {error && <p className="text-sm text-red-500">An error has occurred: {error.message}</p>}

        {data && data.length === 0 && !isPending && <p className="text-sm">No one has posted yet, be the first one.</p>}

        {data &&
          data.length > 0 &&
          !isPending &&
          data.map((item) => <Post key={item.id} post={item} onReplyClick={handleReplyClick} />)}
      </div>
    </div>
  );
};

export default Feed;
