'use client';

import { useEffect, useState } from 'react';
import { getLocalStream, startRecording, stopRecording } from '@/utils/mediaUtils';

export default function Home() {
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    getLocalStream();
  }, []);

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = async () => {
    const audioBlob = await stopRecording();
    const url = URL.createObjectURL(audioBlob);
    setAudioURL(url);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Sound Thing</p>
      <div>
        <button onClick={handleStartRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>Stop Recording</button>
      </div>
      {audioURL && (
        <div>
          <audio src={audioURL} controls />
        </div>
      )}
    </main>
  );
}
