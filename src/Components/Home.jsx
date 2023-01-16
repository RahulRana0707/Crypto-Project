import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import "../Styles/Home.scss";
import DataTableTemplate from "./DataTableTemplate";
import { Link } from "react-router-dom";
import { BsBoxArrowInDown } from "react-icons/bs";
import slider1 from "../Assets/slider1.jpg";
function Home() {
  const [trending, setTrending] = useState([]);
  const [loader, setLoader] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${server}/search/trending`);
        const { data: coinData } = await axios.get(
          `${server}/coins/markets?vs_currency=usd&per_page=7`
        );
        setTrending(data.coins);
        setCoins(coinData);
        console.log(coinData);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="home-page">
          <div className="heading">
            <h2>trending coins</h2>
          </div>
          <div className="trending-coins">
            {trending.map((i) => {
              return (
                <div className="coins" key={i.item.id}>
                  <img src={i.item.large} alt="coin_logo"></img>
                  <h2>
                    {i.item.name}
                    <span>{i.item.symbol}</span>
                  </h2>
                  <Link to={`/crypto/${i.item.id}`}>
                    #rank{i.item.market_cap_rank}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="coins-table-container">
            <table>
              <thead>
                <tr>
                  <th className="rank remove-rank">#rank</th>
                  <th className="unique">coin</th>
                  <th className="common">price</th>
                  <th className="common remove">24h high</th>
                  <th className="common remove">24h low</th>
                  <th className="common remove-market-cap">market cap</th>
                  <th className="common remove-volume">total volume</th>
                </tr>

                {coins.map((i, key) => (
                  <DataTableTemplate
                    key={key}
                    id={i.id}
                    rank={i.market_cap_rank}
                    image={i.image}
                    name={i.name}
                    currencySymbol={"$"}
                    price={i.current_price}
                    high={i.high_24h}
                    low={i.low_24h}
                    marketCap={i.market_cap}
                    volume={i.total_volume}
                  />
                ))}
              </thead>
            </table>
            <div className="more-link">
              <Link to={"/coins"}>
                <p>more</p>
                <span>
                  <BsBoxArrowInDown />
                </span>
              </Link>
            </div>
          </div>
          <div className="crypto-info">
            <div className="info">
              <h4>what is cryptocurrency?</h4>
              <p>
                Cryptocurrency is a digital payment system that doesn't rely on
                banks to verify transactions. It’s a peer-to-peer system that
                can enable anyone anywhere to send and receive payments. Instead
                of being physical money carried around and exchanged in the real
                world, cryptocurrency payments exist purely as digital entries
                to an online database describing specific transactions. When you
                transfer cryptocurrency funds, the transactions are recorded in
                a public ledger. Cryptocurrency is stored in digital wallets.
              </p>
            </div>
            <div className="image-box">
              <img src={slider1} alt="crypto_coin_image"></img>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
