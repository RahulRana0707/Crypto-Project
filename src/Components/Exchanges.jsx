import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import CoinsCard from "./CoinsCard";
import Loader from "./Loader";
function Exchnages() {
  const [exchanges, setExchanges] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  const changeNameOrder=()=>{
    const newArr = exchanges.sort((a,b)=>{
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    setExchanges(prev => [...prev],newArr);
  }
  const changeYearOrder=()=>{
    const newArr = exchanges.sort((a,b)=>{
      if (a.year_established > b.year_established) return -1;
      if (a.year_established < b.year_established) return 1;
      return 0;
    })
    setExchanges(prev => [...prev],newArr);
  }
  const changeCountryOrder=()=>{
    const newArr = exchanges.sort((a,b)=>{
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      return 0;
    })
    setExchanges(prev => [...prev],newArr);
  }
  return (
    <div className="Exchanges">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="filter-btn">
            <button onClick={changeNameOrder}>Name A-Z</button>
            <button onClick={changeYearOrder}>Newest to Oldest</button>
            <button onClick={changeCountryOrder}>Country A-Z</button>
          </div>
          <div className="exchanges-data">
            {exchanges.map((i, key) => (
              <CoinsCard
                key={key}
                url={i.url}
                img={i.image}
                name={i.name}
                rank={i.trust_score_rank}
                country={i.country?i.country:"N/A"}
                year={i.year_established?i.year_established:2012}
              ></CoinsCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Exchnages;
