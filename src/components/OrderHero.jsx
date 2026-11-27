import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import "../styles/OrderHero.css";

/*
 * Photos are existing site assets (public/ and public/menu/). Each one is shown as a round "plate" with a brass rim,
 * gloss, and a ground shadow. `depth` controls how far a plate moves with the mouse / scroll (bigger = closer to the viewer).
 * To use better photos later, just change `src` (transparent PNG cut-outs of dishes work great too).
 */
const PLATES = [
  { id: "main", src: "/Lunch.jpg", alt: "Rice with chicken curry served in red pots", depth: 0.5, fit: "50% 45%", dur: "9s", delay: "0s", tilt: 1 },
  { id: "puri", src: "/menu/category-tiffin.jpg", alt: "", depth: 1, fit: "50% 52%", dur: "7.5s", delay: "-2s", tilt: -1 },
  { id: "chai", src: "/menu/category-tea.jpg", alt: "", depth: 1.3, fit: "55% 86%", dur: "8.2s", delay: "-4s", tilt: 1 },
  { id: "snack", src: "/menu/category-snacks.jpg", alt: "", depth: 1.1, fit: "50% 55%", dur: "8.8s", delay: "-1s", tilt: -1 }
];

const ease = [0.22, 1, 0.36, 1];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

function Plate({ plate, index, mx, my, progress, reduce }) {
  const k = reduce ? 0 : 1; // no pointer / scroll movement when the visitor prefers reduced motion
  const x = useTransform(mx, (v) => v * plate.depth * 36 * k);
  const y = useTransform([my, progress], ([m, s]) => (m * plate.depth * 28 - s * plate.depth * 90) * k);
  return (
    <motion.div
      className={`hero-plate hero-plate-${plate.id}`}
      style={{ x, y }}
      initial={reduce ? false : { opacity: 0, scale: 1.22, rotate: plate.tilt * 5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.15, delay: 0.25 + index * 0.14, ease }}
    >
      <span className="hero-plate-shadow" style={{ "--float-dur": plate.dur, "--float-delay": plate.delay }} aria-hidden="true" />
      <div className="hero-plate-float" style={{ "--float-dur": plate.dur, "--float-delay": plate.delay }}>
        <div className="hero-plate-rim">
          <div className="hero-plate-face">
            <img src={plate.src} alt={plate.alt} style={{ objectPosition: plate.fit }} loading={index === 0 ? "eager" : "lazy"} decoding="async" draggable="false" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrderHero({ dishCount = 0, onOrder, onExplore }) {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const [inView, setInView] = useState(true);

  // Pointer position inside the hero, -0.5 … 0.5 (smoothed with a spring for a weighty, natural feel).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const lightX = useTransform(sx, (v) => 62 + v * 40);
  const lightY = useTransform(sy, (v) => 48 + v * 40);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${lightX}% ${lightY}%, rgba(236,190,110,0.22), transparent 62%)`;
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  // Pause the endless floating animation while the hero is off-screen (saves battery on phones).
  useEffect(() => {
    const node = heroRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== "mouse" || !heroRef.current) return; // touch screens use the gentle idle float only
    const rect = heroRef.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => { mx.set(0); my.set(0); };

  return (
    <section ref={heroRef} className="order-hero" data-paused={inView ? undefined : "true"} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} aria-labelledby="order-hero-title">
      <div className="order-hero-bg" aria-hidden="true">
        <motion.span className="order-hero-light" style={{ background: reduce ? undefined : spotlight }} />
        <span className="order-hero-grain" />
      </div>

      <div className="order-hero-inner">
        <motion.div className="order-hero-copy" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show">
            <motion.span variants={rise} className="order-hero-kicker"><i aria-hidden="true" />THE VARANASI MENU</motion.span>
            <motion.h1 variants={rise} id="order-hero-title">Taste Varanasi,<br /><em>ready when you are.</em></motion.h1>
            <motion.p variants={rise}>Crisp dosas, slow-cooked curries, evening snacks and a proper cup of chai. Choose your favourites and we'll have them fresh and waiting for pickup.</motion.p>
            <motion.div variants={rise} className="order-hero-actions">
              <button type="button" className="hero-btn hero-btn-primary" onClick={onOrder}><span>Order Now</span><ArrowRight size={18} aria-hidden="true" /></button>
              <button type="button" className="hero-btn hero-btn-ghost" onClick={onExplore}><span>Explore Menu</span><ArrowDown size={17} aria-hidden="true" /></button>
            </motion.div>
            <motion.ul variants={rise} className="order-hero-facts" aria-label="Highlights">
              <li><b>{dishCount || "70"}</b><span>dishes on the menu</span></li>
              <li><b>Pickup</b><span>ready at the counter</span></li>
              <li><b>Fresh</b><span>made to order</span></li>
            </motion.ul>
          </motion.div>
        </motion.div>

        <div className="order-hero-stage-wrap">
          <motion.div className="order-hero-stage" style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1300 }}>
            <span className="order-hero-rings" aria-hidden="true" />
            {PLATES.map((plate, index) => <Plate key={plate.id} plate={plate} index={index} mx={sx} my={sy} progress={scrollYProgress} reduce={reduce} />)}

            <motion.div className="hero-badge" initial={reduce ? false : { opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.9, ease }} aria-hidden="true">
              <svg viewBox="0 0 200 200" className="hero-badge-ring">
                <defs><path id="hero-ring-path" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" /></defs>
                <text><textPath href="#hero-ring-path" textLength="508" lengthAdjust="spacing">FRESHLY MADE · FULL OF FLAVOUR · MADE TO ORDER · </textPath></text>
              </svg>
              <img src="/Logo.jpg" alt="" />
            </motion.div>

            <span className="hero-spark hero-spark-1" aria-hidden="true" />
            <span className="hero-spark hero-spark-2" aria-hidden="true" />
            <span className="hero-spark hero-spark-3" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}