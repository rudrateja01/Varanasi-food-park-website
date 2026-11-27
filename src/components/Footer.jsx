import { Link } from "../router.jsx";
import { Instagram } from "lucide-react";
import Brand from "./Brand.jsx";
import { IG_URL, MAP_URL } from "../data/content.js";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div><Brand light /><p className="footer-tagline">Taste. Relax. Repeat.</p></div>
          <div className="footer-links"><span>EXPLORE</span><a href="#story">Our story</a><a href="#experiences">Food moments</a><a href="#menu">Menu</a><a href="#gallery">Gallery</a><Link to="/order">Order online</Link></div>
          <div className="footer-links"><span>FIND US</span><p>65, Mumbai Highway,<br />Malkapur, SangaReddy,<br />Telangana 502295</p></div>
          <div className="footer-links"><span>LET'S CONNECT</span><a href={IG_URL} target="_blank" rel="noreferrer"><Instagram size={15} /> @varanasi_thefoodpark</a></div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VARANASI – THE FOOD PARK</span>
          <span>MADE FOR GOOD FOOD MOMENTS <span className="footer-star">✳</span></span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
