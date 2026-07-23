import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">

      <div className="max-w-4xl mx-auto bg-blue-950 rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
          Dashboard
        </h1>

        <h2 className="text-2xl mb-8 text-center">
          Welcome, <span className="text-yellow-400">{user?.name}</span> 👋
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-blue-900 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Highest Prize
            </h3>

            <p className="text-3xl text-yellow-400">
              ₦{user?.highestPrize.toLocaleString()}
            </p>
          </div>

          <div className="bg-blue-900 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Games Played
            </h3>

            <p className="text-3xl text-yellow-400">
              {user?.gamesPlayed}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <button
            onClick={() => navigate("/play")}
            className="bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-500"
          >
            ▶ Start Game
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-green-600 py-3 rounded-lg font-bold hover:bg-green-700"
          >
            🏆 Leaderboard
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-purple-600 py-3 rounded-lg font-bold hover:bg-purple-700"
          >
            👤 My Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 py-3 rounded-lg font-bold hover:bg-red-700"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;