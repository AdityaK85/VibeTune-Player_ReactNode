import React, { createContext, useState, useRef, useEffect } from 'react';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [audioID, setAudioID] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlayingID, setCurrentPlayingID] = useState(null);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn('Error trying to play audio:', error);
      });
    }
  };

  useEffect(() => {
    if (audioID && songs.length > 0) {
      const selectedSong = songs.find((song) => song._id === audioID);
      if (selectedSong) {
        setCurrentSong(selectedSong);
        setCurrentPlayingID(audioID);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = selectedSong.audio_file;
          const handleCanPlay = () => {
            playAudio();
            setIsPlaying(true);
          };
          audioRef.current.addEventListener('canplaythrough', handleCanPlay);
          return () => {
            audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
          };
        }
      }
    }
  }, [audioID, songs]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      playAudio();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    const currentIndex = songs.findIndex((song) => song._id === currentSong?._id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setAudioID(songs[nextIndex]._id);
  };

  const playPrevSong = () => {
    const currentIndex = songs.findIndex((song) => song._id === currentSong?._id);
    const nextIndex = (currentIndex - 1) % songs.length;
    if (nextIndex >= 0) {
        setAudioID(songs[nextIndex]._id);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        songs,
        setSongs,
        audioID,
        setAudioID,
        isPlaying,
        togglePlayPause,
        playNextSong,
        playPrevSong,
        currentSong,
        audioRef,
        currentPlayingID
      }}
    >
      {children}
      <audio ref={audioRef} />
    </MusicPlayerContext.Provider>
  );
};
