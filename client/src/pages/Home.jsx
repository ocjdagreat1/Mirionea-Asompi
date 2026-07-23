import { Link } from "react-router-dom";
import { FaPlayCircle, FaTrophy } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">

      <h1 className="text-6xl font-extrabold text-yellow-400 text-center">
        Who Wants To Be
      </h1>

      <h2 className="text-7xl font-black text-white mt-3 text-center">
        A Millionaire?
      </h2>

      <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl">
        Test your knowledge across multiple categories,
        answer 15 questions correctly,
        and win the grand prize of
        <span className="text-yellow-400 font-bold">
          {" "}₦10,000,000
        </span>.
      </p>

      <div className="flex gap-6 mt-10">

        <Link
          to="/play"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 transition"
        >
          <FaPlayCircle />
          Play Now
        </Link>

        <Link
          to="/leaderboard"
          className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 transition"
        >
          <FaTrophy />
          Leaderboard
        </Link>

      </div>

    </div>
  );
};

export default Home;