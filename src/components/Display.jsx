import React, { useContext, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome.jsx'
import DisplayAlbum from './DisplayAlbum.jsx'
import { PlayerContext } from '../context/PlayerContext.jsx'

const Display = () => {

  const {albumsData} = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const bgColor = isAlbum && albumsData.length>0 ? albumsData.find((x)=>(x._id == albumId)).bgColor : "#121212";

  useEffect(()=> {
    if (isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`
    }
    else {
      displayRef.current.style.background = `#121212`
    }
  })

  return (
    <div ref={displayRef} className='w-[100%] h-[100vh] m-2 px-3 flex flex-col sm:px-10 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      {albumsData.length > 0 
      ?
      <Routes>
        <Route path='/' element={<DisplayHome/>} />
        <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id))}/>} />
      </Routes>
      : null
    }
      <div className='text-center mb-[90px] text-[12px]'>
        Designed and Developed by <a href='https://sibisiddharth8.github.io/portfolio-react/' className='text-[12px] font-bold cursor-pointer text-nowrap'> © Sibi Siddharth S</a>
      </div>
    </div>
  )
}

export default Display
