import React, { useContext, useEffect, useRef, useState } from 'react'
import { Spotify_API } from '../API_endpoint/API'
import { toast , ToastContainer } from 'react-toastify'
import { MusicPlayerContext } from './components/MusicPlayerContext';
import { useLocation } from 'react-router-dom'

export const FaceRecommendation = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [songListVisible, setSongListVisible] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [emotionMsg, setEmotionMsg] = useState("");

  const emotionsMap = {
      0: { text: "Angry 😡", message: "Take a deep breath. Let go of the anger and find your peace." },
      1: { text: "Disgusted 🤢", message: "Not everything is pleasant, but every experience teaches us something new." },
      2: { text: "Fearful 😨", message: "Fear is temporary, but courage lasts forever. Face your fears with confidence!" },
      3: { text: "Happy 😊", message: "Happiness is contagious! Keep smiling and spread the joy." },
      4: { text: "Neutral 😐", message: "Balance is the key to everything. Stay calm and steady." },
      5: { text: "Sad 😢", message: "It’s okay to feel down sometimes. Remember, brighter days are ahead." },
      6: { text: "Surprised 😲", message: "Life is full of surprises! Embrace the unexpected with excitement." },
    };

  const { songs, setSongs, setAudioID, currentPlayingID, isPlaying  } = useContext(MusicPlayerContext);
  const [ setloader , showLoader ] = useState(false)
  const [ ArtistType , setArtistType ] = useState('---')
  const [ ArtistName , setArtistName ] = useState('---')
  const [ ArtistSrc , setArtistSrc ] = useState('https://w7.pngwing.com/pngs/921/161/png-transparent-digital-audio-music-mp3-player-music-player-miscellaneous-emblem-text-thumbnail.png')
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null)
  const [ ShowTbl , setTble ] = useState(false);

  const location = useLocation();
  const { music_type } = location.state || {}

  const handleSongSelect = (songID) => {
      setAudioID(songID); 
  };

  const getEmotionMessage = (emotion) => {
    const entry = Object.values(emotionsMap).find((value) => value.text.startsWith(emotion));
    return entry ? entry.message : "Emotion not found.";
  };

  const get_music_by_face_type = async (face_type) => {
    console.log(face_type)
    const response = await Spotify_API.getMusiclistbyFaceType({'musicType': face_type});
    const songs = response?.data?.payload || [];
    setSongs(songs);
    if (songs.length > 0) {
      handleSongSelect(songs[0]._id)
      setTble(true)  // Show table when songs are available
    } 
  }

  const handleCapture = async () => {
    // Capture Image
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
      const response = await fetch("http://127.0.0.1:5000/t");
      const data = await response.json();
      setEmotion(data.emotion)
      console.log(getEmotionMessage(data.emotion))
      setEmotionMsg(getEmotionMessage(data.emotion))
      get_music_by_face_type(data.emotion)
    } catch (error) {
      console.error("Error fetching song list:", error);
    }
  };

  const handleReset = () => {
    window.location.reload()
  };

  return (
    <div className="face-rec-container ">
      {
        emotion && (
          <h2><span className="emotion-text">{emotion}</span>  <small>{emotionMsg}</small> </h2>
        )
      }
      <div className="row " >

        <div className={`col-${ShowTbl ? 6 : 12}`} >
        <small className="mb-4" >
            Position your face within the circle and ensure proper lighting for the best emotion detection results.
          </small>

          <div className="row " style={{justifyContent:'center', marginTop:'27px'}}  >
            <div className="video-container col-12">
              
                <img
                  ref={videoRef}
                  className="video-feed"
                  src="http://127.0.0.1:5000/video_feed"
                  alt="Emotion Detection Feed"
                />
              
            </div>

            <div className="button-container col-12" style={{justifyContent:'center'}} >
              <button className="capture-btn" onClick={handleCapture}>
                Capture
              </button>
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>

          </div>
        </div>
        {ShowTbl && (
          <div className="col-6" >
            <div className="table-container " style={{height:'350px',overflow:'overlay'}} >
              <table className="music-table">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Play</th>
                      </tr>
                  </thead>
                  <tbody>
                      {songs.map((ele, index) => (
                          <tr  key={ele._id}>
                              <td>{index + 1}</td>
                              <td className="track-info my-2">
                                  <p className="track-title">{ele.name || 'Unknown Title'}</p>
                              </td>
                              <td>
                                  <button className="btn" onClick={() => handleSongSelect(ele._id)}>
                                      <i
                                      className={`fa-solid ${
                                          currentPlayingID === ele._id && isPlaying ? 'fa-pause' : 'fa-play'
                                      }`}
                                      ></i>
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
