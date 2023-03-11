import './App.css';
import axios from 'axios';

let songs = [];
const playlistIDS = ['40Vb0BdWCuGQzcAqKzYf5L', '5VgkKiWwUIhRJDFxg48RA1', '65JdYHLTHyGMzc3LaQ0BsY']

for (const id of playlistIDS) {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/playlist_tracks/',
    params: { id: id, offset: '0', limit: '100' },
    headers: {
      'X-RapidAPI-Key': 'f8e079566emsh44b588e8f93db6fp197ec8jsn083a3171aa4c',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    songs = songs.concat(response.data.items);
    console.log(songs);
  }).catch(function (error) {
    console.error(error);
  });
}

const App = () => {
  return (
    <div className='App'>
      <p>
        hello world!
      </p>
    </div>
  )
}

export default App;
