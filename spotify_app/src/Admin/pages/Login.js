import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom'
import { Spotify_API } from '../../API_endpoint/API'
import { toast, ToastContainer } from 'react-toastify'

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  sessionStorage.setItem('isLogin', false)

  const validate = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (email, password) => {
    try {
        var response = await Spotify_API.adminLogin({'email':email , 'password':password});
        console.log('--------response--------', response)
        if (response.status == 200) {
            toast.success(response.data.payload.msg)
            sessionStorage.setItem('isLogin', true)
            navigate('/admin/add-artist')
        }
        else {
            toast.error('Invalid Credentials')
        }
    } catch (error)  {
        console.log(error)
        toast.error('Invalid Credentials !Please try again')
    }
    }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        handleLogin(email, password);
    //   alert("Login successful");
    }
  };

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center  text-white" style={{height:'560px'}} >
      <div className="bg-dark shadow-lg rounded-lg p-4 p-md-5 w-100" style={{ maxWidth: "400px", borderRadius:'30px', border:'1px solid white' }}>
        <h2 className="text-center mb-4" style={{color:'white'}} >VibeTune Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4 w-100"
          >
            Login
          </button>
        </form>
      </div>
       <ToastContainer />
    </div>
  );
};