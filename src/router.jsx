import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/*
 * Tiny History-API router (no extra package needed).
 * - navigate("/order") changes the URL WITHOUT reloading the page.
 * - Browser back/forward and refresh keep working.
 */
const RouterContext = createContext({ path: "/", navigate: () => {} });

const normalise = (pathname) => {
  const clean = (pathname || "/").replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalise(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalise(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = new URL(to, window.location.origin);
    const next = normalise(url.pathname);
    const full = next + url.search + url.hash;
    if (replace) window.history.replaceState({}, "", full);
    else if (full !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.pushState({}, "", full);
    }
    setPath(next);
    if (url.hash) {
      // let the new page mount, then jump to the section
      requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

/** Internal link: client-side navigation, but still a real <a href> (open in new tab, copy link, SEO). */
export function Link({ to, onClick, children, ...props }) {
  const { navigate } = useRouter();
  const handle = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank") return;
    event.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handle} {...props}>{children}</a>;
}
