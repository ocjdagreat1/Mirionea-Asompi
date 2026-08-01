import { FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";

const LeaderboardCard = ({ player, index }) => {
  const formatMoney = (amount) => `₦${amount.toLocaleString()}`;

  const medalColor =
    index === 0
      ? "text-yellow-400"
      : index === 1
      ? "text-gray-300"
      : index === 2
      ? "text-orange-500"
      : "text-white";

  const initials = player.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border p-5 mb-4
      ${
        index === 0
          ? "border-yellow-400 bg-yellow-500/10"
          : index === 1
          ? "border-gray-300 bg-gray-500/10"
          : index === 2
          ? "border-orange-400 bg-orange-500/10"
          : "border-blue-700 bg-blue-900/40"
      }`}
    >
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-blue-950 font-bold text-lg">
          {initials}
        </div>

        <div className="flex-1">

          <div className="flex items-center gap-2">
            <FaMedal className={`${medalColor} text-xl`} />

            <span className="font-bold text-white">
              #{index + 1}
            </span>
          </div>

          <h2 className="text-white text-lg font-bold mt-1 break-words">
            {player.name}
          </h2>

          <p className="text-yellow-400 font-bold mt-1">
            {formatMoney(player.highestPrize)}
          </p>

          <p className="text-gray-300 text-sm mt-1">
            Games Played: {player.gamesPlayed}
          </p>

        </div>

      </div>
    </motion.div>
  );
};

export default LeaderboardCard;