import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/navbar.css'
import { UserAuth } from '../context/AuthContext'

const Navbar =  () =>{

  const {user, logout} = UserAuth()
  console.log(user)
  const navigate = useNavigate()
  
  const handleLogout = async () =>{
    try{
      await logout()
      navigate('/')
    }catch(error){
      console.log(error)
      alert(error.message)
    }
  }

  return(
    <div className='navbar'>
      {user ? <Link to='/home'className='nav-link'><h1>NETFLIX</h1></Link> : 
      <Link to='/'className='nav-link'><h1>NETFLIX</h1></Link>}
      
      {user?.email ? (<div className='nav-btn'>
        <Link to='/account' className='nav-linkss'><button>Account</button></Link>
        <button className='nav-link-btn' onClick={handleLogout}>Log Out</button>
      </div>) : (<div className='nav-btn'>
        <Link to='/login' className='nav-linkss'><button>Sign In</button></Link>
        <Link to='/signup' className='nav-links'><button className='nav-link-btn'>Sign Up</button></Link>
      </div>)}
      

    </div>
  )
}

export default Navbar;