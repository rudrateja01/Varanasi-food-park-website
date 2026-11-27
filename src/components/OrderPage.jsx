import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Gamepad2,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";

import Brand from "./Brand.jsx";
import FoodImage from "./FoodImage.jsx";
import { Link } from "../router.jsx";
import { digitalMenu } from "../data/digitalMenu.js";
import "../styles/OrderPage.css";
import OrderHero from "./OrderHero.jsx";
import WaitingGames from "./WaitingGames.jsx";

const CART_KEY = "vf-customer-preview-cart-v1";

const money = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

function loadCart() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(CART_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function scrollToId(id) {
  const reduced = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.getElementById(id)?.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}

export default function OrderPage() {
  const [items] = useState(digitalMenu);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [funGamesOpen, setFunGamesOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Order Online – Digital Menu | Varanasi – The Food Park";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // The cart still works for the current page if browser storage is unavailable.
    }
  }, [cart]);

  useEffect(() => {
    const panelOpen = cartOpen || funGamesOpen;
    if (!panelOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setFunGamesOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [cartOpen, funGamesOpen]);

  const categories = useMemo(
    () => ["All", ...new Set(items.map((item) => item.category))],
    [items]
  );

  const visibleItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) =>
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(term)
    );
  }, [items, category, search]);

  const cartItems = Object.values(cart);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const updateQuantity = (item, delta) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[item.id]?.quantity || 0) + delta;

      if (quantity <= 0) {
        delete next[item.id];
      } else {
        next[item.id] = {
          ...item,
          quantity: Math.min(quantity, 50),
        };
      }

      return next;
    });
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <Link to="/" className="order-back" aria-label="Back to website">
          <ArrowLeft size={17} />
          <span>Back to website</span>
        </Link>

        <Brand to="/" />

        <div className="order-header-actions">
          <button
            type="button"
            className="order-history-button"
            onClick={() => setFunGamesOpen(true)}
            aria-label="Open Fun Games"
          >
            <Gamepad2 size={17} />
            <span>Fun Games</span>
          </button>

          <button
            type="button"
            className="order-cart-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            <b>{count}</b>
          </button>
        </div>
      </header>

      <main className="order-main" id="main-content">
        <OrderHero
          dishCount={items.length}
          onOrder={() => scrollToId("order-menu")}
          onExplore={() => scrollToId("order-categories")}
        />

        <section
          className="order-catalogue"
          id="order-menu"
          aria-label="Digital food menu"
        >
          <div className="order-catalogue-top">
            <div>
              <span className="order-kicker">EXPLORE THE MENU</span>
              <h2>What are you craving?</h2>
            </div>

            <label className="order-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search dishes..."
                aria-label="Search menu items"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          <div
            className="order-categories"
            id="order-categories"
            role="tablist"
            aria-label="Food categories"
          >
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={category === name}
                className={category === name ? "selected" : ""}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="order-results-label">
            <span>{category === "All" ? "OUR MENU" : category.toUpperCase()}</span>
            <span>
              {visibleItems.length} {visibleItems.length === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>

          <div className="order-grid">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item) => {
                const orderable = item.available !== false && Number.isFinite(item.price);

                return (
                  <motion.article
                    layout
                    key={item.id}
                    className={`food-card food-card-text-only ${orderable ? "" : "unavailable"}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="food-card-info">
                      <div className="food-card-details">
                        <h3>{item.name}</h3>
                        <strong>
                          {Number.isFinite(item.price) ? money(item.price) : "Price coming soon"}
                        </strong>
                      </div>

                      {orderable ? (
                        <button
                          type="button"
                          className="food-add"
                          onClick={() => updateQuantity(item, 1)}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <Plus size={17} />
                          <span>Add</span>
                        </button>
                      ) : (
                        <span className="price-pending">Not available</span>
                      )}
                    </div>

                    {cart[item.id] && (
                      <div className="food-quantity">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, -1)}
                          aria-label={`Remove one ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <b aria-live="polite">{cart[item.id].quantity}</b>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, 1)}
                          aria-label={`Add one more ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {!visibleItems.length && (
            <div className="order-empty">
              No dishes found.{" "}
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show the full menu
              </button>
            </div>
          )}
        </section>
      </main>

      {count > 0 && !cartOpen && !funGamesOpen && (
        <button
          type="button"
          className="order-floating-cart"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCart size={19} />
          <span>
            View your cart · {count} {count === 1 ? "item" : "items"}
          </span>
          <b>{money(total)}</b>
        </button>
      )}

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button
              type="button"
              className="order-scrim"
              aria-label="Close cart"
              onClick={() => setCartOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="order-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Your cart"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
            >
              <div className="drawer-heading">
                <div>
                  <span className="order-kicker">YOUR SELECTION</span>
                  <h2>Your cart ({count})</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                >
                  <X />
                </button>
              </div>

              {cartItems.length ? (
                <>
                  <div className="drawer-items">
                    {cartItems.map((item) => (
                      <div className="drawer-item" key={item.id}>
                        <FoodImage item={item} alt="" />
                        <div className="drawer-item-copy">
                          <b>{item.name}</b>
                          <span>{money(item.price)} each</span>
                          <div className="drawer-qty">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item, -1)}
                              aria-label={`Remove one ${item.name}`}
                            >
                              <Minus size={13} />
                            </button>
                            <b>{item.quantity}</b>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item, 1)}
                              aria-label={`Add one more ${item.name}`}
                            >
                              <Plus size={13} />
                            </button>
                            <button
                              type="button"
                              className="remove-item"
                              onClick={() => updateQuantity(item, -item.quantity)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <strong>{money(item.price * item.quantity)}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="drawer-footer">
                    <div className="drawer-total">
                      <span>Subtotal</span>
                      <b>{money(total)}</b>
                    </div>
                    <p>Review your selected items. Online checkout is not available in this preview.</p>
                    {/* Visible by request, intentionally has no click action. */}
                    <button
                      type="button"
                      className="order-primary"
                      aria-disabled="true"
                      title="Checkout is not available in this preview"
                    >
                      Place Order at Counter
                      {/* <ArrowRight size={17} /> */}
                    </button>
                  </div>
                </>
              ) : (
                <div className="cart-empty">
                  <ShoppingCart size={32} />
                  <h3>Your cart is empty</h3>
                  <p>Add a few favourites from the menu.</p>
                  <button
                    type="button"
                    className="order-primary"
                    onClick={() => setCartOpen(false)}
                  >
                    Explore menu
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* STANDALONE FUN GAMES */}
      <AnimatePresence>
        {funGamesOpen && (
          <WaitingGames
            key="standalone-fun-games"
            standalone={true}
            menuItems={items}
            money={money}
            onClose={() => setFunGamesOpen(false)}
          />
        )}
      </AnimatePresence>

      <footer className="order-footer">
        <span>VARANASI – THE FOOD PARK</span>
        <Link to="/">Back to the main experience</Link>
      </footer>
    </div>
  );
}
