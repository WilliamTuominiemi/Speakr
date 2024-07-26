'use client';

import { useEffect, useState } from 'react';
import { getLocalStream, startRecording, stopRecording } from '@/utils/mediaUtils';

interface AudioData {
  id: string;
  base64: string;
}

export default function Home() {
  const [audio, setAudio] = useState<string | null>(null);

  const [audios, setAudios] = useState<AudioData[] | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    getLocalStream(setError);
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

  const handleStartRecording = () => {
    if (audio) setAudio(null);
    setIsRecording(true);
    startRecording();
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    const base64Audio = await stopRecording();
    setAudio(base64Audio);
  };

  const uploadSound = async () => {
    try {
      const response = await fetch('/api/new', {
        method: 'POST',
        body: JSON.stringify({ audio }),
      });

      if (response.ok) {
        await getAudios();
        if (audio) setAudio(null);
      } else {
        console.error('Failed to upload audio');
      }
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  return (
    <main className="flex flex-col h-screen w-2/3 bg-gray-800 mx-auto relative ">
      <div className="flex flex-col justify-center items-center flex-1 overflow-y-scroll">
        <h1 className="text-white mb-4">🗣️ Speakr</h1>
        <p className="text-white mb-4">What others have to say:</p>

        {audios && (
          <div className="flex-1">
            {audios.map((audio) => (
              <div className="p-1" key={audio.id}>
                <audio src={audio.base64} controls />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-0">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="bg-gray-600 p-4 flex items-center space-x-2">
            <p>Speak: </p>
            <button
              className="rounded-lg p-1 text-2xl bg-blue-500"
              onClick={handleStartRecording}
              disabled={isRecording}
            >
              🎙️
            </button>
            <button
              className="rounded-lg p-1 text-2xl bg-blue-500"
              onClick={handleStopRecording}
              disabled={!isRecording}
            >
              🛑
            </button>

            {audio && (
              <div className="flex items-center space-x-2">
                <audio src={audio} controls />
                <button className="rounded-lg p-1 text-md bg-blue-500" type="button" onClick={uploadSound}>
                  Upload↗️
                </button>
              </div>
            )}
          </div>
        )}

        <div className=" bg-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-bold">William</span>
          </div>
          <button>⚙️</button>
        </div>
      </div>
    </main>
  );
}
