import useSound from 'use-sound';

const useBoardSounds = () => {
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.625 });
  const [playMove] = useSound('/sounds/place.mp3');
  const [playReset] = useSound('/sounds/shuffle.mp3');
  const [playRotate] = useSound('/sounds/swoosh.mp3');
  const [playSuccess] = useSound('/sounds/success.mp3');

  return { playClick, playMove, playReset, playRotate, playSuccess };
};

export default useBoardSounds;
