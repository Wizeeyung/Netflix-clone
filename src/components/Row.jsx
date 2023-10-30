import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import Movie from './Movie';
import {BiSolidChevronLeft, BiSolidChevronRight} from 'react-icons/bi'
import './css/row.css'


const Row = ({title, fetchUrl, rowId}) =>{
  
  const [movies, setMovies] = useState([]);
  const [like, setlike] = useState(false);

  
  useEffect(()=>{
    axios.get(fetchUrl).then((response)=>{
      setMovies(response.data.results)

    })
  }, [fetchUrl])

  const liked = () =>{
    setlike(!like)
  }
  //Function to allow slider to move left and getting the rowId for each role so as to have distinct behaviour
  const sliderLeft = () =>{
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  //Function to allow slider to move left
  const sliderRight = () =>{
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  

  return(
    <>
      <h1 className='row-header'>{title}</h1>
      <div className='row'>
      <BiSolidChevronLeft className='left-btn' onClick={sliderLeft} size={25}/>
        <div className='rows' id={'slider' + rowId}>
          {movies?.map((movie)=>(
            <Movie key={movie.id} movie={movie} liked={liked} like={like}  />
          ))}
        </div>
        <BiSolidChevronRight className='right-btn' onClick={sliderRight} size={25}/>
      </div>

    </>
  )
}

export default Row