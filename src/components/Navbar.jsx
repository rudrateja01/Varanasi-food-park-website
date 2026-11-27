import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import Brand from "./Brand.jsx";
import { Link } from "../router.jsx";
import { IG_URL, navLinks } from "../data/content.js";
import "../styles/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = navLinks
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">{navLinks.map(([label, href]) => <a key={href} href={href} className={activeSection === href ? "active" : ""} aria-current={activeSection === href ? "location" : undefined}>{label}</a>)}</nav>
        <div className="nav-actions">
          <a className="nav-insta" href={IG_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <Link className="button button-dark nav-cta" to="/order">Order Now <ArrowUpRight size={15} /></Link>
          <button type="button" className="menu-toggle" onClick={() => setOpen((current) => !current)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
            {navLinks.map(([label, href]) => <a key={href} href={href} className={activeSection === href ? "active" : ""} aria-current={activeSection === href ? "location" : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}
            <Link to="/order" onClick={() => setOpen(false)}>Order Now <ArrowUpRight size={16} /></Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
