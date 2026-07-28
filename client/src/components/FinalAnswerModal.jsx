const FinalAnswerModal = ({
   isOpen,
  answer,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-blue-950 border-2 border-yellow-400 rounded-2xl p-8 text-center">
<h1 className="text-3xl text-yellow-400 font-bold">
  Final Answer?
</h1>

<p className="mt-4 text-xl text-white">
  Is{" "}
  <span className="text-yellow-400 font-bold">
    "{answer}"
  </span>{" "}
  your final answer?
</p>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={onCancel}
            className="bg-gray-600 px-6 py-2 rounded"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="bg-yellow-500 text-black px-6 py-2 rounded font-bold"
          >
            Yes
          </button>
        </div>

      </div>
    </div>
  );
};

export default FinalAnswerModal;