import './App.css';
/* import axios from 'axios';
import { useState, useEffect } from 'react'

const { REACT_APP_API_KEY } = process.env;
const playlistIDS = ['40Vb0BdWCuGQzcAqKzYf5L', '5VgkKiWwUIhRJDFxg48RA1', '65JdYHLTHyGMzc3LaQ0BsY']; */
const allSongs = require('./sampleSongList.json').items;

const App = () => {

  //Disabled until I can use free Spotify API again. For now a sample object is used
  /* const [isLoading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      for (const id of playlistIDS) {
        const options = {
          method: 'GET',
          url: 'https://spotify23.p.rapidapi.com/playlist_tracks/',
          params: { id: id, offset: '0', limit: '100' },
          headers: {
            'X-RapidAPI-Key': `${REACT_APP_API_KEY}`,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
        };

        try {
          let response = await axios(options);
          let allSongs = songs;
          allSongs.push(...response.data.items);
          setSongs(allSongs);
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(false);
    }
    fetchSongs();
  }, []);

  if (isLoading) {
    return <div className="App">Loading database...</div>;
  } */

  //simplify objects for Dondo use
  let songs = [];
  for (const song of allSongs) {
    const newSong = {
      name: song.track.name,
      duration: song.track.duration_ms / 1000,
      album: song.track.album.name
    }
    songs.push(newSong);
  }
  console.log(songs);

  //Get random song
  const targetSong = songs[Math.floor(Math.random() * (songs.length))];
  console.log(targetSong);


  return (
    <div className='App'>
      <h1>Dondo</h1>
      <div className='songInput'>
        <input placeholder='enter a song'></input>
      </div>
    </div>
  )
}

export default App;
