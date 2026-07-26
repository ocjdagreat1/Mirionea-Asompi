const GameHeader = ({ currentQuestion }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold text-yellow-400">
        Who Wants To Be A Millionaire
      </h1>

      <p className="text-white text-xl mt-4">
        Question {currentQuestion} of 15
      </p>
    </div>
  );
};

export default GameHeader;