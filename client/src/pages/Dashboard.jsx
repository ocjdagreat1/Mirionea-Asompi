import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Sparkles from "../components/Sparkles";
import {getRank,getAchievements,getRankProgress,} from "../utils/rankSystem";
import {FaTrophy,FaPlay,FaUser,FaGift,FaFire,FaGamepad,FaChartLine, FaMedal,FaBullseye,} from "react-icons/fa";



const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const highestPrize = user?.highestPrize || 0;

  //sucess rate
  const successRate =
  user?.questionsAnswered > 0
    ? Math.round(
        (user.correctAnswers / user.questionsAnswered) * 100
      )
    : 0;

    //win rate
    const winRate =
  user?.gamesPlayed > 0
    ? Math.round((user.gamesWon / user.gamesPlayed) * 100)
    : 0;

const rank = getRank(highestPrize);
const progress = getRankProgress(highestPrize);
const achievements = getAchievements(highestPrize);
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_45%,#020617_100%)]">
        <motion.h2
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-3xl font-bold text-yellow-400"
        >
          Loading Dashboard...
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_45%,#020617_100%)] py-12 px-6">

      {/* Background Glow */}

      <div className="absolute w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl -top-20 -left-20" />
      <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-3xl bottom-0 right-0" />

      {/* Floating Particles */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-300"
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

     <div className="relative max-w-4xl mx-auto">

        {/* Trophy */}

        <div className="flex justify-center mb-10">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -4, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="relative"
          >
            <Sparkles />

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_45px_rgba(250,204,21,.55)]">
              <FaTrophy className="text-4xl text-slate-900" />
            </div>
          </motion.div>
        </div>

        {/* Welcome */}

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="
  relative
  overflow-hidden
  border
  border-yellow-400/20
  bg-slate-900/60
  backdrop-blur-xl
  p-5
  mb-6
  rounded-2xl
"
>
  <div className="absolute top-0 right-0 w-60 h-60 bg-yellow-400/10 blur-3xl rounded-full" />

  <h1 className="text-3xl md:text-4xl font-black">
    Welcome back,
    <span className="text-yellow-400">
      {" "}
      {user?.name}
    </span>
    👋
  </h1>

  <p className="text-gray-400 mt-4 text-base">
    Every question brings you closer to becoming the next Millionaire Champion.
  </p>
</motion.div>

        {/* Rank */}

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-6 mb-8"
        >
          <h3 className="text-yellow-400 text-lg font-semibold">
            Current Rank
          </h3>

         <h2 className={`text-3xl font-bold ${rank.color}`}>
   {rank.title}
</h2>

          <p className="text-gray-400 mt-2">
            Play more games to unlock Expert and Legend ranks.
          </p>
        </motion.div>


        {/* Stats */}
<div className="grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-3
xl:grid-cols-3
gap-4 mb-10">

  {[
    {
      title: "Highest Prize",
      value: `₦${user?.highestPrize?.toLocaleString() || 0}`,
      icon: <FaTrophy />,
      description: "Your biggest win",
      color: "from-yellow-400 to-orange-500",
    },

    {
      title: "Games Played",
      value: user?.gamesPlayed || 0,
      icon: <FaGamepad />,
      description: "Challenges completed",
      color: "from-blue-500 to-indigo-600",
    },

    {
  title: "Games Won",
  value: user?.gamesWon || 0,
  icon: < FaMedal />,
  description: "Victories earned",
  color: "from-emerald-500 to-teal-600",
},

{
  title: "Win Rate",
  value: ` ${winRate}%`,
  icon: <FaChartLine />,
  description: "Victory percentage",
  color: "from-cyan-500 to-blue-600",
},

    {
      title: "Best Streak",
     value: `🔥 ${user?.bestStreak || 0}`,
      icon: <FaFire />,
      description: "Winning streak",
      color: "from-red-500 to-pink-600",
    },

    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: <FaBullseye />,
      description: "Answer accuracy",
      color: "from-green-500 to-emerald-600",
    },

  ].map((card,index) => (

    <motion.div
      key={card.title}

      initial={{
        opacity:0,
        y:30
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        delay:index * 0.15
      }}

      whileHover={{
        scale:1.05,
        y:-8
      }}

      className={`
relative
overflow-hidden
rounded-2xl
bg-gradient-to-br
${card.color}
shadow-xl
text-white
p-4
min-h-[180px]
flex
items-center
justify-center
`}
    >

      {/* Glow */}

      <div className="
        absolute
        -top-10
        -right-10
        w-32
        h-32
        bg-white/20
        rounded-full
        blur-3xl
      "/>


      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">

        <div className="
          mb-4
          bg-white/20
          text-2xl
          w-10
          h-10
          rounded-2xl
          flex
          items-center
          justify-center
        ">
          {card.icon}
        </div>


        <h3  className="
    text-xs
    uppercase
    tracking-wide
    opacity-90
    text-center
    min-h-[32px]
    flex
    items-center
  ">
          {card.title}
        </h3>


        <p className="text-3xl font-black mt-2 text-center">
          {card.value}
        </p>


        <p className="
         text-xs
          mt-2
          opacity-80
        ">
          {card.description}
        </p>


      </div>


    </motion.div>

  ))}

