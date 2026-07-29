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
    <div className="bg-blue-950/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-blue-700">

      {/* Question */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 border border-yellow-500 mb-8">
        <h2 className="text-3xl font-bold text-center text-white">
          {question}
        </h2>
      </div>

      {/* Answers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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