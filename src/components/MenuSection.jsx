import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Reveal from "./Reveal.jsx";
import ParallaxImage from "./ParallaxImage.jsx";
import { MAP_URL, menuCategories, photos } from "../data/content.js";
import "../styles/MenuSection.css";

const photoFor = (c) =>
  c.includes("Tea") ? photos.tea : c.includes("Lunch") ? photos.lunch : c.includes("Snacks") ? photos.newsnack
  : c.includes("juices") ? photos.juice : c.includes("Dinner") ? photos.food : photos.tiffin;

export default function MenuSection() {
  const [active, setActive] = useState(menuCategories[0]);
  return (
    <section className="menu-section section-pad" id="menu">
      <div className="wrap">
        <Reveal className="menu-top">
          <div>
            <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> THE GOOD STUFF</div>
            <h2>MADE TO MAKE<br /><em>YOU CRAVE MORE.</em></h2>
          </div>
          <p>A little something for every appetite. Explore the food moments waiting for you at Varanasi.</p>
        </Reveal>
        <div className="menu-content">
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {menuCategories.map((c, i) => (
              <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)} role="tab" aria-selected={active === c}>
                <span>0{i + 1}</span>{c}
              </button>
            ))}
          </div>
          <div className="menu-display">
            <AnimatePresence mode="wait">
              <motion.div className="menu-feature" key={active} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                <ParallaxImage src={photoFor(active)} alt={`${active} inspiration`} strength={16} />
                <div className="menu-feature-overlay"><span>EXPLORE THE CATEGORY</span><h3>{active}</h3><p>Visit us and discover what's on the menu today.</p></div>
              </motion.div>
            </AnimatePresence>
            <div className="menu-note"><Sparkles size={18} /><p>Our menu is best explored in person. Drop by and ask our team about today's offerings.</p></div>
          </div>
        </div>
        <div className="menu-bottom"><span>GOOD FOOD, NO FUSS.</span><a href={MAP_URL} target="_blank" rel="noreferrer" className="button button-cream">Come hungry <ArrowUpRight size={16} /></a></div>
      </div>
    </section>
  );
}
