'use client';

import React, { useRef } from 'react';

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
    <div>
      <audio ref={audioRef} src={base64} />
      <button onClick={handlePlayPause}>⏯️</button>
    </div>
  );
};

export default Player;
