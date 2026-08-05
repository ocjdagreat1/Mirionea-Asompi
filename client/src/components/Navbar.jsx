import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTrophy, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { FaChevronDown, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full font-medium transition-all duration-300 ${
      isActive
        ? "bg-yellow-400/15 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,.35)]"
        : "text-white hover:bg-yellow-400/10 hover:text-yellow-400 hover:shadow-[0_0_12px_rgba(250,204,21,.25)]"
    }`;

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-yellow-500/30
        bg-gradient-to-b
        from-slate-950
        via-[#07142f]
        to-[#020617]
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,.45)]
      "
    >
      {/* Gold Divider */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-5 lg:px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group flex-shrink-0"
        >
          <FaTrophy
            className="
              text-3xl text-yellow-400
              drop-shadow-[0_0_12px_gold]
              transition-all duration-300
              group-hover:rotate-12
              group-hover:scale-110
            "
          />

          <span
            className="
              text-xl sm:text-2xl font-black
              bg-gradient-to-r
              from-yellow-200
              via-yellow-400
              to-amber-500
              bg-clip-text
              text-transparent
            "
          >
            Mirionea-Asọmpi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/leaderboard" className={navLinkClass}>
            Leaderboard
          </NavLink>

          {user ? (
            <>
              <NavLink to="/play" className={navLinkClass}>
                Play
              </NavLink>

              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

    
              {/* Profile Dropdown */}
<div
  ref={dropdownRef}
  className="relative ml-3"
>

  <button
  onClick={() => setProfileOpen(!profileOpen)}
  className="
    flex
    items-center
    gap-2
    px-4
    py-2
    rounded-full
    text-yellow-300
    font-semibold
    hover:bg-yellow-400/10
    transition
  "
>
  <FaUserCircle className="text-xl" />

  <span>Profile</span>

  <FaChevronDown
    className={`transition-transform duration-300 ${
      profileOpen ? "rotate-180" : ""
    }`}
  />
</button>
  {profileOpen && (
    <div
      className="
        absolute
        right-0
        mt-3
        w-72
        rounded-2xl
        overflow-hidden
        bg-slate-900
        border
        border-yellow-400/20
        shadow-[0_15px_40px_rgba(0,0,0,.55)]
        z-50
      "
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-700">
        <h3 className="uppercase text-xs tracking-[4px] text-yellow-300">
          Account
        </h3>
      </div>

      {/* User */}
      <div className="flex items-center gap-4 px-5 py-5">

        <div
          className="
            w-14 h-14
            rounded-full
            bg-gradient-to-br
            from-yellow-300
            to-amber-500
            flex
            items-center
            justify-center
            text-xl
            font-bold
            text-slate-900
          "
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-bold text-white">
            {user?.name}
          </p>

          <p className="text-gray-400 text-sm">
            Welcome back!
          </p>
        </div>

      </div>

      {/* Account */}
      <Link
        to="/profile"
        onClick={() => {
          setProfileOpen(false);
          setMenuOpen(false);
        }}
        className="
          flex
          items-center
          gap-3
          px-5
          py-4
          text-white
          hover:bg-slate-800
          transition
        "
      >
        <FaUserCircle className="text-yellow-300" />

        My Account
      </Link>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-4
          text-red-400
          hover:bg-red-500/10
          transition
        "
      >
        <FaSignOutAlt />

        Logout
      </button>
    </div>
  )}

</div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-yellow-400 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-5 pb-5 gap-2">

          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Leaderboard
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/play"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Play
              </NavLink>

              <NavLink
                to="/dashboard"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
<div className="border-t border-yellow-400/20 mt-3 pt-3">

  <div className="flex items-center gap-3 px-2 mb-4">

    <div
      className="
        w-12 h-12
        rounded-full
        bg-gradient-to-br
        from-yellow-300
        to-amber-500
        flex
        items-center
        justify-center
        font-bold
        text-slate-900
      "
    >
      {user?.name?.charAt(0).toUpperCase()}
    </div>

    <div>
      <p className="text-yellow-300 font-bold">
        {user?.name}
      </p>

      <p className="text-gray-400 text-sm">
        Player
      </p>
    </div>

  </div>

  <NavLink
    to="/profile"
    className={navLinkClass}
    onClick={() => setMenuOpen(false)}
  >
    My Account
  </NavLink>

  <button
    onClick={handleLogout}
    className="
      w-full
      text-left
      mt-2
      px-4
      py-2
      rounded-full
      bg-red-500/10
      text-red-400
      hover:bg-red-500/20
      transition
    "
  >
    Logout
  </button>

</div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;