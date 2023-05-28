import React, { useRef } from 'react'
import { useState } from 'react'
import Room from '@mui/icons-material/Room'
import "./login.css"
import axios from "axios"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const Login = ({setShowl,mystorage,setcurrentUser}) => {
 
  const [failure,setfailure]=useState(false)
const nameRef= useRef();
const passwordRef= useRef();

const handleSubmit=async(e)=>{
e.preventDefault();
const newUser={
  username:nameRef.current.value,
  password:passwordRef.current.value
}
try{
  const res=await axios.post("https://map-tracker.onrender.com/users/login",newUser);
   mystorage.setItem("user",res.data.username);
   setcurrentUser(res.data.username);
   setShowl(false)
   setfailure(false);
  }
catch(err){
  setfailure(true);
}
}
  return (
    <div className='registerContainer'>
      <form >
      <div className="logo">
        <Room
        style={{fontSize:"3rem",color:"teal"}}/>
        MAP.
        <CancelOutlinedIcon className="cancel" onClick={()=>setShowl(false)}/>
      </div>
        <input type="text" placeholder='username' ref={nameRef} /> 
        <input type="password"  placeholder='password' ref={passwordRef}/> 
        <button className='rButton' onClick={handleSubmit}>login</button>
      {failure==true&&
        <span className='failure'>`you messed up!!!!`</span>
      }
      </form>
    </div>
  )
}

export default Login

