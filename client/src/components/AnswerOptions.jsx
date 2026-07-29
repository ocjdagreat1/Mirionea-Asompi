const AnswerOptions = ({
  option,
  index,
  selected,
  correct,
  showResult,
  locked,
  onClick,
  disabled,
}) => {
  let bgClass =
    "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-yellow-500 text-white hover:scale-105";

  // Correct answer turns GREEN
  if (showResult && correct) {
    bgClass = "bg-green-600 border-green-400 text-white";
  }

  // Wrong selected answer turns RED
  if (showResult && selected && !correct) {
    bgClass = "bg-red-600 border-red-400 text-white";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        overflow-hidden
        border-2
        rounded-full
        px-6
        py-5
        text-left
        font-bold
        transition-all
        duration-500
        ${bgClass}
        ${locked && selected && !showResult ? "answer-locked" : ""}
      `}
    >
      {/* Shine effect */}
      <div className="absolute top-2 left-5 w-16 h-4 bg-white/20 rounded-full blur-md" />

      {/* Answer letter */}
      <span className="text-yellow-400 mr-3">
        {String.fromCharCode(65 + index)}.
      </span>

      {/* Answer text */}
      {option}
    </button>
  );
};

export default AnswerOptions;