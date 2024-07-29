'use client';

import Post from '@/components/Post';

import { useEffect, useState } from 'react';

interface AudioData {
  id: string;
  base64: string;
  createdAt: string;
}

const Feed = () => {
  const [audios, setAudios] = useState<AudioData[] | null>(null);

  useEffect(() => {
    getAudios();
  }, []);

  const getAudios = async () => {
    try {
      const response = await fetch('/api/audio');
      if (!response.ok) {
        throw new Error('Failed to fetch audios');
      }
      const data: AudioData[] = await response.json();
      setAudios(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-1 overflow-y-auto scrollbar-thin">
      <div className="w-1/2">
        <h1 className="text-white text-3xl mb-4 pt-5">🗣️ Speakr</h1>
        <p className="text-white text-lg mb-4">What others have to say:</p>
      </div>
      {audios && (
        <div className="flex-1 w-1/2 overflow-y-auto">
          {audios.map((audio) => (
            <Post key={audio.id} base64={audio.base64} createdAt={audio.createdAt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
