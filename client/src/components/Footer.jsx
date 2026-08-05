import { FaTrophy, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-yellow-500/30 bg-gradient-to-b from-slate-950 via-[#07142f] to-[#020617]">

      {/* Top Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-8">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: .8 }}
          className="flex justify-center items-center gap-3"
        >
          <FaTrophy className="text-yellow-400 text-2xl drop-shadow-[0_0_12px_gold]" />

          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Mirionea-Asọmpi
          </h2>
        </motion.div>

        {/* Tagline */}
        <p className="mt-3 text-center text-gray-400 text-sm tracking-wide">
          Test your knowledge. Climb the leaderboard. Become the next champion.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400 font-semibold">
              Millionaire Quiz Game
            </span>
            . All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-gray-400 text-sm">
            Built with
            <FaHeart className="text-red-500 animate-pulse" />
            by
            <span className="font-semibold text-yellow-400">
              Opara Chibuike Justine
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;