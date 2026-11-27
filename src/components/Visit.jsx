import { ArrowUpRight, MapPin, Navigation, Star, Utensils } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { MAP_URL } from "../data/content.js";
import "../styles/Visit.css";

export default function Visit() {
  return (
    <section className="visit section-pad" id="visit">
      <div className="wrap visit-grid">
        <Reveal className="visit-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> COME ON OVER</div>
          <h2>YOUR NEXT<br />FOOD STOP<br /><em>IS HERE.</em></h2>
          <div className="visit-detail"><MapPin /><div><b>FIND US HERE</b><p>65, Mumbai Highway,<br />Malkapur, Telangana 502295, India.</p></div></div>
          <div className="visit-detail"><Star /><div><b>THE LOCAL LOVE</b><p>4.6 / 5 Google rating · 10 reviews</p></div></div>
          <div className="visit-detail"><Utensils /><div><b>PRICE RANGE</b><p>₹1–₹300 per person</p></div></div>
          {/* <a href={MAP_URL} target="_blank" rel="noreferrer" className="button button-green directions-button">Get directions <Navigation size={17} /></a> */}
        </Reveal>
        <Reveal className="map-card">
          <div className="map-top"><span><span className="live-dot" /> FIND YOUR WAY</span><span>MALKAPUR · TELANGANA</span></div>
          <a href={MAP_URL} target="_blank" rel="noreferrer" className="map-art" aria-label="Open Varanasi The Food Park in Google Maps">
            <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
            <div className="map-river" />
            <div className="map-pin"><MapPin size={27} fill="currentColor" /><span>VARANASI<br />THE FOOD PARK</span></div>
            <div className="map-label label-a">MUMBAI HIGHWAY</div><div className="map-label label-b">MALKAPUR</div>
            <div className="map-compass">N<br />↑</div>
            <div className="map-open">OPEN IN MAPS <ArrowUpRight size={15} /></div>
          </a>
          <div className="map-bottom"><span>65, Mumbai Highway, Malkapur</span><a href={MAP_URL} target="_blank" rel="noreferrer">View directions <ArrowUpRight size={15} /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
