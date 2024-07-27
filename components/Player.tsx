'use client';

import React, { useRef } from 'react';

import Image from 'next/image';

interface PlayerProps {
  base64: string;
}

const Player: React.FC<PlayerProps> = ({ base64 }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className=" h-full">
      <audio ref={audioRef} src={base64} />
      <button className=" bg-emerald-600 p-2 h-full rounded-sm " onClick={handlePlayPause}>
        <Image src="/icons/play-pause.svg" alt="Stop" width={15} height={15} />
      </button>
    </div>
  );
};

export default Player;
