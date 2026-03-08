import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