</div>

{/* Achievement Badges */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    bg-slate-900/60
    backdrop-blur-xl
    border
    border-yellow-400/20
    rounded-3xl
    p-6
    mb-10
  "
>

  <h2 className="
    text-2xl
    font-bold
    text-yellow-400
    mb-5
  ">
    🏅 Achievements
  </h2>


  <div className="
    grid
    md:grid-cols-5
    gap-4
  ">


  {achievements.map((badge) => (
    
    <motion.div

      key={badge.title}

      whileHover={{
        scale:1.08,
        y:-5
      }}

      className={`
        rounded-2xl
        p-5
        text-center
        border
        transition-all

        ${
          badge.unlocked
          ?
          "bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,.25)]"
          :
          "bg-slate-800/50 border-gray-700 opacity-40 grayscale"
        }
      `}
    >

      <div className="text-3xl mb-3">
        {badge.icon}
      </div>


      <h3
        className={`
          font-bold
          text-sm
          ${
            badge.unlocked
            ?
            "text-yellow-400"
            :
            "text-gray-400"
          }
        `}
      >
        {badge.title}
      </h3>


      <p className="text-xs mt-2">
        {
          badge.unlocked
          ?
          "Unlocked ⭐"
          :
          "Locked 🔒"
        }
      </p>


    </motion.div>

  ))}


  </div>


  <div className="
    mt-6
    text-center
    text-gray-400
  ">
    Current Rank:

    <span className={`
      ml-2
      font-bold
      ${rank.color}
    `}>
      {rank.title}
    </span>

  </div>


</motion.div>

        {/* Progress */}

        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-yellow-400/20 p-4 mb-10">

          <div className="flex justify-between mb-3">

            <span className="font-semibold">
              Contestant
            </span>

            <span className="font-semibold">
              Millionaire
            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-700 overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%`}}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-yellow-300 to-amber-500"
            />

          </div>

          <p className="text-center text-gray-400 mt-4">
            Your journey has just begun.
          </p>

        </div>

        {/* Buttons */}

     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          {[
            {
              text: "Start Game",
              icon: <FaPlay />,
              color:
                "from-yellow-300 via-yellow-400 to-amber-500 text-slate-900",
              click: () => navigate("/play"),
            },
            {
              text: "Leaderboard",
              icon: <FaTrophy />,
              color: "from-green-500 to-green-600 text-white",
              click: () => navigate("/leaderboard"),
            },
            {
              text: "My Profile",
              icon: <FaUser />,
              color: "from-purple-500 to-fuchsia-600 text-white",
              click: () => navigate("/profile"),
            },
            {
              text: "Daily Reward",
              icon: <FaGift />,
              color: "from-pink-500 to-rose-600 text-white",
              click: () =>
                toast.info("🎁 Daily Rewards coming soon!"),
            },
          ].map((btn) => (
            <motion.button
              key={btn.text}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 0 35px rgba(250,204,21,.35)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={btn.click}
              className={`
  bg-gradient-to-r
  ${btn.color}
  h-14
  rounded-xl
  font-semibold
  text-base
  flex
  items-center
  justify-center
  gap-2
  shadow-lg
  transition-all
`}
              >
              {btn.icon}
              {btn.text}
            </motion.button>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;