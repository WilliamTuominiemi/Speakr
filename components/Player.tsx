'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface PlayerProps {
  base64: string;
}

const Player: React.FC<PlayerProps> = ({ base64 }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [src, setSrc] = useState('/icons/play.svg');

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setSrc('/icons/pause.svg');
      } else {
        audioRef.current.pause();
        setSrc('/icons/play.svg');
      }
    }
  };

  const handleAudioEnded = () => {
    setSrc('/icons/play.svg');
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener('ended', handleAudioEnded);

      return () => {
        audioElement.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, []);

  return (
    <div className="h-full mr-2">
      <audio ref={audioRef} src={base64} />
      <button
        className=" bg-emerald-600 hover:bg-emerald-700 p-3 pl-5 pr-5 h-full rounded-md "
        onClick={handlePlayPause}
      >
        <Image src={src} alt="Stop" width={16} height={16} />
      </button>
    </div>
  );
};

export default Player;
