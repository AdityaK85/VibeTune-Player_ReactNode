import React, { useContext, useEffect, useState } from 'react';
import { MusicPlayerContext } from './MusicPlayerContext';
import './player.css'

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNextSong,
    playPrevSong,
    audioRef,
  } = useContext(MusicPlayerContext);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => playNextSong();
      audioRef.current.addEventListener('ended', handleEnded);
      return () => {
        audioRef.current.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef, playNextSong]);

  const handleLoadedData = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn("Play request was interrupted:", error);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  if (!currentSong) {
    return (
      <div style={styles.player}>
          <div className='card-title mx-3 my-2' style={{fontWeight:'bold'}} >Tune in to the beats that move your soul, vibe out with the rhythms that ignite your passion, and live loud in every moment of music.</div>
      </div>
    );
  }

  return (
    <div style={styles.player}>
      {/* Artist Image */}
      <img
        src={
          currentSong.artist_image ||
          'https://w7.pngwing.com/pngs/921/161/png-transparent-digital-audio-music-mp3-player-music-player-miscellaneous-emblem-text-thumbnail.png'
        }
        alt={currentSong.name || 'Unknown'}
        style={styles.albumArt}
      />

      {/* Song Details */}
      <div style={styles.songInfo}>
        <h4 style={styles.songTitle}>{currentSong.name || 'Unknown Title'}</h4>
        <p style={styles.artist}>{currentSong.artist_name || 'Unknown Artist'}</p>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audio_file}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <span style={styles.time}>
          {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          style={styles.progressBar}
        />
        <span style={styles.time}>
          {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
        </span>
      </div>

      {/* Controls */}
      <div className='mx-3' style={styles.controls}>
        <button style={styles.controlButton} onClick={playPrevSong}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <button style={styles.controlButton} onClick={togglePlayPause}>
          {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
        </button>
        <button style={styles.controlButton} onClick={playNextSong}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

const styles = {
  player: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: 'rgba(20, 20, 20, 0.8)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px 20px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '15px 20px',
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.6)',
    color: '#fff',
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    transition: 'transform 0.4s ease',
    cursor: 'pointer',
  },
  songInfo: {
    flex: 1,
    marginLeft: '15px',
    textAlign: 'left',
  },
  songTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '0 0 10px rgba(0, 255, 200, 0.8)',
  },
  artist: {
    margin: 0,
    fontSize: '14px',
    color: '#bbb',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '60%',
    marginTop: '10px',
  },
  time: {
    fontSize: '12px',
    color: '#ccc',
  },
  progressBar: {
    flex: 1,
    appearance: 'none',
    height: '5px',
    background: 'linear-gradient(to right, #ff8a00, #e52e71)',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  controlButton: {
    background: 'linear-gradient(135deg, #e52e71, #ff8a00)',
    border: 'none',
    borderRadius: '50%',
    width: '45px', // Fixed width
    height: '45px', // Fixed height
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Centers the icon inside the button
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  controlButtonHover: {
    transform: 'scale(1.1)', // Optional: slightly enlarges the button on hover
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
  }
};