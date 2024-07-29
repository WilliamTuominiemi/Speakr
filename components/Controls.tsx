import { useEffect, useState } from 'react';

import Image from 'next/image';

import { getLocalStream, startRecording, stopRecording } from '@/utils/mediaUtils';

import Player from '@/components/Player';

interface ControlsProps {
  userId: String;
}

const Controls: React.FC<ControlsProps> = ({ userId }) => {
  const [audio, setAudio] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    getLocalStream(setError);
  }, []);

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
        body: JSON.stringify({ userId, audio }),
      });
      if (response.ok) {
        if (audio) setAudio(null);
      } else {
        console.error('Failed to upload audio');
      }
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  return (
    <div className="bg-gray-600 p-4 w-10/12 min-h-20 rounded-tl-xl shadow-lg flex items-center space-x-5">
      {error ? (
        <p className="text-md error-message">{error}</p>
      ) : (
        <>
          <p className="text-xl">Say something: </p>

          {!isRecording ? (
            <button
              className="rounded-md p-3 pl-4 pr-4 h-full text-2xl bg-emerald-700 hover:bg-emerald-800"
              onClick={handleStartRecording}
              disabled={isRecording}
            >
              <Image src="/icons/microphone.svg" alt="Record" width={15} height={15} />
            </button>
          ) : (
            <>
              <button
                className="rounded-md p-3 pl-4 pr-4 h-full text-2xl bg-red-500 hover:bg-red-600"
                onClick={handleStopRecording}
                disabled={!isRecording}
              >
                <Image src="/icons/microphone-line.svg" alt="Stop recording" width={15} height={15} />
              </button>
            </>
          )}

          {audio && (
            <>
              <Player base64={audio} />

              <button
                className="rounded-md pl-4 pr-4 h-full text-md bg-teal-500 hover:bg-teal-600"
                type="button"
                onClick={uploadSound}
              >
                <Image src="/icons/share.svg" alt="Share" width={15} height={15} />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Controls;
