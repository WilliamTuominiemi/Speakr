'use client';

import { useEffect, useState } from 'react';
import { getLocalStream, startRecording, stopRecording } from '@/utils/mediaUtils';

export default function Home() {
  const [audio, setAudio] = useState<string | null>(null);

  useEffect(() => {
    getLocalStream();
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
      const response = await fetch('/api/test', {
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
