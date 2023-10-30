import React, {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './css/main.css'
import requests from '../Request'

const Main = () => {

  const [movies, setMovies] = useState([])
  const [read, setRead] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null);
 

  useEffect(()=>{
    axios.get(requests.requestPopular).then((response)=>{
      setMovies(response.data.results);
      //This code only allows to pick one movie from the whole array of movies
      const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
      setSelectedMovie(randomMovie);
    })
  }, [])

  //This is used to shorten the words if they are more than a certain number
  const truncateString = (str, num) =>{
    if (str?.length > num){
      return str.slice(0, num) + '...'
    }else{
      return str
    }
  }

  const readMore = ()=>{
    setRead(true) 
  }

  return (
    <div className='banner'>
      <div className='banner-bg'>
        <div className='gradient'></div>
        <img src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`} alt={selectedMovie?.title} />

        <div className='banner-txt'>
          <h1>{selectedMovie?.title}</h1>
          <div className='banner-btn'>
            <button>Play</button>
            <button>Watch Later</button>
          </div>
          <p>Released: {selectedMovie?.release_date}</p>
          <p className='overview'>{!read && truncateString(selectedMovie?.overview,150)} <span className='read-btn' onClick={()=> readMore()}>{read ? null : 'Read More'}</span></p>
          <p className='overview'>{ read && selectedMovie?.overview}</p>

        </div>
      </div>

    </div>
  )
}

export default Main