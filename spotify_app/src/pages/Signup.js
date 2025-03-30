import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom'
import { Spotify_API } from '../API_endpoint/API.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Background = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "url('https://img.freepik.com/free-photo/electric-guitar-with-neon-light-still-life_23-2151376212.jpg') no-repeat center center/cover",
  padding: "20px",
});

const FormBox = styled(Box)({
  background: "rgba(30, 30, 30, 0.95)",
  padding: "50px",
  borderRadius: "12px",
  textAlign: "center",
  width: "100%",
  maxWidth: "400px",
});

const InputField = styled(TextField)({
  marginBottom: "20px",
  '& label': { color: "#ff4d4d" },
  '& input': { color: "#fff" },
  '& .MuiOutlinedInput-root': {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    '& fieldset': { borderColor: "#ff4d4d" },
    '&:hover fieldset': { borderColor: "#ff6666" },
    '&.Mui-focused fieldset': { borderColor: "#ff1a1a" },
  },
});

const FormButton = styled(Button)({
  backgroundColor: "#ff4d4d",
  color: "#fff",
  '&:hover': { backgroundColor: "#ff1a1a" },
  padding: "12px",
  fontWeight: "bold",
  borderRadius: "8px",
  boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.9)",
  textTransform: "uppercase",
});

const StyledLink = styled(Link)({
  color: "#ff4d4d",
  textDecoration: "none",
  '&:hover': { textDecoration: "underline" },
  fontSize: "14px",
});


export const VibeTuneSignup = () => {
  sessionStorage.setItem('isUserLogin', false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const signup = async () => {

    setError("");
    if (!validateEmail(email)) {
      toast.error("Please enter valid Email")
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password not match to the confirmed password")
      return;
    }

    const response = await Spotify_API.UserSignup({'email': email , 'password': password})
    if (response.status == 200) {
        toast.success(response.data.message) 
        sessionStorage.setItem('isUserLogin', true)
        navigate('/')
      } else{  
        toast.error("Something went wrong! Please try again later") 
        sessionStorage.setItem('isUserLogin', false)
      }
  }


  return (
    <Background>
      <FormBox>
        <Typography variant="h4" color="#ff4d4d" gutterBottom fontWeight="bold">
          VibeTune Signup
        </Typography>
        <form >
          <InputField 
            fullWidth 
            label="Email" 
            variant="outlined" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={!!error} 
            helperText={error} 
          />
          <InputField 
            fullWidth 
            label="Password" 
            type="password" 
            variant="outlined" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <InputField 
            fullWidth 
            label="Confirm Password" 
            type="password" 
            variant="outlined" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <FormButton fullWidth variant="contained" type="button" onClick={signup} >Sign Up</FormButton>
        </form>
        <Box mt={4}>
            <Typography variant="body2" color="#ccc">
                  Already have an account? <StyledLink onClick={() => navigate('/login')}>
              Sign in
            </StyledLink>
            </Typography>
          </Box>
      </FormBox>
      <ToastContainer />
    </Background>
    
  );
};
