import axios from "axios";
import React, { useState, useEffect } from "react";
import { server } from "../index";
import DataTableTemplate from "./DataTableTemplate";
import Error from "./Error";
import Loader from "./Loader";
import server_down from "../Assets/server_down.png"
function Coins() {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [error,setError] = useState(false);
  const handleOnchange = (e) => {
    setSearch(e.target.value);
  };
  const handlePrevious =()=>{
    if (page ===1) {
      setPage(1);
    }else{
      setPage(prev => prev-1);
    }
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=usd&per_page=100&page=${page}`
        );
        setCoins(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setError(true);
      }
    };
    fetch();
  }, [page]);
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
          </div>
          <div className="coins-table-container">
            <table>
              <thead>
                <tr>
                  <th className="rank">#rank</th>
                  <th className="unique">coin</th>
                  <th className="common">price</th>
                  <th className="common">24h high</th>
                  <th className="common">24h low</th>
                  <th className="common">market cap</th>
                  <th className="common">total volume</th>
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
          <div className="pagination">
              <ul>
                <li className="page-item">
                  <button onClick={handlePrevious}>previous</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{setPage(1)}}>1</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{setPage(2)}}>2</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{setPage(3)}}>3</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{setPage(prev=>prev+1)}}>next</button>
                </li>
              </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Coins;
