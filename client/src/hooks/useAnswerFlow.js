import { useState } from "react";

const useAnswerFlow = () => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [correctAnswer, setCorrectAnswer] = useState(null);

    const [showResult, setShowResult] = useState(false);

    const [showFinalAnswer, setShowFinalAnswer] = useState(false);

    const [pendingAnswer, setPendingAnswer] = useState(null);

    const [answerLocked, setAnswerLocked] = useState(false);


    
//Handle answer
 const handleAnswer = (index) => {
  if (selectedAnswer !== null || showFinalAnswer) return;

  setPendingAnswer(index);
  setSelectedAnswer(index); // Highlight the selected option
  setShowFinalAnswer(true);
};

const cancelFinalAnswer = () => {
  setShowFinalAnswer(false);
  setPendingAnswer(null);
  setSelectedAnswer(null);
};


//confirm answer
const beginAnswerConfirmation = async (
  gameId,
  submitAnswer,
  soundManager
) => {
  setShowFinalAnswer(false);
  setAnswerLocked(true);

  soundManager.playBackground("/sounds/thinking.mp3");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return await submitAnswer(gameId, pendingAnswer);
};


//function to handle wrong answer
const handleWrongAnswer = (
  data,
  {
    wrong,
    soundManager,
    showStatus,
    gameOverTimer,
    setCurrentPrize,
    safePrize,
    setGameResult,
    setGameOver,
  }
) => {
  if (data.success) return false;

  wrong();

  soundManager.stopAll();
  soundManager.playEffect("/sounds/wrong.mp3");

  showStatus("✖ Wrong Answer!", "error");

  gameOverTimer.current = setTimeout(() => {
    soundManager.playEffect("/sounds/gameover.mp3");

    setCurrentPrize(safePrize);
    setGameResult("wrong");
    setGameOver(true);
  }, 1500);

  return true;
};

//function to handle winner of the game
const handleWinner = (
  data,
  {
    soundManager,
    toast,
    setCurrentPrize,
    setSafePrize,
    setGameResult,
    setGameOver,
  }
) => {
  if (!data.winner) return false;

  soundManager.stopBackground();

  soundManager.playEffect("/sounds/win.mp3");

  toast.success("🎉 Congratulations! You won the game!");

  setCurrentPrize(10000000);
  setSafePrize(10000000);

  setGameResult("winner");
  setGameOver(true);

  return true;
};

//function to handle  correct answer
const handleCorrectAnswer = (
  data,
  {
    soundManager,
    correct,
    showStatus,
    fadeOut,
    fadeIn,
    currentQuestion,
    setQuestion,
    setCurrentQuestion,
    setCurrentPrize,
    getSafePrize,
    setSafePrize,
    setRemainingIndexes,
    normal,
  }
) => {
  soundManager.stopAll();

  correct();

  soundManager.playEffect("/sounds/correct.mp3");

  showStatus("✔ Correct Answer!", "success");

  setTimeout(() => {
    fadeOut();

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;

      setQuestion(data.nextQuestion);

      setCurrentQuestion(nextQuestion);

      setCurrentPrize(data.amountWon);

      const newSafePrize = getSafePrize(currentQuestion);

      setSafePrize(newSafePrize);

      setCorrectAnswer(null);
      setShowResult(false);
      setSelectedAnswer(null);
      setPendingAnswer(null);

      setRemainingIndexes(null);

      setAnswerLocked(false);

      normal();

      fadeIn();

      soundManager.playBackground("/sounds/thinking.mp3");

    }, 700);

  }, 2500);
};

    return {selectedAnswer,setSelectedAnswer,
        correctAnswer,setCorrectAnswer,
        showResult,setShowResult,
        showFinalAnswer,setShowFinalAnswer,
        pendingAnswer,setPendingAnswer,
        answerLocked,setAnswerLocked,
        handleAnswer,
        cancelFinalAnswer,
        beginAnswerConfirmation,
        handleWrongAnswer,handleCorrectAnswer,
        handleWinner,

    };

};

export default useAnswerFlow;