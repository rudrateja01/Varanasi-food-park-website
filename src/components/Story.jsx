import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { photos } from "../data/content.js";
import ParallaxImage from "./ParallaxImage.jsx";
import "../styles/Story.css";

export default function Story() {
  return (
    <section className="story section-pad" id="story">
      <div className="wrap story-grid">
        <Reveal className="story-visual">
          <ParallaxImage src={photos.enterence} alt="Warm and welcoming restaurant ambience" strength={16} />
          <div className="story-photo-tag">A PLACE TO PAUSE <span>✳</span></div>
          <div className="story-number">01</div>
        </Reveal>
        <Reveal className="story-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT US</div>
          <h2>A LITTLE PLACE.<br /><em>A LOT OF FLAVOUR.</em></h2>
          <p className="lead">Some places are made for quick bites. Some are made for memorable moments.</p>
          <p>At Varanasi – The Food Park, enjoy delicious food, refreshing drinks, and a welcoming atmosphere. Whether it’s a chai break, a breakfast stop, or an evening with your favourite people, there’s always a reason to pull over.</p>
          <div className="signature">Made for food lovers <span>↗</span></div>
          <a className="underlined-link" href="#experiences">Discover the experience <ArrowRight size={16} /></a>
        </Reveal>
      </div>
    </section>
  );
}
