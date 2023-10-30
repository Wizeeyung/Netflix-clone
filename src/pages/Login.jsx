import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import requests from '../Request'
import {SpinnerRoundOutlined} from 'spinners-react'
import { UserAuth } from '../context/AuthContext'
import '../components/css/signup.css' 

const Login = () => {

  const [email, setEmail] = useState('')
  const [passowrd, setPassword] = useState('')
  const {user, login} = UserAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
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
      await login(email, passowrd)
      navigate('/home')
      updateUserDisplayName(email)
    } catch (error){
      setError(error.message)
      console.log(error)
    }

  }

  const updateUserDisplayName = (newDisplayName) => {
    user.displayname = newDisplayName;
    console.log(user.displayname);
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
      { loader?
      <div className='signup-container'>
        <h1>Sign In</h1>
        {error ? <p className='error'>{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email' value={email} onChange={handleEmail} />
          <input type='password' placeholder='password' value={passowrd} onChange={handlePassword}/>
          <button>Sign In</button>
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
        <p>Already subscribed to netflix? <span><Link to='/signup'>Sign Up</Link></span></p>

      </div> :
      (<div className='spinner'><SpinnerRoundOutlined  type='TailSpin' height='100' width='100' color='red'/></div>)
      }

    </div>
  )
}

export default Login