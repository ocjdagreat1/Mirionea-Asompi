import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import soundManager from "../utils/soundManager";

const Timer = ({ question, gameOver, onTimeout }) => {
  const TOTAL_TIME = 30;

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  // Reset timer whenever a new question loads
  useEffect(() => {
    setTimeLeft(TOTAL_TIME);
  }, [question]);

  // Countdown
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      soundManager.stopBackground();
      soundManager.playEffect("/sounds/timeout.mp3");

      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, question, gameOver]);

  // Circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const progress =
    ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * circumference;

  return (
    <div className="flex justify-center mb-8">

      <div className="relative w-40 h-40">

        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl"></div>

        {/* SVG Circle */}
        <svg
          className="w-40 h-40 rotate-[-90deg]"
          viewBox="0 0 140 140"
        >
          {/* Background Circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#1e3a8a"
            strokeWidth="10"
            fill="transparent"
          />

          {/* Progress Circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke={
              timeLeft > 10
                ? "#FFD700"
                : "#EF4444"
            }
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        {/* Timer Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">

          <FaRegClock className="text-yellow-400 text-3xl mb-2" />

          <h2
            className={`text-5xl font-bold ${
              timeLeft <= 10
                ? "text-red-500 animate-pulse"
                : "text-white"
            }`}
          >
            {timeLeft}
          </h2>

          <p className="text-gray-300 text-sm">
            Seconds
          </p>

        </div>

      </div>

    </div>
  );
};

export default Timer;