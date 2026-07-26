import prizeLadder from "../utils/prizeLadder";

const PrizeLadder = ({ currentQuestion }) => {
  return (
    <div className="w-72 bg-blue-950/90 backdrop-blur-md border-2 border-yellow-500 rounded-3xl shadow-2xl p-5">

      <h2 className="text-center text-yellow-400 text-2xl font-bold mb-5">
        Prize Ladder
      </h2>

      <div className="space-y-2">

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
                px-4 py-2
                rounded-full
                font-bold
                transition-all duration-300

                ${
                  isCurrent
                    ? "bg-yellow-400 text-black scale-105 shadow-lg shadow-yellow-500/50"
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