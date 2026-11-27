import { ArrowUpRight, Star } from "lucide-react";
import "../styles/Reviews.css";

export default function Reviews() {
  return (
    <section className="reviews">
      <div className="wrap reviews-inner">
        <div className="review-copy">
          <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> KIND WORDS</div>
          <h2>GOOD FOOD.<br /><em>GOOD WORDS.</em></h2>
          <p>We’re grateful for every visit, every shared meal, and every kind word.</p>
          <a href="https://www.google.com/search?q=Varanasi+The+Food+Park+Malkapur+reviews" target="_blank" rel="noreferrer" className="button button-cream">Read Google reviews <ArrowUpRight size={16} /></a>
        </div>
        <div className="rating-block">
          <div className="rating-number">4.6<span>/5</span></div>
          <div className="rating-stars big"><Star /><Star /><Star /><Star /><Star /></div>
          <p>GOOGLE RATING</p>
          <div className="rating-divider" />
          <strong>10</strong><span>Google reviews</span>
        </div>
      </div>
    </section>
  );
}
