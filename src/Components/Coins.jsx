import axios from "axios";
import React, { useState, useEffect } from "react";
import { server } from "../index";
import DataTableTemplate from "./DataTableTemplate";
import Error from "./Error";
import Loader from "./Loader";
import server_down from "../Assets/server_down.png"
import Pagination from "./Pagination";
function Coins() {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [error,setError] = useState(false);
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"
  const handleOnchange = (e) => {
    setSearch(e.target.value);
  };
  const handlePrevious =()=>{
    if (page ===1) {
      alert("The current page no is 1");
      setPage(1);
    }else{
      setPage(prev => prev-1);
    }
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&per_page=100&page=${page}`
        );
        setCoins(data);
        console.log(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setError(true);
      }
    };
    fetch();
  }, [page,currency]);
  if (error) return <Error image={server_down} error_code="400 - bad request" error_name = "url"/>
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="coin-page">
          <div className="filters">
            <div className="search-bar">
              <input
                type={"text"}
                id="search-bar"
                onChange={handleOnchange}
                placeholder="Search the coin you need..."
                autoComplete="off"
              ></input>
            </div>
            <div className="currency-btn">
              <button onClick={()=>{setCurrency("inr")}}><span>₹</span>INR</button>
              <button onClick={()=>{setCurrency("usd")}}><span>$</span>USD</button>
              <button onClick={()=>{setCurrency("eur")}}><span>€</span>EURO</button>
            </div>
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

                {coins
                  .filter((i) => i.name.toLowerCase().includes(search))
                  .map((i, key) => (
                    <DataTableTemplate
                      key={key}
                      id={i.id}
                      rank={i.market_cap_rank}
                      image={i.image}
                      name={i.name}
                      currencySymbol={currencySymbol}
                      price={i.current_price}
                      high={i.high_24h}
                      low={i.low_24h}
                      marketCap={i.market_cap}
                      volume={i.total_volume}
                    />
                  ))}
              </thead>
            </table>
          </div>
          <Pagination handlePrevious={handlePrevious} setPage={setPage}/>
        </div>
      )}
    </>
  );
}

export default Coins;
