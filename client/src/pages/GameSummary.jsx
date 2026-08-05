import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryBanner from "../components/SummaryBanner";
import SummaryStats from "../components/SummaryStats";

const GameSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            No Game Summary Found
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-yellow-400 text-slate-900 px-6 py-3 rounded-xl font-bold"
          >
            Return Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_45%,#020617_100%)] text-white py-10 px-5">

      <div className="max-w-5xl mx-auto">

        {/* Banner */}
            <SummaryBanner
          gameStatus={state.gameStatus}
          amountWon={state.amountWon}
        />


        {/* Statistics */}
         <SummaryStats
          amountWon={state.amountWon}
          correctAnswers={state.correctAnswers}
          wrongAnswers={state.wrongAnswers}
          questionsAnswered={state.questionsAnswered}
          bestStreak={state.bestStreak}
/>
        {/* Achievement */}

        {/* Buttons */}

      </div>

    </div>
  );
};

export default GameSummary;