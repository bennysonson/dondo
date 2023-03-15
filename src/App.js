import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

const { REACT_APP_API_KEY } = process.env;
const playlistIDS = ['40Vb0BdWCuGQzcAqKzYf5L', '5VgkKiWwUIhRJDFxg48RA1', '65JdYHLTHyGMzc3LaQ0BsY']

const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
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

      axios.request(options).then(function (response) {
        let songsSum = songs.push(...response.data.items);
        setSongs(songsSum);
        console.log(songs);
      }).catch(function (error) {
        console.error(error);
      });
    }
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div className="App">Loading database...</div>;
  }

  return (
    <div className='App'>
      <p>
        hello world!
      </p>
      {console.log(typeof(songs))}
    </div>
  )
}

export default App;
