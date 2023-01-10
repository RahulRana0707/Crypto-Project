import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home"
import Coins from "./Components/Coins"
import Exchanges from "./Components/Exchanges"
import CryptoDetails from "./Components/CryptoDetails"
import Contact from "./Components/Contact"
import "../src/Styles/All.scss"
import "../src/Styles/Navbar.scss"
import "../src/Styles/CoinsCard.scss"
import "../src/Styles/Exchanges.scss"
import "../src/Styles/Coins.scss"
import Error from "./Components/Error";
import page_not_found from "../src/Assets/page_not_found.png"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/coins" element={<Coins/>}></Route>
        <Route path="/exchanges" element={<Exchanges/>}></Route>
        <Route path="/crypto/:id" element={<CryptoDetails/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="*" element={<Error image={page_not_found} error_code="404 - page not found" error_name = "page"/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
