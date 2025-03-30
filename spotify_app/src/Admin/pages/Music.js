import React , { useEffect , useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Spotify_API } from '../../API_endpoint/API'
import { toast, ToastContainer } from 'react-toastify'
import { MusicPlayer } from '../components/MusicPlayer'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const Music = () => {
    const [musicList, setMusicList] = useState([])
    const [audioSrc, setAudioSrc] = useState(null)
    const modelRef = useRef(null);
    const navigate = useNavigate();

    const getMusicList = async () => {
        try {
            var response = await Spotify_API.getMusicList();
            if (response.status === 200) {
                var response_list = response.data.payload
                console.log(response_list)
                setMusicList(Array.isArray(response_list) ? response_list : [] )
            }
            else {
                toast.error("Having some problem to retrive music list! please try again")
            }
        } catch (error) {
            if (error.response.data.message) {
                toast.success(error.response.data.message)
            }
            else {
                toast.error("Having some problem to retrive music list ! please try again")
            }
        }

    }
    
    const deleteAudio = async (audio_id) => {
        try {
            const sweetAlert = await Swal.fire({
                title: `Remove Audio`,
                text:'Do you want to Remove this Audio',
                icon:'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
            })

            if (sweetAlert.isConfirmed) {
                const data = {'audio_id' : audio_id}
                const response = await Spotify_API.deleteAudio(data);
                if (response.status == 200) {
                    toast.success(response.data.message)
                    getMusicList()
                } else {
                    toast.error("Something went wrong")
                }
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    const updateAudiopage = async (audio_id) => {
        try {
            const body = {'audio_id' : audio_id}
            const response = await Spotify_API.getOneAudio(body);
            console.log(response)
            if (response.status == 200) {
                var updateRes = response.data.payload
                navigate('/admin/new-music' , {state : { 'update_audio_data': updateRes , 'is_update' : true }} )
            }
            else {
                toast.error('Something went wrong  please refresh the page and try again')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong  please refresh the page and try again')
        }
    }

    useEffect(() => {
        return () => {
            getMusicList()
        }
    }, [])


    const openAudioModal = (audio_src) => {
        setAudioSrc(audio_src)
        var modal = new window.bootstrap.Modal(modelRef.current);
        modal.show()
    }
    

  return (
    <>
        <MusicPlayer modelRef={modelRef}  audioSrc={audioSrc} />
        <div className="row  bg-secondary  mx-0">
            <div className='d-flex ' style={{justifyContent:'space-between'}} >
                <h6 className="mt-3 mb-3 mx-4">Music List</h6>
                <Link to="/admin/new-music" className='btn btn-primary' style={{height:'fit-content'}} >New</Link>
            </div>
            <hr />
            <div className="col-sm-6 col-xl-12">
                <div className="bg-secondary rounded h-100 ">

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Music Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Play</th>
                                <th scope="col">Artist</th>
                                <th scope="col" style={{textAlign:"end"}} >Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-white' >
                            {
                                musicList.map((ele, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{ele.name}</td>
                                        <td>{ele.musicType ? ele.musicType : '--' }</td>
                                        <td  ><button onClick={(e)=>{openAudioModal(ele.audio_file)} } className='btn btn-info btn-sm rounded-0' ><i className="fa-solid fa-play"></i></button> </td>
                                        <td>{ele.artist_name}</td>
                                        <td style={{display:"flex", justifyContent: "end"}} >
                                        {/* <button className='btn btn-sm btn-outline-danger' onClick={(e)=>(updateAudiopage(ele._id))} > Changes</button> */}
                                        <button className='btn mx-2 btn-sm btn-dark' onClick={(e)=>(deleteAudio(ele._id))} > Remove</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    </>
        
  )
}
