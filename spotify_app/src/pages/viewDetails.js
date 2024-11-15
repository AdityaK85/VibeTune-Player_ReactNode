import React, { useContext, useEffect, useRef, useState } from 'react'
import './components/podcast.css'
import { useLocation } from 'react-router-dom'
import { Spotify_API } from '../API_endpoint/API'
import { toast , ToastContainer } from 'react-toastify'
import { MusicPlayerContext } from './components/MusicPlayerContext';

export const ViewDetails = () => {

    const { songs, setSongs, setAudioID, currentPlayingID, isPlaying  } = useContext(MusicPlayerContext);
    const [ setloader , showLoader ] = useState(false)
    const [ ArtistType , setArtistType ] = useState('---')
    const [ ArtistName , setArtistName ] = useState('---')
    const [ ArtistSrc , setArtistSrc ] = useState('https://w7.pngwing.com/pngs/921/161/png-transparent-digital-audio-music-mp3-player-music-player-miscellaneous-emblem-text-thumbnail.png')
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null)

    const location = useLocation();
    const { artist_id } = location.state || {}

    const handleSongSelect = (songID) => {
        setAudioID(songID); 
    };

    const retriveArtistWithSong = async () => {

        try {
            const response = await Spotify_API.getMusiclistbyArtistId({'artist_id': artist_id});
            if (response.status == 200) {
                const payload = response.data.payload
                setArtistName(payload.artist_details.artist_name)
                setArtistType(payload.artist_details.artist_type)
                setArtistSrc(payload.artist_details.artist_image)
                setSongs(payload.music_list || []);
            }
            else {
                toast.error('Something went wrong ! Please refresh the brower and try again')
            }
        } catch (error) {
            toast.error('Something went wrong ! Please refresh the brower and try again')
        }
    }

    useEffect(() => {
        retriveArtistWithSong();
    }, []);

  return (
    <>
        <div className='card bg-dark mt-3'>
            <div className='card-body' style={{maxHeight:'523px', overflowY:'scroll'}} >

                {/* Header Details */}
                <div className='d-flex'>
                <div style={{ width: '200px', height: '200px', overflow: 'hidden', borderRadius: '50%' }}>
                    <img 
                        src={ArtistSrc} 
                        alt="Profile" 
                        style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        }} 
                    />
                    </div>
                    <div className='text-white mx-3' >
                        <p className='text-muted'>{ArtistType}</p>
                        <h1 style={{fontSize:'90px', fontFamily:'fantasy'}}  >{ArtistName}</h1>
                        
                    </div>
                </div>


                <div className="table-container">
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
            <ToastContainer />
        </div>
    </>
  )
}
