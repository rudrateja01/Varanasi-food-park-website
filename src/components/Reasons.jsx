import { Clock3, Heart, MapPin, Utensils } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { reasons } from "../data/content.js";
import "../styles/Reasons.css";

const icons = { clock: <Clock3 />, heart: <Heart />, utensils: <Utensils />, pin: <MapPin /> };

export default function Reasons() {
  return (
    <section className="reasons section-pad">
      <div className="wrap">
        <Reveal className="section-heading centered">
          <div className="eyebrow"><span className="eyebrow-line" /> THE VARANASI FEELING</div>
          <h2>GOOD FOOD IS<br /><em>JUST THE BEGINNING.</em></h2>
        </Reveal>
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <Reveal className="reason" key={r.title} delay={i * 0.07}>
              <div className="reason-top"><span className="reason-icon">{icons[r.icon]}</span><span>0{i + 1}</span></div>
              <h3>{r.title}</h3><p>{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
