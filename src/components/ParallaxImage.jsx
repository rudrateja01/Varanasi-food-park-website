import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** A lightweight scroll-linked image movement; no extra animation library required. */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  strength = 18,
  fetchPriority,
}) {
  const imageRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <motion.img
      ref={imageRef}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      style={
        reduceMotion
          ? undefined
          : { y, scale: 1.08, willChange: "transform" }
      }
    />
  );
}
