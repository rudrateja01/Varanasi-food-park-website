
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  motion,
} from "framer-motion";

import {
  Soup,
  Coffee,
  Utensils,
  Heart,
  GlassWater,
  ArrowUpRight,
} from "lucide-react";

import { experiences } from "../data/content.js";
import "../styles/Experiences.css";

const iconMap = {
  soup: Soup,
  coffee: Coffee,
  utensils: Utensils,
  heart: Heart,
  glass: GlassWater,
};

function ExperienceCard({ item, index }) {
  const reduceMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 170,
    damping: 22,
    mass: 0.7,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 170,
    damping: 22,
    mass: 0.7,
  });

  const Icon = iconMap[item.icon] || Utensils;

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    rawRotateY.set((x - 0.5) * 10);
    rawRotateX.set((0.5 - y) * 8);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.article
      className={`immersive-experience-card immersive-experience-card-${index + 1}`}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="immersive-experience-image">
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="immersive-experience-shade" />

      <div className="immersive-experience-top">
        <span className="immersive-experience-number">
          {item.num}
        </span>

        <span className="immersive-experience-icon">
          <Icon size={19} strokeWidth={1.5} />
        </span>
      </div>

      <div className="immersive-experience-content">
        <span className="immersive-experience-category">
          FOOD MOMENT {item.num}
        </span>

        <h3>{item.title}</h3>

        <p>{item.desc}</p>

        {/* <a
          className="immersive-experience-link"
          href="#menu"
          aria-label={`Explore the menu for ${item.title}`}
        >
          <span>EXPLORE MENU</span>
          <ArrowUpRight size={17} />
        </a> */}
      </div>

      <div className="immersive-experience-edge" />
    </motion.article>
  );
}

export default function ImmersiveExperiences() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="immersive-experiences"
      id="experiences"
    >
      <div
        className="immersive-experiences-glow"
        aria-hidden="true"
      />

      <div className="immersive-experiences-inner">
        <motion.div
          className="immersive-experiences-heading"
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="immersive-experiences-kicker">
            <span />
            <span>THE FOOD EXPERIENCES</span>
            <span />
          </div>

          <div className="immersive-experiences-heading-row">
            <div>
              <span className="immersive-experiences-overline">
                SOMETHING FOR EVERY MOMENT
              </span>

              <h2>
                Follow your
                <br />
                <em>cravings.</em>
              </h2>
            </div>

            <p>
              From the first cup of morning tea to a satisfying
              lunch and relaxed evening snacks, discover
              delicious moments throughout the day.
            </p>
          </div>
        </motion.div>

        <div className="immersive-experiences-grid">
          {experiences.map((item, index) => (
            <ExperienceCard
              key={item.num}
              item={item}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="immersive-experiences-bottom"
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
          }}
        >
          <span className="immersive-experiences-bottom-line" />

          <p>
            FIVE WAYS TO MAKE AN ORDINARY DAY FEEL BETTER.
          </p>

          {/* <a href="#menu">
            VIEW OUR MENU
            <ArrowUpRight size={16} />
          </a> */}
        </motion.div>
      </div>
    </section>
  );
}
