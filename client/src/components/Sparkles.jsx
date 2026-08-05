import { motion } from "framer-motion";

const sparkles = [
  { top: "8%", left: "18%", size: 14, delay: 0 },
  { top: "18%", left: "82%", size: 10, delay: 0.6 },
  { top: "38%", left: "8%", size: 12, delay: 1.1 },
  { top: "45%", left: "72%", size: 8, delay: 0.3 },
  { top: "70%", left: "20%", size: 10, delay: 1.5 },
  { top: "82%", left: "78%", size: 12, delay: 0.9 },
  { top: "92%", left: "45%", size: 9, delay: 0.4 },
];

const Sparkles = () => {
  return (
    <>
      {sparkles.map((sparkle, index) => (
        <motion.span
          key={index}
          className="absolute text-yellow-50 pointer-events-none"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            fontSize: sparkle.size,
            textShadow: "0 0 8px rgba(255,255,180,.9)",
          }}
          animate={{
            scale: [0.6, 1.3, 0.6],
            opacity: [0.2, 1, 0.2],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: sparkle.delay,
          }}
        >
          ✦
        </motion.span>
      ))}
    </>
  );
};

export default Sparkles;