import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-950 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link
          to="/"
          className="flex items-center gap-2 text-yellow-400 text-2xl font-bold"
        >
          <FaTrophy />
          Mirionea-Asọmpi
        </Link>

        <div className="flex gap-8 text-white">

          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <Link
            to="/leaderboard"
            className="hover:text-yellow-400 transition"
          >
            Leaderboard
          </Link>

          <Link
            to="/login"
            className="hover:text-yellow-400 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-yellow-400 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;