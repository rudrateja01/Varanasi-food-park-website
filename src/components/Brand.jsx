import { Link } from "../router.jsx";

export default function Brand({ light = false, to = "" }) {
  const className = `brand ${light ? "brand-light" : ""}`;
  const inner = (
    <>
      <span className="brand-mark"><img src="/Logo.jpg" alt="" /><span></span></span>
      <span className="brand-copy"><b>VARANASI</b><small>THE FOOD PARK</small></span>
    </>
  );
  // `to` is used on other pages (e.g. /order) to go back to the homepage; on the homepage it scrolls to the top.
  return to
    ? <Link className={className} to={to} aria-label="Varanasi home">{inner}</Link>
    : <a className={className} href="#home" aria-label="Varanasi home">{inner}</a>;
}
