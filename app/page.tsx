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
      console.log(data);
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Speakr</h1>
      {error && <p className="error-message">{error}</p>}

      <div>
        <p>Speak: </p>
        <button className="text-3xl" onClick={handleStartRecording} disabled={isRecording}>
          ▶️
        </button>
        <button className="text-3xl" onClick={handleStopRecording} disabled={!isRecording}>
          ⏹️
        </button>
      </div>
      {audio && (
        <div>
          <audio src={audio} controls />
          <button type="button" onClick={uploadSound}>
            Upload
          </button>
        </div>
      )}

      {audios && (
        <div>
          <p>What others have to say:</p>
          {audios.map((audio) => (
            <div className="p-1" key={audio.id}>
              <audio src={audio.base64} controls />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
