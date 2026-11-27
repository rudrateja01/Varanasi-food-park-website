import { ArrowUpRight, Instagram } from "lucide-react";
import { IG_URL, MAP_URL, photos } from "../data/content.js";
import "../styles/FinalCTA.css";

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="cta-image"><img src={photos.food} alt="A delicious food spread" loading="lazy" /></div>
      <div className="cta-overlay" />
      <div className="wrap cta-content">
        <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> SAVE A SEAT FOR YOUR CRAVINGS</div>
        <h2>GOOD FOOD IS CALLING.<br /><em>ARE YOU COMING?</em></h2>
        <p>Make your next food break a memorable one.</p>
        <div className="cta-actions">
          <a href={MAP_URL} target="_blank" rel="noreferrer" className="button button-cream">Find us on maps <ArrowUpRight size={16} /></a>
          <a href={IG_URL} target="_blank" rel="noreferrer" className="button button-outline">Follow on Instagram <Instagram size={16} /></a>
        </div>
      </div>
      <div className="cta-side-note">TASTE. RELAX. REPEAT.</div>
    </section>
  );
}
