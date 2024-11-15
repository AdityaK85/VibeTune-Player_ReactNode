import React, { useRef, useState , useEffect } from 'react'
import './MusicPlayer.css'

export const MusicPlayer = (prop) => {

    const audioRef = useRef(null);
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ progress, setProgress ] = useState(false)
    const [currentTime, setCurrentTime] = useState(0); // State for current time
    const [duration, setDuration] = useState(0); 

    const togglePlayPause  = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          setProgress((audioRef.current.currentTime / duration) * 100);
        }
      };
    
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration); 
        }
      };
    
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

      useEffect(() => {
        const handleModalClose = () => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        };
    
        const modalElement = prop.modelRef.current;
        if (modalElement) {
          modalElement.addEventListener('hidden.bs.modal', handleModalClose);
        }
    
        return () => {
          if (modalElement) {
            modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
          }
        };
      }, [prop.modelRef]);


    return (
        <div ref={prop.modelRef} className="modal fade" id="audioModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body bg-dark">
              {/* Cover Art */}
              <div className="cover-art mb-3">
                <img src="https://images.pond5.com/abstract-audio-player-shape-sound-footage-157157066_iconl.jpeg" alt="Cover Art" className="img-fluid rounded" />
              </div>
      
              {/* Audio Element */}
              <audio
                ref={audioRef}
                src={prop.audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              />
      
              {/* Controls */}
              <div className="d-flex align-items-center justify-content-between">
                <button className="btn btn-sm rounded-0 btn-outline-primary mr-3" onClick={togglePlayPause}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
      
                {/* Progress Bar */}
                <div className="progress flex-grow-1 mx-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
      
                {/* Duration */}
                <span className="duration">{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
