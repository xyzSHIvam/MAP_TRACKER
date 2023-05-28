// import React from 'react'
// import "./App.css";
// // import { useRef, useEffect, useState } from 'react';
// // import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// // import {Marker} from 'react-map-gl';

// mapboxgl.accessToken ="pk.eyJ1Ijoic2hpdmFtLTE0MyIsImEiOiJjbGZlNm1saTIxajdoM3BtdTRjZjUzZ2ZjIn0.hyhLyO7x9U6Hluw--XJi5g";
// const App = () => {
//     const mapContainer = useRef(null);
//     const map = useRef(null);
// const [lng, setLng] = useState(-100.9);
// const [lat, setLat] = useState(42.35);
// const [zoom, setZoom] = useState(9);
// useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//     container: mapContainer.current,
//     style: 'mapbox://styles/mapbox/streets-v12',
//     center: [lng, lat],
//     zoom: zoom
//     });
//     });
//     useEffect(() => {
//         if (!map.current) return; // wait for map to initialize
//         map.current.on('move', () => {
//         setLng(map.current.getCenter().lng.toFixed(4));
//         setLat(map.current.getCenter().lat.toFixed(4));
//         setZoom(map.current.getZoom().toFixed(2));
//         });
//         });
//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" >

//       </div>
//     </div>
//   )
// }

// export default App




import React, { useEffect } from 'react'
import { useState } from "react";
import Map, { Marker } from 'react-map-gl'
import { Popup } from "react-map-gl";
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import "./App.css"
import axios from "axios"
import {format} from "timeago.js"
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
const mystorage =window.localStorage;


  const [pins, setPins] = useState([]);
  const [CID,setCID]=useState(null);
  const [newPlace,setnewPlace]=useState(null);
  const [title,setTitle]=useState(null);
  const [desc,setDesc]=useState(null);
  const [rating,setRating]=useState(0);
  const [currentUser,setcurrentUser]=useState(mystorage.getItem("user"));
  const [Showr,setShowr]=useState(false);
  const [Showl,setShowl]=useState(false);
 
 
 
  const [viewport, setViewport] = useState({
    width: 100,
    height: 100,
    latitude: 48.8584,
    longitude: 2.2945,
    zoom: 8

  });
  
  
  
 

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("https://map-tracker.onrender.com/pins");
        setPins(res.data);
      }
      catch (err) {
        console.log(err)
      }
    };
    getPins()
  }, [])



   const handleOne=(id,lat,long)=>{
    console.log(id)
    setCID(id);
    
  }
  const handleTwo=(e)=>{
   const lat=e.lngLat.lat;
   const long=e.lngLat.lng;
   console.log(lat)
   console.log(long)
   setnewPlace({
    lat:lat,
    long:long
   })
  }


  const handleThree=async(e)=>{
    e.preventDefault()
    const newPin={
      username:currentUser,
      title:title,
      desc:desc,
      rating:rating,
      lat:newPlace.lat,
      long:newPlace.long
    }
    try{

      const res=await axios.post("https://map-tracker.onrender.com/pins",newPin);
      setPins([...pins,res.data])
      setnewPlace(null);
    }catch(err)
    {
      console.log(err)
    }
  }

  const handleFour=()=>{
    mystorage.removeItem("user")
    setcurrentUser(null)
  }

  return (
    <div>
      <Map
        initialViewState={{
          ...viewport
        }}
        style={{ width: '100vw', height: '100vh' }}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleTwo}
      >
        {pins.map(p => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              anchor="center"
              offsetleft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <RoomIcon 
              style={{ fontSize: viewport.zoom * 7, color: p.username===currentUser?"tomato":"slateblue" , cursor:"pointer" }} 
               onClick={()=>handleOne(p._id,p.lat,p.long)}
              />
            </Marker>
   
     {p._id === CID
        && 
      <Popup 
      longitude={p.long} 
      latitude={p.lat}
      anchor="left"
      onClose={()=>setCID(null)}
      >
      <div className='card'>
      <label>Place</label>
      <h4 className='place'>{p.title}</h4>
      <label>Review</label>
      <p className='desc'> 
      {p.desc} 
      </p>
      <label>Rating</label>
      <div className="stars">
        {Array(p.rating).fill(<StarIcon className='star'/>)}
      </div>
      <label>infomation</label>
      <span className='username'>Created by <b>{p.username}</b></span>
      <span className='date'>{format(p.createdAt)}</span> 
      </div>
    </Popup>
    
       }   
          </>
        ))}
        { newPlace &&
      <Popup 
      longitude={newPlace.long} 
      latitude={newPlace.lat}
      anchor="left"
      onClose={()=>setnewPlace(null)}
      >
        <div>
          <form  onSubmit={handleThree}>
              <label>Title</label>
              <input placeholder="Enter a title"  onChange={(e)=>setTitle(e.target.value)}/>
              <label>Review</label>
              <textarea placeholder="Say us something about this place" onChange={(e)=>setDesc(e.target.value)} />
              <label>Rating</label>
              <select onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className='submit' type="submit">ADD PIN</button>
          </form>
        </div>
      </Popup> 
      }
      {currentUser?
     <button className='button logout' onClick={handleFour}>Logout</button>
      :
     <div className='buttons'>
     <button className='button login' onClick={()=>setShowl(true)}>Login</button>
      <button className='button register' onClick={()=>setShowr(true)}>Register</button>
     </div>
      }
      {Showr===true&&
      <Register setShowr={setShowr}/>
      }
       {
        Showl===true&&<Login setShowl={setShowl} mystorage={mystorage} setcurrentUser={setcurrentUser}/>
      } 
      </Map>
    </div>
  )
}

export default App
