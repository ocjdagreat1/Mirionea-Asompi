import './App.css'
import { Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PlayGame from "./pages/PlayGame";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
<>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
<Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

      <Route
    path="/play"
    element={
      <ProtectedRoute>
        <PlayGame />
      </ProtectedRoute>
    }
  />



      <Route path="/leaderboard" element={<Leaderboard />} />

      <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />

      <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    }
  />

      <Route path="*" element={<NotFound />} />
    </Routes>
<Footer />
    </>
  );
}

export default App;
