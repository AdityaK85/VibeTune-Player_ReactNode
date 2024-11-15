import React , { useState , useEffect} from 'react'
import { Spotify_API } from '../../API_endpoint/API'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export const NewMusic = () => {
    const [artist_profile_id, setartist_profile_id] = useState(null)
    const [musicName, setmusicName] = useState(null)
    const [musicFile, setMusicFile] = useState(null)
    const [ artistProfileList, setArtistProfileList ] = useState([]);
    const location = useLocation();
    const { update_audio_data , is_update } = location.state || {}

    const saveMusic = async () => {
        if (artist_profile_id === null || artist_profile_id === undefined){
            toast.error('Please Select Artist')
        }
        else if (musicName === null || musicName === undefined ){
            toast.error('Please Enter Music Name')
        }
        else if (musicFile === null || musicFile === undefined ){
            toast.error('Please Select Audio File')
        }
        else {
            var formdata = new FormData();
            formdata.append('fk_artish_id', artist_profile_id)
            formdata.append('music_name' , musicName)
            formdata.append('music_file' , musicFile)
            try {
                const response = await Spotify_API.saveNewMusic(formdata);
                if (response.status === 200){
                    toast.success(response.data.message)
                }
                else{
                    toast.error(response.data.message)
                }
            } catch (error) {
                try {
                    
                    toast.error(error.response.data.message)
                } catch (error) {
                    toast.error('Something went wrong')
                    
                }
            }
        }
    }

    const getArtistProfileList = async () => {
        const api_response = await Spotify_API.getArtistProfileList();
        if (api_response.status === 200) {
            var payload = api_response.data.payload
            if (Array.isArray(payload)) {
                setArtistProfileList(payload);
            } else {  setArtistProfileList([]); }
        } else { toast.error("Something went wrong") }
    }

    useEffect(() => {
        getArtistProfileList();
        // setmusicName(update_audio_data?.name || "");
    }, [artistProfileList, update_audio_data]);
    

  return (
    <>
    <div className="row  bg-secondary  mx-0"  style={{justifyContent:'center'}} >
        <h6 className="mt-3 mb-3 mx-4">
        {is_update ? 'Update New Music' : 'Add New Music'}
        </h6>
        <hr />
        <div className="col-sm-4 col-xl-8">
            <div className="bg-secondary rounded h-100 ">

                <div className='card bg-secondary' style={{boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}} >
                    <div className='card-body'>
                        <div className='form-group mb-4' >
                            <label className='form-lable mb-3' >Select Artist</label>
                            <div className='d-flex'>
                                <select className='form-select' onChange={(e)=>{setartist_profile_id(e.target.value)}} >
                                    <option key={''} value={''}  >Select Artist</option>
                                    {
                                        artistProfileList.map((ele, index) => (
                                            <option key={index} value={ele._id} selected={ele._id === update_audio_data?.fk_artish_id} >{ele.artist_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='form-group mb-4' >
                            <label className='form-lable mb-3' >Show Song Name</label>
                            <div className='d-flex'>
                                <input className='form-control bg-dark border-muted' onInput={(e)=>{setmusicName(e.target.value)}}  placeholder='Artist, singer etc...'   />
                            </div>
                        </div>
                        <div className='form-group mb-4' >
                            <label className='form-lable mb-3' >Select Audio File</label>
                            <div className='d-flex'>
                                <input className='form-control bg-dark border-muted ' type='file'  onChange={(e)=>{setMusicFile(e.target.files[0])}}   />
                                {is_update ? (
                                    <button className="btn mx-3 btn-sm btn-light" onClick={saveMusic}>Update</button>
                                ) : (
                                    <button className="btn mx-3 btn-sm btn-light" onClick={saveMusic}>Add</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
    </>
  )
}
