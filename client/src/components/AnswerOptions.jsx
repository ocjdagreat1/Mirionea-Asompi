const AnswerOption = ({
  option,
  index,
  selected,
  onClick,
  disabled,
}) => {
  const letters = ["A", "B", "C", "D"];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        flex
        items-center
        gap-4
        px-6
        py-5
        rounded-full
        border-2
        transition-all
        duration-300
        shadow-lg

        ${
          selected
            ? "bg-yellow-400 text-black border-yellow-400 scale-105"
            : "bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border-yellow-500 hover:scale-105 hover:shadow-yellow-500/40"
        }

        ${disabled ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {/* Letter Circle */}
      <div
        className={`
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          font-bold

          ${
            selected
              ? "bg-black text-yellow-400"
              : "bg-yellow-400 text-black"
          }
        `}
      >
        {letters[index]}
      </div>

      {/* Option Text */}
      <span className="text-lg font-semibold">
        {option}
      </span>
    </button>
  );
};

export default AnswerOption;