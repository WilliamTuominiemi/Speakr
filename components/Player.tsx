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
    <div className="h-full mr-2">
      <audio ref={audioRef} src={base64} />
      <button className=" bg-emerald-600 hover:bg-emerald-700 p-3 h-full rounded-md " onClick={handlePlayPause}>
        <Image src="/icons/play-pause.svg" alt="Stop" width={25} height={25} />
      </button>
    </div>
  );
};

export default Player;
