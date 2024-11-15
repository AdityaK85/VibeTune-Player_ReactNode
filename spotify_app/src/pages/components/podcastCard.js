import React, { useState, useEffect, useRef, useContext } from 'react'
import '../components/podcast.css'
import { Link } from 'react-router-dom'
import { Spotify_API } from '../../API_endpoint/API'
import { toast , ToastContainer} from 'react-toastify'
import { MusicPlayerContext } from '../components/MusicPlayerContext';

export const PodcastCard = () => {

    const { songs, setSongs, setAudioID } = useContext(MusicPlayerContext);

    const getMusicList = async () => {
        const response = await Spotify_API.getMusicList();
        if (response.status === 200) {
          setSongs(response.data.payload || []);
        }
    };

    useEffect(() => {
        getMusicList();
    }, []);
    
  return (
    <>
        <div className='card text-white p-3 my-3 mb-2' style={{ background: '#121212',  fontWeight: 'bold', fontSize:'25px'}} >
            <div className='card-body'>
                <div className='row'>
                    {
                        songs.map((ele) => (
                            <div className='col-2 mb-4'>
                                <div className="card bg-dark artist-card">
                                    <Link className='btn ' to='/view-details' state={{'artist_id' : ele.artist_id}} >
                                        <div className="artist-image">
                                                <img src={ele.artist_image} alt="Artist Name" className="card-img-top" />    
                                        </div>
                                    </Link>
                                    <div className="play-button">
                                        <button className='btn ' onClick={(e)=>(setAudioID(ele._id))} ><i className="fa-solid fa-play"></i></button>
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title artist-name"  >{ele.name}</h5>
                                        <p style={{fontSize:'13px',fontWeight:'lighter'}} >{ele.artist_name}</p>
                                    </div>
                                </div>
                            </div>
                        ) )
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    </>
  )
}
