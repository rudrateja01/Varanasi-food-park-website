import { ArrowUpRight, Instagram } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { IG_URL, photos } from "../data/content.js";
import "../styles/InstagramSection.css";

const pics = [photos.house, photos.family, photos.hut, photos.outsideview];

export default function InstagramSection() {
  return (
    <section className="instagram-section section-pad">
      <div className="wrap">
        <Reveal className="instagram-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> FOLLOW THE FLAVOUR</div>
            <h2>A LITTLE MORE<br /><em>VARANASI.</em></h2>
          </div>
          <div className="instagram-cta">
            <p>Food, flavours, and moments worth sharing. Come say hello.</p>
            <a className="underlined-link" href={IG_URL} target="_blank" rel="noreferrer"><Instagram size={17} /> @varanasi_thefoodpark <ArrowUpRight size={16} /></a>
          </div>
        </Reveal>
        <div className="insta-grid">
          {pics.map((p) => (
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="insta-tile" key={p} aria-label="Visit Varanasi The Food Park on Instagram">
              <img src={p} alt="Food and refreshment inspiration" loading="lazy" />
            </a>
          ))}
        </div>
        <p className="instagram-foot">TAG YOUR FOOD MOMENTS <span>✳</span> #VARANASITHEFOODPARK</p>
      </div>
    </section>
  );
}
