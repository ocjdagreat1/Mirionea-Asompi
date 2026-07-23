import prizeLadder from "../utils/prizeLadder";

const PrizeLadder = ({ currentQuestion }) => {
  return (
    <div className="bg-blue-950 rounded-xl p-6">

      <h2 className="text-center text-yellow-400 text-2xl font-bold mb-5">
        Prize Ladder
      </h2>

      <div className="space-y-2">

        {[...prizeLadder].reverse().map((amount, index) => {
          const questionNumber = prizeLadder.length - index;

          return (
            <div
              key={amount}
              className={`
                p-2
                rounded
                text-center
                font-bold

                ${
                  questionNumber === currentQuestion
                    ? "bg-yellow-400 text-black"
                    : "bg-blue-900"
                }
              `}
            >
              Question {questionNumber}

              <span className="float-right">
                ₦{amount.toLocaleString()}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default PrizeLadder;