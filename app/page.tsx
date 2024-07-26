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

  useEffect(() => {
    getLocalStream(setError);

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

    getAudios();
  }, []);

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = async () => {
    const base64Audio = await stopRecording();
    setAudio(base64Audio);
    console.log('Base64 Audio String:', base64Audio);
  };

  const uploadSound = async () => {
    try {
      const response = await fetch('/api/new', {
        method: 'POST',
        body: JSON.stringify({ audio }),
      });
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Sound Thing</p>
      {error && <p className="error-message">{error}</p>}

      {audios && (
        <div>
          {audios.map((audio) => (
            <div key={audio.id}>
              <audio src={audio.base64} controls />
            </div>
          ))}
        </div>
      )}
      <div>
        <button onClick={handleStartRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>Stop Recording</button>
      </div>
      {audio && (
        <div>
          <audio src={audio} controls />
          <button type="button" onClick={uploadSound}>
            Upload
          </button>
        </div>
      )}
    </main>
  );
}
