import AnswerOptions from "./AnswerOptions";

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  disabled,
 remainingIndexes,
  correctAnswer,
  showResult,
  answerLocked,
}) => {
  return (
    <div className="bg-blue-950/90 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-xl border-2 border-blue-700">

      {/* Question */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-4 mb-5 border border-yellow-500 ">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white">
          {question}
        </h2>
      </div>

      {/* Answers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-2">

        {options.map((option, index) => {

          // Hide removed answers after 50:50
          if (
            remainingIndexes &&
            !remainingIndexes.includes(index)
          ) {
            return null;
          }

          return (
  <AnswerOptions
  key={index}
  option={option}
  index={index}
  selected={selectedAnswer === index}
  correct={correctAnswer === index}
  showResult={showResult}
  locked={answerLocked}
  onClick={() => onAnswerSelect(index)}
  disabled={disabled}
/>
          );
        })}

      </div>

    </div>
  );
};

export default QuestionCard;