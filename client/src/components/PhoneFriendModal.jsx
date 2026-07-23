const PhoneFriendModal = ({
  isOpen,
  stage,
  answer,
  confidence,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">

      <div className="bg-blue-950 border-2 border-yellow-400 rounded-2xl p-10 w-[500px] text-center shadow-2xl">

        {stage === "calling" && (
          <>
            <div className="text-7xl animate-bounce mb-6">
              📞
            </div>

            <h2 className="text-3xl font-bold text-yellow-400">
              Calling your friend...
            </h2>

            <p className="mt-4 text-gray-300">
              Please wait...
            </p>
          </>
        )}

        {stage === "ringing" && (
          <>
            <div className="text-7xl animate-pulse mb-6">
              ☎️
            </div>

            <h2 className="text-3xl font-bold text-yellow-400">
              Ring... Ring...
            </h2>
          </>
        )}

        {stage === "thinking" && (
          <>
            <div className="text-7xl mb-6 animate-pulse">
              🤔
            </div>

            <h2 className="text-3xl font-bold text-yellow-400">
              Let me think...
            </h2>

            <p className="mt-4 text-gray-300">
              Hmm...
            </p>
          </>
        )}

        {stage === "speaking" && (
          <>
            <div className="text-7xl mb-6">
              👤
            </div>

            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Your Friend Says
            </h2>

            <p className="text-2xl mb-4">
              I think the answer is
            </p>

            <p className="text-6xl font-bold text-green-400 mb-6">
              {answer}
            </p>

            <p className="text-xl mb-8">
              I'm about
              <span className="text-yellow-400 font-bold">
                {" "}
                {confidence}%{" "}
              </span>
              sure.
            </p>

            <button
              onClick={onClose}
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
            >
              Thanks!
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default PhoneFriendModal;