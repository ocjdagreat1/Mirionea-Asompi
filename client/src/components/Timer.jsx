import { useEffect, useState } from "react";

const Timer = ({ seconds, onTimeUp }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  return (
    <div className="text-center text-4xl font-bold text-yellow-400">
      {time}s
    </div>
  );
};

export default Timer;