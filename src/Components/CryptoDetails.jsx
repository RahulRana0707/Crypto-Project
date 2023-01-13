import React, { useState, useEffect } from "react";
import server_down from "../Assets/server_down.png";
import axios from "axios";
import Error from "./Error";
import Loader from "../Components/Loader";
import { server } from "../index";
import { useParams } from "react-router-dom";
import { BiLinkAlt, BiLinkExternal, BiCodeAlt } from "react-icons/bi";
import { TbTriangle, TbTriangleInverted } from "react-icons/tb";
function CryptoDetails() {
  const [coin, setCoin] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [error, setError] = useState(false);
  const params = useParams();
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        console.log(data);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetch();
  }, [currency, params]);

  if (error)
    return (
      <Error
        image={server_down}
        error_code="400 - bad request"
        error_name="url"
      />
    );
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="details-page">
            <div className="crypto-details">
              <div className="first-container">
                <div className="image">
                  <img src={coin.image.large} alt="CryptoCurrency_Image"></img>
                </div>
                <div className="crypto-name">
                  <h2>{coin.name}</h2>
                </div>
                <div className="crypto-symbol">
                  <h4>{coin.symbol}</h4>
                </div>
                <div className="crypto-rank">
                  <h3>{coin.market_cap_rank}</h3>
                </div>
                <div className="crypto-homepage">
                  <a
                    href={
                      coin.links.homepage[0]
                        ? coin.links.homepage[0]
                        : alert("Sorry, Page not available")
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>
                      <BiLinkAlt />
                    </span>
                    {coin.name}
                    <span>
                      <BiLinkExternal />
                    </span>
                  </a>
                </div>
                <div className="crypto-repo">
                  <a
                    href={coin.links.repos_url.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>
                      <BiCodeAlt />
                    </span>
                    source code
                    <span>
                      <BiLinkExternal />
                    </span>
                  </a>
                </div>
              </div>
              <div className="second-container">
                <div className="crypto-name">
                  <h2>
                    {coin.name} price ({coin.symbol})
                  </h2>
                </div>
                <div className="crypto-price-high">
                  <div className="price">
                    <h2>
                      <span>{currencySymbol}</span>
                      {coin.market_data.current_price[currency]}
                    </h2>
                  </div>
                  <div className="high-low">
                    <h3
                      style={
                        coin.market_data.price_change_24h > 0
                          ? { backgroundColor: "#5cb85c" }
                          : { backgroundColor: "#d9534f" }
                      }
                    >
                      {coin.market_data.price_change_24h}
                      <span>
                        {coin.market_data.price_change_24h > 0 ? (
                          <TbTriangle />
                        ) : (
                          <TbTriangleInverted />
                        )}
                      </span>
                    </h3>
                  </div>
                </div>
                <div className="low-24h">
                  <h5>low</h5>
                  <b>
                    <span>{currencySymbol}</span>
                    {coin.market_data.low_24h[currency]}
                  </b>
                </div>
                <div className="high-24h">
                  <h5>high</h5>
                  <b>
                    <span>{currencySymbol}</span>
                    {coin.market_data.high_24h[currency]}
                  </b>
                </div>
              </div>
              <div className="third-container">
                <div className="market-cap">
                  <h4>Market Cap</h4>
                  <h3>
                    <span>{currencySymbol}</span>
                    {coin.market_data.market_cap[currency]}
                  </h3>
                </div>
                <div className="diluted-valuation">
                  <h4>Fully Diluted Market Cap</h4>
                  <h3>
                    <span>{currencySymbol}</span>
                    {coin.market_data.fully_diluted_valuation[currency]}
                  </h3>
                </div>
                <div className="total-volume">
                  <h4>total volume</h4>
                  <h3>
                    <span>{currencySymbol}</span>
                    {coin.market_data.total_volume[currency]}
                  </h3>
                </div>
                <div className="public-intrest">
                  <h4>public intrest score</h4>
                  <b
                    style={
                      coin.public_interest_score > 0
                        ? { backgroundColor: "#5cb85c" }
                        : { backgroundColor: "#d9534f" }
                    }
                  >
                    {coin.public_interest_score}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CryptoDetails;
