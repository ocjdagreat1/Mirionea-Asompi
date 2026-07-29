
import prizeLadder from "../utils/prizeLadder";

const PrizeLadder = ({ currentQuestion }) => {
  return (
    <div className="w-56 md:w-60 bg-blue-950/90 backdrop-blur-md border-2 border-yellow-500 rounded-3xl shadow-2xl p-4">

      <h2 className="text-center text-yellow-400 text-xl font-bold mb-3">
        Prize Ladder
      </h2>

      <div className="space-y-1">

        {[...prizeLadder].reverse().map((amount, index) => {
          const questionNumber = prizeLadder.length - index;

          const isCurrent = questionNumber === currentQuestion;

          const isSafe =
            questionNumber === 5 ||
            questionNumber === 10 ||
            questionNumber === 15;

          return (
            <div
              key={questionNumber}
              className={`
                flex justify-between items-center
                px-3 py-1.5
                text-sm
                rounded-full
                font-bold
               transition-all duration-700 ease-in-out transform

                ${
                 isCurrent
  ? "bg-yellow-400 text-black shadow-2xl shadow-yellow-400/70 scale-105 animate-pulse ring-4 ring-yellow-300"
                    : isSafe
                    ? "bg-orange-500 text-white"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }
              `}
            >
              <span>Q{questionNumber}</span>

              <span>₦{amount.toLocaleString()}</span>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default PrizeLadder;