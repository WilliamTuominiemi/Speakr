'use client';

import { useEffect, useState } from 'react';
import { getLocalStream, startRecording, stopRecording } from '@/utils/mediaUtils';

export default function Home() {
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const sendTestToDB = async () => {
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Data from server:', data);
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  useEffect(() => {
    sendTestToDB();
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
