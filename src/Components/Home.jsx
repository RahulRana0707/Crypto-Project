import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {server} from "../index"
// import slider1 from "../Assets/slider1.jpg"
// import slider2 from "../Assets/slider2.jpg"
// import slider3 from "../Assets/slider3.jpg"
// import slider4 from "../Assets/slider4.jpg"
// import slider5 from "../Assets/slider5.jpg"
// import slider6 from "../Assets/slider6.jpg"
function Home() {
  const [trending,setTrending] = useState([]);
  useEffect(()=>{
    const fetch = async ()=>{
      try {
        const {data} = await axios.get(`${server}/search/trending`)
        setTrending(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  },[])
  return (
    <>hii</>
  )
}

export default Home