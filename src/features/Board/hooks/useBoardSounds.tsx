import { useState } from 'react';

const useBoardSounds = () => {
  const [successSound] = useState(
    typeof Audio !== 'undefined' ? new Audio('/sounds/success.wav') : null
  );
  const [moveSound] = useState(
    typeof Audio !== 'undefined' ? new Audio('/sounds/click.wav') : null
  );
  const [rotateSound] = useState(
    typeof Audio !== 'undefined' ? new Audio('/sounds/swoosh.wav') : null
  );

  return { successSound, moveSound, rotateSound };
};

export default useBoardSounds;
