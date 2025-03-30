import React, { useEffect, useState } from 'react'
import { Spotify_API } from '../../API_endpoint/API'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export const AddArtists = () => {

    const [ category, setCategory ] = useState(null);
    const [ profilename, setProfilename ] = useState(null);
    const [ categoryList, setCategoryList ] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [selectCategory, setSelectedCategory] = useState(null);

    const retriveArtistList = async () => {
        const response = await Spotify_API.get_artist();
        if (response.status == 200) {
            var payload = response.data.payload
            setCategoryList(Array.isArray(payload) ? payload : []  )
        } else{ toast.error("Something went wrong! Please try again later") }
    }

    const save_artist = async () => {
        const response = await Spotify_API.save_artist({category})
        if (response.status == 200) {
            toast.success(response.data.message) 
            setCategory('');
            await retriveArtistList();
        } else{  toast.error("Something went wrong! Please try again later") }
    }

    const save_artist_profile = async () => {
        const formData = new FormData();
        formData.append('profile_image' , profileImage)
        formData.append('artist_name', profilename)
        formData.append('category_id' , selectCategory)
        const response = await Spotify_API.saveUser(formData)
        if (response.status == 200){
            toast.success(response.data.message)
        } else {  toast.error(response.data.message) }
    }    

    const del_artist = async (category_id) => {
        const sweetAlert = await Swal.fire({
            title: `Delete Category`,
            text:'Do you want to delete category',
            icon:'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        })
        if (sweetAlert.isConfirmed){
            const response = await Spotify_API.del_artist(category_id)
            if (response.status == 200){
                await retriveArtistList();
                toast.success(response.data.message)
            } else{ toast.error("Something went wrong! Please try again later") }
        } else { return ; }
    }

    useEffect(()=>{ retriveArtistList() } , [] )

  return (
    <div className="row  bg-secondary  mx-0">
        <h6 className="mt-3 mb-3 mx-4">Add New Artist's</h6>
        <hr />
        <div className="col-sm-3 col-xl-6">
            <div className="bg-secondary rounded h-100 ">

                <div className='card bg-secondary' style={{boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}} >
                    <div className='card-body'>
                        <div className='form-group mb-4' >
                            <label className='form-lable mb-3' >New Category Name</label>
                            <div className='d-flex'>
                                <input className='form-control bg-dark border-muted' value={category} onInput={(e)=>setCategory(e.target.value)} placeholder='Artist, singer etc...'   />
                                <button className='btn mx-3 btn-sm btn-light' onClick={save_artist}  > Add</button>
                            </div>
                        </div>
                    </div>
                </div>


                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Catgories</th>
                            <th scope="col">Actios</th>
                        </tr>
                    </thead>
                    <tbody className='text-white' >
                        
                        {
                           
                            categoryList.map((ele, index) => (

                                <tr>
                                    <th scope="row" id='ele._id' >{index + 1}</th>
                                    <td>{ele.artist_type}</td>
                                    <td>
                                    <button className='btn mx-1 btn-sm btn-dark'  > Update</button>
                                    <button className='btn btn-sm btn-dark' onClick={()=>(del_artist(`${ele._id}`))} > Remove</button>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <div className="col-sm-3 col-xl-6">
            <div className='bg-secondary rounded h-100 '>
                <div className='card bg-secondary' style={{boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}}>
                    <div className='card-body'>

                        <div className='form-group mb-2'>
                            <label className='mb-2'>Profile Image </label>
                            <input className='form-control bg-dark ' onChange={(e)=>{setProfileImage(e.target.files[0])}} accept="image/*" type='file'  />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='mb-2'>Name </label>
                            <input className='form-control bg-dark ' placeholder='Honey Sigh ...' onInput={(e)=>{setProfilename(e.target.value)}} type='text'  />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='mb-2'>Category</label>
                            <select className='form-select bg-dark' onChange={(e)=>{setSelectedCategory(e.target.value)}}  >
                                <option>Select Category</option>
                                 {
                                     categoryList.map((elem, index) => {
                                        return <option key={elem._id} value={elem._id} >{elem.artist_type}</option>
                                    })
                                 }
                            </select>
                        </div>

                        <button className='btn btn-outline-danger mt-3 float-end' onClick={save_artist_profile}  >Save</button>

                    </div>
                </div>
            </div>      
        </div>
        <ToastContainer />
    </div>
  )
}
