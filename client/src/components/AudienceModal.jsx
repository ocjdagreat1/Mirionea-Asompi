const AudienceModal = ({ isOpen, poll, onClose }) => {
  if (!isOpen || !poll) return null;

  const letters = ["A", "B", "C", "D"];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-blue-950 w-full max-w-lg rounded-2xl p-8 shadow-2xl border border-yellow-400">

        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          Ask the Audience
        </h2>

        {letters.map((letter, index) => (
          <div key={letter} className="mb-5">

            <div className="flex justify-between text-white mb-2">

              <span className="font-bold">
                {letter}
              </span>

              <span>
                {poll[index]}%
              </span>

            </div>

            <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">

              <div
                className="bg-green-500 h-5 rounded-full transition-all duration-1000"
                style={{
                  width: `${poll[index]}%`,
                }}
              />

            </div>

          </div>
        ))}

        <div className="text-center mt-8">

          <button
            onClick={onClose}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default AudienceModal;