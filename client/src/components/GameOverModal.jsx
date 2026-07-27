import { FaTrophy, FaTimesCircle } from "react-icons/fa";

const GameOverModal = ({
  isOpen,
  winner,
  amountWon,
  onClose,
}) => {
  if (!isOpen) return null;

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
          {winner ? (
            <FaTrophy
              size={80}
              className="text-yellow-400"
            />
          ) : (
            <FaTimesCircle
              size={80}
              className="text-red-500"
            />
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4">
          {winner ? "Congratulations!" : "Game Over"}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg mb-6">
          {winner
            ? "You became a Millionaire!"
            : "Better luck next time."}
        </p>

        {/* Prize */}
        <div className="bg-blue-800 rounded-xl p-5 border border-yellow-400 mb-8">
          <p className="text-gray-300 text-sm">
            Total Prize
          </p>

          <h2 className="text-5xl font-bold text-yellow-400">
            ₦{amountWon.toLocaleString()}
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