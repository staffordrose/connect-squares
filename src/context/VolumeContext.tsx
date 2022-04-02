import { ReactNode, createContext, useContext, useState } from 'react';

interface VolumeContextProps {
  isMuted: boolean;
  toggleVolume: () => void;
}

const VolumeContext = createContext<VolumeContextProps>({
  isMuted: false,
  toggleVolume: () => {},
});

export const VolumeContextProvider = (props: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(
    typeof window !== 'undefined' && localStorage.getItem('cs-muted') === 'true'
      ? true
      : false
  );

  return (
    <VolumeContext.Provider
      {...props}
      value={{
        isMuted,
        toggleVolume: () => {
          const newIsMuted = !isMuted;
          localStorage.setItem('cs-muted', JSON.stringify(newIsMuted));
          setIsMuted(newIsMuted);
        },
      }}
    />
  );
};

export const useVolumeContext = () => {
  return useContext(VolumeContext);
};
