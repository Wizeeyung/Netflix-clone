import React, {useEffect, useState} from 'react'
import axios from 'axios'
import requests from '../Request'
import '../components/css/signup.css' 
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import {SpinnerRoundOutlined} from 'spinners-react'

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [passowrd, setPassword] = useState('')
  const [error, setError] = useState('')
  const {user, signUp} = UserAuth()
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const [selectedMovie, setSelectedMovie] = useState([]);

  useEffect(()=>{
    axios.get(requests.requestPopular).then((response)=>{
      const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
      setSelectedMovie(randomMovie)
    })
  },[])

  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setLoader(true)
    }, 2000);

    return()=>{
      clearTimeout(loadingTimeout)
    }
  }, [])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setError('')
    try{
      await signUp(email, passowrd)
      navigate('/login')
    } catch (error){
      setError(error.message)
    }

  }

  const handleEmail = (e)=>{
    e.preventDefault()
    setEmail(e.target.value)
  }

  const handlePassword = (e) =>{
    e.preventDefault()
    setPassword(e.target.value)

  }



  return (
    <div className='signup'>
      <img className='signup-image' src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`} alt={selectedMovie?.title} />
      { loader ?
        <div className='signup-container'>
        <h1>Sign Up</h1>
        {error ? <p className='error'>{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email' value={email} onChange={handleEmail}/>
          <input type='password' placeholder='password' value={passowrd} onChange={handlePassword} />
          <button>Sign Up</button>
        </form>
        <div className='checkbox'>
          <div className='check-left'>
            <input type='checkbox' id='rememberMeCheckbox' name='checkbox' />
            <label htmlFor='rememberMeCheckbox'>Remember me</label>
          </div>
          <div className='check-right'>
            <p>Need help?</p>
          </div>
        </div>
        <p>Already subscribed to netflix? <span><Link to='/login'>Sign In</Link></span></p>

      </div> : 
      (<div className='spinner'><SpinnerRoundOutlined  type='TailSpin' height='100' width='100' color='red'/></div>)
      }

    </div>
  )
}

export default SignUp