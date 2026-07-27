import {
  FaUserFriends,
  FaPhoneAlt,
  FaPercentage,
} from "react-icons/fa";

const LifeLines = ({
  fiftyUsed,
  audienceUsed,
  phoneUsed,
  onFifty,
  onAudience,
  onPhone,
}) => {
  const buttonStyle = (used) =>
    `
      w-24
       h-24
      rounded-full
      relative overflow-hidden
      border-4
      flex
      flex-col
      items-center
      justify-center
      transition-all duration-300 
      shadow-xl shadow-blue-900/70

      ${
        used
          ? "bg-gray-700 border-gray-600 text-gray-400 opacity-50 cursor-not-allowed"
          : " bg-gradient-to-b from-blue-400 via-blue-700 to-blue-950 border-yellow-300 text-yellow-400 hover:shadow-yellow-400/80 hover:shadow-2xl hover:scale-110 active:scale-95 "
      }
    `;


  return (
    <div className="flex items-center gap-5">

 
  <div className="p-1 rounded-full bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 shadow-lg">
      {/* 50 : 50 */}
      <button
        disabled={fiftyUsed}
        onClick={onFifty}
        className={buttonStyle(fiftyUsed)}
      >
        <div className="absolute top-3 left-4 w-12 h-4 bg-white/30 rounded-full blur-md"></div> {/* Shine Effect */}
       <FaPercentage size={32} />
        <span className="text-xs mt-1 font-bold">
          50:50
        </span>
      </button>
</div>

<div className="p-1 rounded-full bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 shadow-lg">
      {/* Audience */}
      <button
        disabled={audienceUsed}
        onClick={onAudience}
        className={buttonStyle(audienceUsed)}
      >
 <div className="absolute top-3 left-4 w-12 h-4 bg-white/30 rounded-full blur-md"></div> {/* Shine Effect */}
        <FaUserFriends size={32} />
        <span className="text-xs mt-1 font-bold">
          Audience
        </span>
      </button>
     </div>
     

{/* Phone */}
<div className="p-1 rounded-full bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 shadow-lg">
      <button
        disabled={phoneUsed}
        onClick={onPhone}
        className={buttonStyle(phoneUsed)}
      >
       <div className="absolute top-3 left-4 w-12 h-4 bg-white/30 rounded-full blur-md"></div> {/* Shine Effect */}
        <FaPhoneAlt size={32} />
        <span className="text-xs mt-1 font-bold">
          Phone
        </span>
      </button>
</div>
    </div>
  );
};

export default LifeLines;