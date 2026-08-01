import { useEffect, useState } from "react";
import { FaTrophy, FaMedal, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";
import { getLeaderboard } from "../services/leaderboardService";
import { toast } from "react-toastify";
//import LeaderboardCard from "../components/LeaderboardCard";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaders(data.leaders);
      } catch (error) {
        toast.error("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatMoney = (amount) => `₦${amount.toLocaleString()}`;

  if (loading) {
    return (
     <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_45%,#020617_100%)]">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center"
        >
          <FaTrophy className="mx-auto text-7xl text-yellow-400 mb-5" />
          <h2 className="text-white text-3xl font-bold">
            Loading Leaderboard...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_45%,#020617_100%)] py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center gap-4 mb-10"
        >
          <FaTrophy className="text-yellow-300 text-5xl drop-shadow-[0_0_20px_gold]" />

         <h1 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
            LEADERBOARD
          </h1>
        </motion.div>

        {/* Champion Card */}
        {leaders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: .85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .6 }}
            className="relative overflow-hidden rounded-[2rem] mb-10
bg-gradient-to-br
from-yellow-200
via-yellow-400
to-amber-700
shadow-[0_0_80px_rgba(255,215,0,.55)]
border-[3px] border-yellow-100"
          >

            <div className="absolute right-6 top-6 text-yellow-100 text-6xl opacity-40">
              <FaCrown />
            </div>

            <div className="p-10 text-center">

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
               <FaTrophy className="mx-auto text-7xl text-yellow-50 drop-shadow-[0_0_30px_gold] mb-5" />
              </motion.div>

              <p className="uppercase tracking-[8px] text-slate-900 font-extrabold">
                Champion
              </p>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 drop-shadow-md">
                {leaders[0].name}
              </h2>

             <p className="text-3xl font-extrabold text-white drop-shadow-lg mt-4">
                {formatMoney(leaders[0].highestPrize)}
              </p>

             <p className="mt-3 text-slate-900 font-bold">
                Games Played : {leaders[0].gamesPlayed}
              </p>

            </div>

          </motion.div>
        )}

        {/* Table */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
         className="bg-slate-900/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border-2 border-yellow-400 shadow-[0_0_50px_rgba(59,130,246,.25)]"
        >

          {/* Header */}

          <div className="grid grid-cols-12 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-slate-900 font-extrabold py-5 px-6 text-lg">

            <div className="col-span-2">
              Rank
            </div>

            <div className="col-span-4">
              Player
            </div>

            <div className="col-span-4">
              Highest Prize
            </div>

            <div className="col-span-2 text-center">
              Games
            </div>

          </div>

          {leaders.length === 0 ? (

            <div className="py-16 text-center">

              <FaTrophy className="mx-auto text-6xl text-yellow-400 opacity-50 mb-5" />

              <h2 className="text-white text-3xl font-bold">
                No Champions Yet
              </h2>

              <p className="text-gray-400 mt-3">
                Play your first game to appear here.
              </p>

            </div>

          ) : (

           leaders.map((player, index) => (
  <motion.div
    key={player._id}
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      delay: index * 0.08,
    }}
    whileHover={{
      scale: 1.02,
    }}
    className={`grid grid-cols-12 items-center
      px-3 sm:px-4 md:px-6
      py-4 md:py-5
      border-b transition-all duration-300

      ${
        index===0
?"bg-gradient-to-r from-yellow-300/30 to-yellow-500/15 border-yellow-300"

:index===1
?"bg-gradient-to-r from-slate-300/20 to-slate-500/10 border-slate-400"

:index===2
?"bg-gradient-to-r from-orange-300/20 to-orange-600/10 border-orange-400"

:"border-blue-800 hover:bg-blue-700/30"
      }`}
  >
    {/* Rank */}
    <div className="col-span-2 flex items-center gap-1 sm:gap-2 text-white">

      {index === 0 && (
        <FaMedal className="text-yellow-300 drop-shadow-[0_0_12px_gold] text-lg sm:text-xl md:text-2xl" />
      )}

      {index === 1 && (
        <FaMedal className="text-slate-200 drop-shadow-[0_0_10px_silver] text-lg sm:text-xl md:text-2xl" />
      )}

      {index === 2 && (
        <FaMedal className="text-orange-300 drop-shadow-[0_0_10px_#cd7f32] text-lg sm:text-xl md:text-2xl" />
      )}

      <span className="font-bold text-sm sm:text-base md:text-lg">
        #{index + 1}
      </span>
    </div>

    {/* Player */}
    <div className="col-span-4 text-white font-bold text-sm sm:text-base md:text-lg truncate pr-2">
      {player.name}
    </div>

    {/* Prize */}
    <div className="col-span-4 text-yellow-300 drop-shadow-[0_0_10px_gold] font-extrabold text-xs sm:text-base md:text-lg break-words">
      {formatMoney(player.highestPrize)}
    </div>

    {/* Games */}
    <div className="col-span-2 text-center text-white font-semibold text-sm sm:text-base md:text-lg">
      {player.gamesPlayed}
    </div>
  </motion.div>
))
          )}

        </motion.div>

      </div>

    </div>
  );
};

export default Leaderboard;