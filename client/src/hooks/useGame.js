import { useState } from "react";

const useGame = () => {
  const [gameId, setGameId] = useState("");
  const [question, setQuestion] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [currentPrize, setCurrentPrize] = useState(0);
  const [safePrize, setSafePrize] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  return {
    gameId,
    setGameId,

    question,
    setQuestion,

    currentQuestion,
    setCurrentQuestion,

    currentPrize,
    setCurrentPrize,

    safePrize,
    setSafePrize,

    gameOver,
    setGameOver,
  };
};

export default useGame;