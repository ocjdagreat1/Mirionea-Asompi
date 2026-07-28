import { useEffect, useState } from "react";

import { FaTrophy, FaTimesCircle, FaDoorOpen, FaClock } from "react-icons/fa";

const GameOverModal = ({
  isOpen,
  result,
  amountWon,
  onClose,
}) => {
  if (!isOpen) return null;


  
  const isWinner = result === "winner";
  const isQuit = result === "quit";
  const isTimeout = result === "timeout";

  const title = isWinner
    ? "🎉 YOU ARE A MILLIONAIRE!"
    : isQuit
    ? "👏 Smart Decision!"
    : isTimeout
    ? "⏰ Time's Up!"
    : "❌ Wrong Answer!";

  const subtitle = isWinner
    ? "Congratulations! You answered all 15 questions correctly."
    : isQuit
    ? "You chose to walk away with your winnings."
    : isTimeout
    ? "The timer ran out before you answered."
    : "Better luck next time.";



  const [displayAmount, setDisplayAmount] = useState(0);
    useEffect(() => {
  if (!isOpen) return;

  let start = 0;
  const duration = 1500;
  const increment = Math.ceil(amountWon / (duration / 20));

  const timer = setInterval(() => {
    start += increment;

    if (start >= amountWon) {
      start = amountWon;
      clearInterval(timer);
    }

    setDisplayAmount(start);
  }, 20);

  return () => clearInterval(timer);
}, [isOpen, amountWon]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">

      <div
        className="
          w-[500px]
          rounded-3xl
          border-4
          border-yellow-400
          bg-gradient-to-b
          from-blue-950
          via-blue-900
          to-blue-950
          shadow-[0_0_50px_rgba(255,215,0,0.6)]
          p-10
          text-center
          animate-scaleIn
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {isWinner ? (
            <FaTrophy
              size={80}
              className="text-yellow-400"
            />
          ) : isQuit ? (
            <FaDoorOpen
              size={80}
              className="text-green-400"
            />
          ) : isTimeout ? (
            <FaClock
              size={80}
              className="text-orange-400"
            />
          ) : (
            <FaTimesCircle
              size={80}
              className="text-red-500"
            />
          )}
        </div>

        {/* Title */}
        <h1
          className={`text-4xl font-extrabold mb-4 ${
            isWinner
              ? "text-yellow-400"
              : isQuit
              ? "text-green-400"
              : isTimeout
              ? "text-orange-400"
              : "text-red-400"
          }`}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg mb-6">
          {subtitle}
        </p>

        {/* Prize */}
        <div className="bg-blue-800 rounded-xl p-5 border border-yellow-400 mb-8">
          <p className="text-gray-300 text-sm">
            {isWinner ? "Grand Prize" : "Amount Won"}
          </p>

          <h2 className="text-5xl font-bold text-yellow-400 mt-2 animate-pulse">
            ₦{displayAmount.toLocaleString()}
          </h2>
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="
            px-8
            py-3
            rounded-full
            bg-yellow-400
            text-black
            font-bold
            hover:scale-105
            transition
          "
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;