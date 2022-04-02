import useSound from 'use-sound';

const useBoardSounds = () => {
  const [playMove] = useSound('/sounds/click.wav');
  const [playRotate] = useSound('/sounds/swoosh.wav');
  const [playSuccess] = useSound('/sounds/success.wav');

  return { playMove, playRotate, playSuccess };
};

export default useBoardSounds;
