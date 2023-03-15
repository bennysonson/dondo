import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

const { REACT_APP_API_KEY } = process.env;
const playlistIDS = ['40Vb0BdWCuGQzcAqKzYf5L', '5VgkKiWwUIhRJDFxg48RA1', '65JdYHLTHyGMzc3LaQ0BsY']

const App = () => {

  const [isLoading, setLoading] = useState(true);
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
  }

  return (
    <div className='App'>
      <p>
        hello world!
      </p>
      {console.log(songs)}
    </div>
  )
}

export default App;
