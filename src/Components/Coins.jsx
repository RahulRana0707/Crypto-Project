import axios from "axios";
import React, { useState, useEffect } from "react";
import { server } from "../index";
import DataTableTemplate from "./DataTableTemplate";
import Loader from "./Loader";
function Coins() {
  const [coins, setCoins] = useState([]);
  const [loader,setLoader] = useState(true);
  const [currencySymbol,setCurrencySymbol] = useState("$");
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=usd&per_page=100&page=1`
        );
        console.log(data);
        setCoins(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {loader?(<Loader/>):(
        <div className="coin-page">
      <div className="coins-table-container">
        <table>
          <tr>
            <th className="rank">#rank</th>
            <th className="unique">coin</th>
            <th className="common">price</th>
            <th className="common">24h high</th>
            <th className="common">24h low</th>
            <th className="common">market cap</th>
            <th className="common">total volume</th>
          </tr>
          {coins.map((i, key) => (
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
        </table>
      </div>
    </div>
      )}
    </>
  );
}

export default Coins;
