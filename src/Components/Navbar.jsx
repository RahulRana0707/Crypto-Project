import React, { useRef, useState } from "react";
import { GiElvenCastle, GiHamburgerMenu } from "react-icons/gi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai"
function Navbar() {
  const [theme, setTheme] = useState(true);
  const changeTheme = () => {
    setTheme((prev) => !prev);
    document.body.classList.toggle('dark-theme-variables');
  };
  const ref = useRef();
  const closeNav =()=>{
    ref.current.classList.toggle("active")
  }
  const openNav = ()=>{
    ref.current.classList.toggle("active");
  }
  return (
    <header>
      <div className="container">
        <div className="logo">
          <span>
            <GiElvenCastle />
          </span>
          <h3 className="logo-name">Crypto Castle</h3>
        </div>
        <div className="nav-links" ref={ref} onClick={closeNav}>
          <ul>
          <span><AiOutlineClose/></span>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/coins"}>coins</Link>
            </li>
            <li>
              <Link to={"exchanges"}>exchanges</Link>
            </li>
            <li>
              <Link to={"/crypto/:id"}>crypto details</Link>
            </li>
            <li>
              <Link to={"/contact"}>contact me</Link>
            </li>
          </ul>
        </div>
        <div className="corner-btn">
          <button id="theme-btn" onClick={changeTheme}>
            {theme ? <BsFillMoonFill /> : <BsFillSunFill />}
          </button>
          <button id="menu-btn" onClick={openNav}>
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;