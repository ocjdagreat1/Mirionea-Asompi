const Lifelines = ({
  fiftyUsed,
  audienceUsed,
  phoneUsed,
   onFifty,
   onAudience,
    onPhone,
}) => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">

      <button
      onClick={onFifty}
        disabled={fiftyUsed}
        className="bg-green-600 px-4 py-2 rounded disabled:opacity-50"
      >
        50 : 50
      </button>

      <button
       onClick={onAudience}
        disabled={audienceUsed}
        className="bg-purple-600 px-4 py-2 rounded disabled:opacity-50"
      >
        Audience
      </button>

      <button
      onClick={onPhone}
        disabled={phoneUsed}
        className="bg-orange-600 px-4 py-2 rounded disabled:opacity-50"
      >
        Phone
      </button>

    </div>
  );
};

export default Lifelines;