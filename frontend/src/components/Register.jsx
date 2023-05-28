import React, { useRef } from 'react'
import { useState } from 'react'
import Room from '@mui/icons-material/Room'
import "./register.css"
import axios from "axios"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const Register = ({setShowr}) => {
  const [success,setSuccess]=useState(false)
  const [failure,setfailure]=useState(false)
const nameRef= useRef();
const emailRef= useRef();
const passwordRef= useRef();

const handleSubmit=async(e)=>{
e.preventDefault();
const newUser={
  username:nameRef.current.value,
  email:emailRef.current.value,
  password:passwordRef.current.value
}
try{
   await axios.post("https://map-tracker.onrender.com/users/register",newUser);
   setfailure(false);
   setSuccess(true);
  }
catch(err){
  setfailure(err);
}
}
  return (
    <div className='registerContainer'>
      <form onSubmit={handleSubmit}>
      <div className="logo">
        <Room
        style={{fontSize:"3rem",color:"slateblue"}}/>
        MAP.
        <CancelOutlinedIcon className="cancel" onClick={()=>setShowr(false)}/>
      </div>
        <input type="text" placeholder='username' ref={nameRef} /> 
        <input type="email" placeholder='email' ref={emailRef}/> 
        <input type="password"  placeholder='password' ref={passwordRef}/> 
        <button className='rButton'>register</button>
        {
          success==true&&
          <span className='success'>Successfull.You can login!!!!</span>
        }
      {failure==true&&
        <span className='failure'>Something went go wrong!!!!</span>
      }
      </form>
    </div>
  )
}

export default Register
