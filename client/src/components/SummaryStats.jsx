import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaBullseye,
  FaFire,
  FaQuestionCircle,
} from "react-icons/fa";

const SummaryStats = ({
  amountWon,
  correctAnswers,
  wrongAnswers,
  questionsAnswered,
  bestStreak,
}) => {
  const accuracy =
    questionsAnswered > 0
      ? Math.round((correctAnswers / questionsAnswered) * 100)
      : 0;

  const stats = [
    {
      title: "Prize Won",
      value: `₦${amountWon.toLocaleString()}`,
      icon: <FaMoneyBillWave />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Correct",
      value: correctAnswers,
      icon: <FaCheckCircle />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Wrong",
      value: wrongAnswers,
      icon: <FaTimesCircle />,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Accuracy",
      value: `${accuracy}%`,
      icon: <FaBullseye />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Best Streak",
      value: bestStreak,
      icon: <FaFire />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Questions",
      value: questionsAnswered,
      icon: <FaQuestionCircle />,
      color: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-center shadow-xl`}
        >
          <div className="text-3xl mb-3 flex justify-center">
            {stat.icon}
          </div>

          <h3 className="text-sm uppercase tracking-wider opacity-80">
            {stat.title}
          </h3>

          <p className="text-3xl font-black mt-2">
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryStats;