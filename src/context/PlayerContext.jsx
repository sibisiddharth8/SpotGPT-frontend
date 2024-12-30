import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import dotenv from 'dotenv';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(new Audio());
  const seekBg = useRef();
  const seekBar = useRef();

  const url = import.meta.env.VITE_API_URL;

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
        setCurrentAlbum(item.album);
      }
    });
    await audioRef.current.play();
    setPlayStatus(true);
  };

  // Function to get the next song based on the current album
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
      await setTrack(nextTrack); // Set the next song
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Function to get the previous song based on the current album
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

  const seekSong = async (e) => {
    audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 0;
        const progress = (current / duration) * 100;

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
    }
  }, [audioRef, track, songsData]);

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
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
