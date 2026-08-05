import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {EnvelopeIcon,LockClosedIcon,EyeIcon,EyeSlashIcon,} from "@heroicons/react/24/outline";

import { FcGoogle } from "react-icons/fc";
import { FaApple, FaTrophy } from "react-icons/fa";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Sparkles from "../components/Sparkles";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({email: "",password: "",});

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

     await login(data.token);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<div
className="
relative
min-h-screen
overflow-hidden
bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_45%,#020617_100%)]
flex
items-center
justify-center
px-5
py-16
"
>

{/* Glow */}
<div className="absolute w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl -top-20 -left-20" />

<div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-3xl bottom-0 right-0" />


<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(18)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-yellow-300"
      style={{
        width: `${4 + Math.random() * 6}px`,
        height: `${4 + Math.random() * 6}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        filter: "blur(1px)",
      }}
      animate={{
        y: [0, -25, 0],
        opacity: [0.2, 1, 0.2],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 3,
      }}
    />
  ))}
</div>

{/* Login Card */}

<motion.div
whileHover={{
    scale: 1.01
}}
  initial={{
    opacity: 0,
    y: 40,
    scale: 0.95,
  }}
  animate={{
    opacity: 1,
    y: [0, -5, 0],
    scale: 1,
  }}
  transition={{
    opacity: { duration: 0.6 },
    scale: { duration: 0.6 },
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
className="
relative
w-full
max-w-md
rounded-[2rem]
border
border-yellow-400/20
bg-slate-900/75
backdrop-blur-xl
shadow-[0_0_60px_rgba(0,0,0,.45)]
overflow-hidden
"
>

<div className="absolute inset-0 bg-gradient-to-br from-yellow-300/5 via-transparent to-blue-400/5" />

<div className="relative p-8">

{/* Trophy */}

<div className="flex justify-center mb-5">

  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, -4, 4, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative"
  >

    {/* Glow */}

    <motion.div
      className="
        absolute
        inset-0
        rounded-full
        bg-yellow-300/25
        blur-2xl
      "
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />

    <div className="relative">

      <Sparkles />

      

      <div
        className="
          w-24
          h-24
          rounded-full
          bg-gradient-to-br
          from-yellow-200
          via-yellow-400
          to-amber-500
          flex
          items-center
          justify-center
          shadow-[0_0_40px_rgba(250,204,21,.55)]
        "
      >
        <FaTrophy className="text-5xl text-slate-900" />
      </div>

    </div>

  </motion.div>

</div>

<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: .15 }}
  className="
    text-4xl 
    md:text-5xl
    font-black
    text-center
    bg-gradient-to-r
    from-yellow-200
    via-yellow-400
    to-amber-500
    bg-clip-text
    text-transparent
  "
>
  Welcome Back
</motion.h1>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: .3 }}
  className="
    mt-3
    text-center
    text-gray-400
    leading-7
  "
>
  Sign in to continue your journey toward becoming the
  <span className="text-yellow-400 font-semibold">
    {" "}Ultimate Millionaire Champion
  </span>
</motion.p>


<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: .5 }}
 className="flex justify-center mt-3 mb-4"
>
  <div className="px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-sm tracking-wide">
    🏆 Play • Win • Become a Millionaire
  </div>
</motion.div>

  <form
onSubmit={handleSubmit}
className="space-y-5 mt-4"
>

{/* Email */}

<div className="relative">

<EnvelopeIcon
className="
absolute
left-4
top-1/2
-translate-y-1/2
w-5
h-5
text-yellow-400
"
/>

<input
type="email"
name="email"
value={formData.email}
onChange={handleChange}
placeholder="Email Address"
required
className="
w-full
pl-12
pr-4
py-4
rounded-xl
bg-slate-800/60
backdrop-blur-md
border
border-slate-700
text-white
placeholder:text-gray-500
focus:outline-none
focus:border-yellow-400
focus:ring-2
focus:ring-yellow-400/20
transition-all
duration-300
"
/>

</div>
{/* Password */}

<div className="relative">

  <LockClosedIcon
    className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      w-5
      h-5
      text-yellow-400
    "
  />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Password"
    required
    className="
      w-full
      pl-12
      pr-12
      py-4
      rounded-xl
      bg-slate-800/70
      backdrop-blur-md
      border
      border-slate-700
      text-white
      placeholder-gray-500
      focus:outline-none
      focus:border-yellow-400
      transition
      focus:ring-2
      focus:ring-yellow-400/20
      transition-all
      duration-300
    "
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-400
      hover:text-yellow-400
      transition
    "
  >
    {showPassword ? (
      <EyeSlashIcon className="w-5 h-5" />
    ) : (
      <EyeIcon className="w-5 h-5" />
    )}
  </button>

</div>

{/* Forgot Password */}

<div className="flex justify-end">

  <button
    type="button"
    className="
      text-sm
      text-yellow-400
      hover:text-yellow-300
      transition
    "
    onClick={() =>
      toast.info("Forgot Password coming soon!")
    }
  >
    Forgot Password?
  </button>

</div>

{/* Login Button */}

<motion.button
 whileHover={{
    scale: 1.03,
    y: -2,
    boxShadow: "0 0 40px rgba(250,204,21,.55)",
}}
  whileTap={{
    scale: .97
  }}
  disabled={loading}
  className="
    w-full
    py-4
    rounded-xl
    font-bold
    text-lg
    tracking-wide
    text-slate-900
    bg-gradient-to-r
    from-yellow-300
    via-yellow-400
    to-amber-500
    hover:shadow-[0_0_25px_rgba(250,204,21,.5)]
    transition
  "
>
  {loading ? "Logging in..." : "🎮 Login to Play"}
</motion.button>

{/* Divider */}

<div className="flex items-center my-7">

  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700"></div>

  <span className="px-4 text-sm text-gray-400 uppercase tracking-widest">
    or continue with
  </span>

  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700"></div>

</div>

{/* Google */}

<motion.button
whileHover={{
    scale:1.02
}}
whileTap={{
    scale:.98
}}
  type="button"
  onClick={() => toast.info("Google Login coming soon")}
  className="
    w-full
    flex
    items-center
    justify-center
    gap-3
    py-3.5
    rounded-xl
    bg-white
    hover:bg-gray-100
    shadow-lg
    text-gray-800
    font-semibold
    hover:scale-[1.02]
    transition
    mb-3
  "
>

  <FcGoogle className="text-2xl" />

  Continue with Google →

</motion.button>

{/* Apple */}

<motion.button
whileHover={{
    scale:1.02
}}
whileTap={{
    scale:.98
}}
  type="button"
  onClick={() => toast.info("Apple Login coming soon")}
  className="
    w-full
    flex
    items-center
    justify-center
    gap-3
    py-3.5
    rounded-xl
    bg-gradient-to-r
    from-slate-950
    to-black
    border
    border-slate-700
    shadow-lg
    text-white
    font-semibold
    hover:scale-[1.02]
    transition
  "
>

  <FaApple className="text-2xl" />

  Continue with Apple →

</motion.button>

{/* Register */}

<p className="text-center mt-8 text-gray-400 text-sm">

  Don't have an account?

  <Link
    to="/register"
    className="
ml-2
font-bold
text-yellow-400
hover:text-yellow-300
underline
underline-offset-4
transition
"
  >
    Register
  </Link>

</p>

</form>

</div>

</motion.div>

</div>

)
};

export default Login;