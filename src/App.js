import './App.css';
/* import axios from 'axios';
 */import { useState, useEffect } from 'react'

/* const { REACT_APP_API_KEY } = process.env;
const playlistIDS = ['40Vb0BdWCuGQzcAqKzYf5L', '5VgkKiWwUIhRJDFxg48RA1', '65JdYHLTHyGMzc3LaQ0BsY']; */
const allSongs = require('./sampleSongList.json').items;
let songs = [];
let guessedSongs = [];
let targetSong;

const App = () => {

  const [searchSong, setSearchSong] = useState("");

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
  useEffect(() => {
    for (const song of allSongs) {
      const newSong = {
        name: song.track.name,
        duration: Math.floor(song.track.duration_ms / 1000),
        album: song.track.album.name
      }
      songs.push(newSong);
    }
    console.log(songs);

    //Get random song
    targetSong = songs[Math.floor(Math.random() * (songs.length))];
    console.log(targetSong);
  }, []);

  //Guessed songs to render
  let guessedSongsRender = [];
  for (const song of guessedSongs) {
    guessedSongsRender.push(
      <div key={song.name}>
        {song.name}
        {song.duration} {song.durationCompare}
        {song.album} {song.nameCompare}
      </div>)
  }

  return (
    <div className='App'>
      <h1>Dondo</h1>
      <div className='songInput' onKeyDown={(e) => {
        if (e.code === "Enter") {
          let song = songs.find(element => element.name === e.target.value);
          if (song !== undefined) {
            //set comparing info
            song.duration > targetSong.duration ? (
              song.durationCompare = "down"
            ) : (
              song.durationCompare = "up"
            )

            song.album === targetSong.album ? (
              song.albumCompare = "match"
            ) : (
              song.albumCompare = "noMatch"
            )

            song.name > targetSong.name ? (
              song.nameCompare = "left"
            ) : (
              song.nameCompare = "right"
            )


            guessedSongs.push(song);
            
            //To rerender
            setSearchSong(e.target.value);
            console.log(guessedSongs);
          } else {
            alert('Invalid song');
          }
        }
      }}>
        <input placeholder='enter a song'></input>
      </div>
      {
        guessedSongs?.length > 0 ? (
          <div>
            {guessedSongsRender}
          </div>
        ) : (
          <div className="instructions">
            <h2>Instructions: Guess a song!</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
