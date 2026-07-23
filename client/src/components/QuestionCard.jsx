import AnswerOption from "./AnswerOption";

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  disabled,
}) => {
  return (
    <div className="bg-blue-950 rounded-xl p-8 shadow-lg">

      <h2 className="text-2xl font-bold mb-8 text-center">
        {question}
      </h2>

      <div className="grid gap-4">

        {options.map((option) => (
          <AnswerOption
            key={option}
            option={option}
            selected={selectedAnswer === option}
            onClick={() => onAnswerSelect(option)}
            disabled={disabled}
          />
        ))}

      </div>

    </div>
  );
};

export default QuestionCard;