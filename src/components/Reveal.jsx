import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../utils/motion.js";

export default function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  const variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : fadeUp;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.16 }}
      transition={reduce ? { duration: 0 } : { delay }}
      style={{ transformPerspective: 1100, transformOrigin: "center bottom" }}
    >
      {children}
    </motion.div>
  );
}
