import { motion } from "framer-motion";
import { FaTrophy, FaMoneyBillWave, FaTimesCircle } from "react-icons/fa";

const SummaryBanner = ({ gameStatus, amountWon }) => {
  let title = "";
  let subtitle = "";
  let icon = null;
  let gradient = "";

  switch (gameStatus) {
    case "winner":
      title = "Congratulations!";
      subtitle = "You became a Millionaire!";
      icon = <FaTrophy className="text-5xl" />;
      gradient = "from-yellow-400 via-amber-400 to-orange-500";
      break;

    case "walked":
      title = "You Walked Away";
      subtitle = `You secured ₦${amountWon.toLocaleString()}`;
      icon = <FaMoneyBillWave className="text-5xl" />;
      gradient = "from-blue-500 via-cyan-500 to-indigo-600";
      break;

    default:
      title = "Game Over";
      subtitle = `You won ₦${amountWon.toLocaleString()}`;
      icon = <FaTimesCircle className="text-5xl" />;
      gradient = "from-red-500 via-pink-500 to-rose-600";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl p-8 bg-gradient-to-r ${gradient} text-center shadow-2xl`}
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>

      <h1 className="text-4xl font-black mb-2">
        {title}
      </h1>

      <p className="text-lg opacity-90">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SummaryBanner;