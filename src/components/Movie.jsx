import React, { useEffect, useState } from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addToMovies } from '../redux/netflixSlice'


const Movie = ({movie}) => {

const dispatch = useDispatch()
const [like, setLike] = useState()
  
 const likedMovies = useSelector((state)=>(state.netflix.productData))

  
  const singleMoviesSelect = likedMovies.find((film)=>(
    film.id === movie.id
  ))


  useEffect(()=>{
    if(singleMoviesSelect){
      setLike(true)
    }else if(!singleMoviesSelect){
      setLike(false)
    }
  }, [singleMoviesSelect])

  const handleClick = ()=>{

      dispatch(addToMovies({
        id: movie.id,
        title: movie.original_title,
        link: movie.backdrop_path,
        releaseDate: movie.release_date,
      }));    
  }

  return (
    <div className='row-images'>
            <img src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt={movie?.original_title} />
            <div className='img-overlay' onClick={()=>handleClick()}>
              <p>{movie?.title}</p>
              <div className='row-heart'>{like ? <AiFillHeart /> : <AiOutlineHeart />}</div>

            </div>
    </div>
  )
}

export default Movie