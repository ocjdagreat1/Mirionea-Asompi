const GameOverModal = ({ amountWon, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

      <div className="bg-blue-950 p-8 rounded-xl text-center">

        <h2 className="text-4xl text-red-500 font-bold mb-5">
          Game Over
        </h2>

        <p className="text-2xl mb-6">
          You won
        </p>

        <h1 className="text-5xl text-yellow-400 mb-8">
          ₦{amountWon.toLocaleString()}
        </h1>

        <button
          onClick={onRestart}
          className="bg-yellow-400 text-black px-6 py-3 rounded font-bold"
        >
          Play Again
        </button>

      </div>

    </div>
  );
};

export default GameOverModal;