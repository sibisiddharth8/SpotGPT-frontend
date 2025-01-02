import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import dotenv from 'dotenv';

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const seekBg = useRef();
  const seekBar = useRef();

  const url = import.meta.env.VITE_API_URL;

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Save the current track and time in localStorage
  useEffect(() => {
    const savedTrack = JSON.parse(localStorage.getItem('track'));
    const savedTime = JSON.parse(localStorage.getItem('time'));
    if (savedTrack) {
      setTrack(savedTrack);
      audioRef.current.src = savedTrack.file; 
      setTime(savedTime || { currentTime: { minute: 0, second: 0 }, totalTime: { minute: 0, second: 0 } });
      if (savedTime) {
        audioRef.current.currentTime = savedTime.currentTime.minute * 60 + savedTime.currentTime.second;
      }
    }
  }, []);

  // Update the time when the song is loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        const duration = audioRef.current.duration || 0;
  
        setTime((prevTime) => ({
          ...prevTime,
          totalTime: {
            minute: Math.floor(duration / 60),
            second: Math.floor(duration % 60),
          },
        }));
      };
  
      audioRef.current.ontimeupdate = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 0;
        const  progress = (current / duration) * 100;
  
        seekBar.current.style.width = progress + '%';
  
        setTime({
          currentTime: {
            second: Math.floor(current % 60),
            minute: Math.floor(current / 60),
          },
          totalTime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60),
          },
        });
  
        if (progress >= 100) {
          next();
        }
      };
  
      // Update the time in localStorage
      localStorage.setItem('time', JSON.stringify({ 
        currentTime: { minute: Math.floor(audioRef.current.currentTime / 60), second: Math.floor(audioRef.current.currentTime % 60) }, 
        totalTime: { minute: Math.floor(audioRef.current.duration / 60), second: Math.floor(audioRef.current.duration % 60) },
       }));
    }
  }, [audioRef, track, songsData, audioRef.current.currentTime]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false); 
    }
  }, []);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  // Play function
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Pause function
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };


  // Play a song with a specific id
  const playWithId = (id) => {
    const selectedTrack = songsData.find((song) => song._id === id);
    setTrack(selectedTrack);
    audioRef.current.src = selectedTrack.file;
    audioRef.current.play();
    setPlayStatus(true);
    localStorage.setItem('track', JSON.stringify(selectedTrack));
  };

  // next function
  const next = async () => {
    let nextTrack;
    if (currentAlbum) {
      // Filter songs by the current album
      const albumSongs = songsData.filter((song) => song.album === currentAlbum);
      const currentIndex = albumSongs.findIndex((song) => song._id === track._id);

      if (currentIndex >= 0 && currentIndex < albumSongs.length - 1) {
        nextTrack = albumSongs[currentIndex + 1];
      }
    } else {
      // Normal behavior when no album is selected (use full song list)
      const currentIndex = songsData.findIndex((song) => song._id === track._id);
      if (currentIndex >= 0 && currentIndex < songsData.length - 1) {
        nextTrack = songsData[currentIndex + 1];
      }
    }

    if (nextTrack) {
      await setTrack(nextTrack);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // previous function
  const previous = async () => {
    let previousTrack;
    if (currentAlbum) {
      
      const albumSongs = songsData.filter((song) => song.album === currentAlbum);
      const currentIndex = albumSongs.findIndex((song) => song._id === track._id);

      if (currentIndex > 0) {
        previousTrack = albumSongs[currentIndex - 1];
      }
    } else {
      
      const currentIndex = songsData.findIndex((song) => song._id === track._id);
      if (currentIndex > 0) {
        previousTrack = songsData[currentIndex - 1];
      }
    }

    if (previousTrack) {
      await setTrack(previousTrack);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Seek the song
  const seekSong = (e) => {
    const seekPosition = (e.nativeEvent.offsetX / seekBg.current.offsetWidth)
    const newTime = seekPosition * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setTime({
      currentTime: { minute: Math.floor(newTime / 60), second: Math.floor(newTime % 60) },
      totalTime: time.totalTime
    });
  };

  // Get the songs data
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
    } catch (error) {
      console.error(error);
    }
  };


  // Get the albums data
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
