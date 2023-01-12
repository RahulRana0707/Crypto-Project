import React, { useEffect,useState } from 'react'
import {useParams} from "react-router-dom"
import {server} from "../index";
import axios from 'axios';
import Loader from './Loader';
import Error from './Error';
import server_down from "../Assets/server_down.png"
import {BiLinkAlt,BiLinkExternal} from "react-icons/bi"
import {FaUserFriends} from "react-icons/fa"
import {BsCodeSlash} from "react-icons/bs"
import "../Styles/CryptoDetails.scss";
function CryptoDetails() {
  const [coin, setCoin] = useState({});
  const [loader, setLoader] = useState(true);
  const [error,setError] = useState(false);
  const params = useParams();
  useEffect(()=>{
    const fetch =async ()=>{
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        setLoader(false);
        console.log(data);
       
      } catch (error) {
        console.log(error)
        setError(true);
      }
    }
    fetch();
  },[params.id])
  if (error) return <Error image={server_down} error_code="400 - bad request" error_name = "url"/>
  return (
    <>
      {loader?<Loader/>:(
        <div className='crypto-details-page'>
          <div className='crypto-intro'>
            <div className='left-side'>
              <div className='top'>
                <div className='image'>
                  <img src={coin.image.small} alt="Crypto Logo"></img>
                </div>
                <div className='coin-name'>
                  <h2>{coin.name}</h2>
                </div>
                <div className='short-name'>
                  <h5>{coin.symbol}</h5>
                </div>
              </div>
              <div className='middle'>
                <div className='rank'>
                  <h2>{coin.coingecko_rank}</h2>
                </div>
                <div className='category'>
                  <p>{coin.categories[0]}</p>
                </div>
                <div className='price'>
                  <h2>{coin.market_data.current_price.inr}</h2>
                </div>
              </div>
              <div className='bottom'>
                <div className='coin-url'>
                  <a href={coin.links.homepage[0]} target="blank"><BiLinkAlt/><span>{coin.id}.org</span><BiLinkExternal/></a>
                </div>
                <div className='community'>
                  <a href={coin.links.official_forum_url[0]} target="blank"><FaUserFriends/><span>community</span></a>
                </div>
                <div className='source-code'>
                  <a href={coin.links.repos_url.github[0]} target="blank"><BsCodeSlash/><span>community</span><BiLinkExternal/></a>
                </div>
              </div>
            </div>
            <div className='right-side'>
              
            </div>
          </div>
          <div className='crypto-chart'></div>
        </div>
      )}
    </>
  )
}

export default CryptoDetails