import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import CoinsCard from "./CoinsCard";
import Loader from "./Loader";
import Pagination from "./Pagination";
import Error from "./Error";
import server_down from "../Assets/server_down.png"
function Exchnages() {
  const [exchanges, setExchanges] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [error,setError] = useState(false);
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
        const { data } = await axios.get(`${server}/exchanges?per_page=100&page=${page}`);
        setExchanges(data);
        setLoader(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };
    fetch();
  }, [page]);
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
  if (error) return <Error image={server_down} error_code="400 - bad request" error_name = "url"/>
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
          <Pagination handlePrevious={handlePrevious} setPage={setPage}/>
        </>
      )}
    </div>
  );
}

export default Exchnages;
