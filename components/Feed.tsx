import { useQuery } from '@tanstack/react-query';

import Post from '@/components/Post';

// interface AudioData {
//   id: string;
//   base64: string;
//   createdAt: string;
// }

const Feed = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetch('/api/audio').then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center flex-1 overflow-y-auto scrollbar-thin">
      <div className="w-1/2">
        <h1 className="text-white text-3xl mb-4 pt-5">🗣️ Speakr</h1>
        <p className="text-white text-lg mb-4">What others have to say:</p>
      </div>
      <div className="flex-1 w-1/2 overflow-y-auto">
        {isPending && <p className="text-sm">Loading...</p>}
        {error && <p className="text-sm">An error has occurred: {error.message}</p>}
        {data && data.length === 0 && <p className="text-sm">No one has posted yet, be the first one.</p>}
        {data &&
          data.length > 0 &&
          data.map((item) => <Post key={item.id} base64={item.base64} createdAt={item.createdAt} />)}
      </div>
    </div>
  );
};

export default Feed;
