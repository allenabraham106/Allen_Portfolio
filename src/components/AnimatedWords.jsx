import { motion } from "framer-motion";

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Splits text into words and staggers each one in with a blur-to-clear reveal.
 *
 * Props:
 *   text       – the string to animate
 *   el         – wrapper element tag (default "span")
 *   className  – applied to the wrapper
 *   stagger    – seconds between each word (default 0.07)
 *   delay      – seconds before first word starts (default 0)
 *   once       – only animate once (default true)
 */
export function AnimatedWords({
  text,
  el: El = "span",
  className,
  stagger = 0.07,
  delay = 0,
  once = true,
}) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
