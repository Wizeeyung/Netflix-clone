import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Request'
import {SpinnerRoundOutlined} from 'spinners-react'
import '../components/css/home.css'

const Home = () =>{

  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setLoader(true)
    }, 4000);

    return()=>{
      clearTimeout(loadingTimeout)
    }
  }, [])


  return (
    <div>
      <Main />
      {
        loader ? (<><Row rowId='1' title='Upcoming' fetchUrl={requests.requestUpcoming} />
        <Row rowId='2' title='Popular' fetchUrl={requests.requestPopular} />
        <Row rowId='3' title='Top Rated' fetchUrl={requests.requestTopRated} />
        <Row rowId='5' title='Trending' fetchUrl={requests.requestTrending} /></>) :  
         (<div className='spinner'><SpinnerRoundOutlined type='TailSpin' height='50' width='50' color='red'/></div>)
      }
      
      
    </div>
  )
}

export default Home