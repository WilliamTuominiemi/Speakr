'use client';
import Player from '@/components/Player';
import {
  getLocalStream,
  startRecording,
  stopRecording,
} from '@/utils/mediaUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ControlsProps {
  userId: string;
  reply: string;
}

const Controls: React.FC<ControlsProps> = ({ userId, reply }) => {
  const queryClient = useQueryClient();

  const [audio, setAudio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const postMutation = useMutation({
    mutationFn: () =>
      fetch('/api/new', {
        method: 'POST',
        body: JSON.stringify({ userId, audio }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setAudio(null);
    },
  });

  const replyMutation = useMutation({
    mutationFn: () =>
      fetch('/api/reply', {
        method: 'POST',
        body: JSON.stringify({ userId, audioId: reply, audio }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setAudio(null);
    },
  });

  useEffect(() => {
    getLocalStream(setError);
  }, []);

  const handleStartRecording = () => {
    if (audio) setAudio(null);
    setIsRecording(true);
    startRecording();

    const id = setTimeout(async () => {
      await handleStopRecording();
    }, 10000);

    setTimeoutId(id);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const base64Audio = await stopRecording();
    setAudio(base64Audio);
  };

  const uploadSound = () => {
    postMutation.mutate();
  };

  const uploadReply = () => {
    replyMutation.mutate();
  };

  return (
    <div className="bg-stone-300 dark:bg-gray-600 outline outline-1 outline-zinc-400 p-4 w-10/12 min-h-20 rounded-tl-xl shadow-lg flex items-center space-x-5">
      {error ? (
        <p className="text-md error-message">{error}</p>
      ) : !userId ? (
        <p className="text-md error-message">You need to sign in to speak</p>
      ) : (
        <>
          <p className="text-xl">
            {reply ? <>Replying to post {reply.slice(reply.length - 5, reply.length)}</> : <>Say something:</>}
          </p>
          {!isRecording ? (
            <button
              className="rounded-md p-3 pl-4 pr-4 h-full text-2xl bg-emerald-700 hover:bg-emerald-800"
              onClick={handleStartRecording}
              disabled={isRecording}
            >
              <Image src="/icons/microphone.svg" alt="Record" width={15} height={15} />
            </button>
          ) : (
            <button
              className="rounded-md p-3 pl-4 pr-4 h-full text-2xl bg-red-500 hover:bg-red-600"
              onClick={handleStopRecording}
              disabled={!isRecording}
            >
              <Image src="/icons/microphone-line.svg" alt="Stop recording" width={15} height={15} />
            </button>
          )}
          {audio && (
            <>
              <Player base64={audio} />
              <button
                className="rounded-md pl-4 pr-4 h-full text-md bg-teal-500 hover:bg-teal-600"
                type="button"
                onClick={reply ? uploadReply : uploadSound}
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
