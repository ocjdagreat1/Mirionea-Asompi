const AnswerOption = ({ option, selected, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left
        p-4
        rounded-lg
        border-2
        transition-all
        duration-300
        font-semibold

        ${
          selected
            ? "bg-yellow-400 text-black border-yellow-400"
            : "bg-blue-900 border-blue-700 hover:bg-blue-800"
        }

        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      {option}
    </button>
  );
};

export default AnswerOption;