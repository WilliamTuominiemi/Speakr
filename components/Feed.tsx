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
    <>
      {audios && (
        <div className="flex-1 w-1/2 overflow-y-auto">
          {audios.map((audio) => (
            <Post key={audio.id} base64={audio.base64} createdAt={audio.createdAt} />
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
