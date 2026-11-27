import Reveal from "./Reveal.jsx";
// import Doodle from "./Doodle.jsx";
import { photos } from "../data/content.js";
import "../styles/Gallery.css";

export default function Gallery() {
  return (
    <section className="gallery section-pad" id="gallery">
      <div className="wrap">
        <Reveal className="section-heading gallery-heading">
          <div className="eyebrow"><span className="eyebrow-line" /> A FEAST FOR THE EYES</div>
          <h2>NOT JUST A FOOD STOP.<br /><em>YOUR HAPPY PLACE.</em></h2>
        </Reveal>
        <div className="gallery-grid">
          <Reveal className="gallery-large"><img src={photos.outsideview} alt="Restaurant interior inspiration" loading="lazy" /><span className="gallery-label">THE PLACE TO BE</span></Reveal>
          <Reveal className="gallery-small gallery-one"><img src={photos.freshmade} alt="Freshly prepared food" loading="lazy" /><span>FRESHLY MADE</span></Reveal>
          <Reveal className="gallery-small gallery-two"><img src={photos.tea} alt="A cup of chai" loading="lazy" /><span>CHAI O'CLOCK</span></Reveal>
          <Reveal className="gallery-wide"><img src={photos.lunch} alt="A colourful meal" loading="lazy" /><span>GOOD TIMES, GREAT BITES</span></Reveal>
          <div className="gallery-grid-foot">
              <p>Little moments. Lovely flavours.<br /><em>More memories to make.</em></p>
          </div>
        </div>
        {/* <div className="gallery-foot">
          <Doodle />
          <p>Little moments. Lovely flavours.<br /><em>More memories to make.</em></p>
          <a href={IG_URL} target="_blank" rel="noreferrer" className="underlined-link">See us on Instagram <ArrowUpRight size={16} /></a>
        </div> */}
      </div>
    </section>
  );
}
