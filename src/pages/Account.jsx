import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../components/css/account.css'
import { removeMovies } from '../redux/netflixSlice'
import {AiOutlineCloseSquare} from 'react-icons/ai'
import {SpinnerRoundOutlined} from 'spinners-react'
import { UserAuth } from '../context/AuthContext'

const Account = () => {

  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  const {user} = UserAuth()

  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setLoader(true)
    }, 1500);

    return()=>{
      clearTimeout(loadingTimeout)
    }
  }, [])

  const item = useSelector((state)=> state.netflix.productData)
  console.log(item)
  return (
    <div>
      <div className='acct-banner'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' alt='acct-banner' />
        {user ? <p className='acct-p'>Hi, {user.email}</p> : null}
        <h1 className='acct-h1'>Saved Movies</h1>
      </div>
      {loader ?
      <div className='acct-movies-container'>
      {item.map((movie)=>(
        <div key={movie.id} className='acct-movies'>
          <img src={`https://image.tmdb.org/t/p/original/${movie?.link}`} alt={movie.title} />
          <div className='acct-close-btn-div'><AiOutlineCloseSquare className='acct-close-btn' onClick={()=>dispatch(removeMovies(movie.id))}/></div>
          <h1>{movie.title}</h1>
        </div>

      ))}
      </div> :  (<div className='spinner'><SpinnerRoundOutlined type='TailSpin' height='50' width='50' color='red'/></div>)
      }
     
    </div>
  )
}

export default Account