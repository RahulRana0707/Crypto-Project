import React from "react";
import {
  AiFillPhone,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
} from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsHouseFill } from "react-icons/bs";
import "../Styles/Footer.scss";
function Footer() {
  return (
    <footer className="footer-section">
      <div className="parent-container">
        <div className="my-intro">
          <h2><span>rahul rana</span></h2>
          <p>Hope you all enjoyed being here</p>
        </div>
        <div className="social-links">
          <h2><span>social links</span></h2>
          <div className="buttons">
            <a href="https://github.com/RahulRana0707" target={"__blank"}>
              <span className="github">
                <AiFillGithub />
              </span>
              <h4>github</h4>
            </a>
            <a
              href="https://www.instagram.com/__rahul___rana/"
              target={"__blank"}
            >
              <span className="instagram">
                <AiFillInstagram />
              </span>
              <h4>instagram</h4>
            </a>
            <a
              href="https://www.linkedin.com/in/rahul-rana-663877241/"
              target={"__blank"}
            >
              <span className="linkedin">
                <AiFillLinkedin />
              </span>
              <h4>linkedin</h4>
            </a>
            <a href="https://wa.me/+918600639680" target={"__blank"}>
              <span className="whatsapp">
                <IoLogoWhatsapp />
              </span>
              <h4>whatsapp</h4>
            </a>
          </div>
        </div>
        <div className="contact-parts">
          <h2><span>contact</span></h2>
          <div className="info">
            <h4>
              <span>
                <BsHouseFill />
              </span>
              <b>maharashtra, india</b>
            </h4>
            <h4>
              <span>
                <AiFillMail />
              </span>
              <b style={{textTransform:"lowercase"}}>rr8407084@gmail.com</b>
            </h4>
            <h4>
              <span>
                <AiFillPhone />
              </span>
              <b>+91 8600639680</b>
            </h4>
          </div>
        </div>
      </div>
      <div className="copyright">
        <span>©</span>
        <h2>all right reserved 2022-23 -  rahul rana</h2>
      </div>
    </footer>
  );
}

export default Footer;
