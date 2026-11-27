import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles, Star } from "lucide-react";
// import Doodle from "./Doodle.jsx";
import { photos } from "../data/content.js";
import ParallaxImage from "./ParallaxImage.jsx";
import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grain" />
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <span className="eyebrow-line" /> YOUR HIGHWAY FOOD DESTINATION
          </motion.div>
          <h1>
            <motion.span initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>GOOD FOOD.</motion.span>
            <motion.span className="serif-line" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>GREAT <i>MOOD.</i></motion.span>
            <motion.span initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}>GOOD <i>TIMES.</i></motion.span>
          </h1>
          <motion.p className="hero-desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            From your morning chai to delicious meals and evening snacks, find your favourite food moments at Varanasi.
          </motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <a className="button button-green" href="#menu">Explore our menu <ArrowRight size={17} /></a>
            <a className="text-link" href="#visit">Find our location <ArrowUpRight size={16} /></a>
          </motion.div>
          <div className="hero-meta">
            <div className="rating-stars"><Star /><Star /><Star /><Star /><Star className="star-half" /></div>
            <div><b>4.6 / 5</b><span>Google rating · 10 reviews</span></div>
          </div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hero-image-wrap"><ParallaxImage src={photos.hero} alt="A colourful spread of fresh food" loading="eager" fetchPriority="high" strength={22} /></div>
          <div className="hero-sticker"><span>MADE FOR</span><b>food<br />lovers</b><Sparkles size={17} /></div>
          <div className="hero-caption"><span className="caption-dot" /> TASTE. RELAX. REPEAT.</div>
          {/* <Doodle className="hero-doodle" /> */}
          {/* <div className="image-index">01 <span>/</span> 05</div> */}
        </motion.div>
      </div>
      <a className="scroll-cue" href="#story"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
      <div className="hero-bottom-word">GOOD THINGS ARE COOKING</div>
    </section>
  );
}
