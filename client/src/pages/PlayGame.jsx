import  { useEffect, useState, useRef }  from "react";
import { toast } from "react-toastify";
import { startGame, submitAnswer, walkAway, useFiftyFifty, askAudience,phoneFriend,} from "../services/gameService";
import Lifelines from "../components/LifeLines";
import { useNavigate } from "react-router-dom";
import AudienceModal from "../components/AudienceModal";
import PhoneFriendModal from "../components/PhoneFriendModal";
import soundManager from "../utils/soundManager";
import Timer from "../components/Timer";
import bgImage from "../assets/images/bg.jpg";
import PrizeLadder from "../components/PrizeLadder";
import QuestionCard from "../components/QuestionCard";
import GameOverModal from "../components/GameOverModal";
import { getSafePrize } from "../utils/safePrize";
import WalkAwayModal from "../components/WalkAwayModal";
import FinalAnswerModal from "../components/FinalAnswerModal";
import SpotlightBackground from "../components/SpotlightBackground";
import "../styles/spotlight.css";
import useTransitions from "../hooks/useTransitions";
import useStageEffects from "../hooks/useStageEffects"
import useGame from "../hooks/useGame";
import useStatusMessage from "../hooks/useStatusMessage"
import useLifelines from "../hooks/useLifelines";
import useAnswerFlow from "../hooks/useAnswerFlow";

const PlayGame = () => {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
 const gameOverTimer = useRef(null);
const [showWalkAwayModal, setShowWalkAwayModal] = useState(false);
const [gameResult, setGameResult] = useState("");


const {sceneTransition,fadeOut,fadeIn,} = useTransitions();

const {stageEffect, normal,locked,correct, wrong,} = useStageEffects();

const {statusMessage,statusType,showStatus,} = useStatusMessage();

const { gameId,setGameId, question,setQuestion,currentQuestion,setCurrentQuestion,
currentPrize,setCurrentPrize,safePrize,setSafePrize,gameOver,setGameOver,
} = useGame();

const {selectedAnswer,setSelectedAnswer,
correctAnswer,setCorrectAnswer,
showResult,setShowResult,
showFinalAnswer,setShowFinalAnswer,
pendingAnswer,setPendingAnswer,
answerLocked,setAnswerLocked,
 handleAnswer, beginAnswerConfirmation,
 handleWrongAnswer,handleCorrectAnswer,
handleWinner,
} = useAnswerFlow();

const {
    fiftyUsed,
  audienceUsed,
  phoneUsed,
  remainingIndexes,
  audiencePoll,showAudience,
  phoneAnswer,phoneConfidence,
  phoneStage,showPhoneModal,
  setRemainingIndexes,
  setShowAudience,
  setShowPhoneModal,
  handleFifty,
  handleAudience,
  handlePhoneFriend,
} = useLifelines(gameId);

//change theme
useEffect(() => {
  const oldBackground = document.body.style.background;

  document.body.style.background = `
    linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
    url(${bgImage}) center/cover fixed no-repeat
  `;

  return () => {
    document.body.style.background = oldBackground;
  };
}, []);

  // Start Game
  useEffect(() => {
    const createGame = async () => {
      try {
        const data = await startGame();

        setGameId(data.gameId);
        setQuestion(data.question);
        setCurrentPrize(0);
setSafePrize(0);

         // Play game start sound
    soundManager.playEffect("/sounds/start.mp3");

    // 🎵 Start thinking music
    soundManager.playBackground("/sounds/thinking.mp3");

      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to start game"
        );
      } finally {
        setLoading(false);
      }
    };

    createGame();
  }, []);


  // Stop background music when leaving page
useEffect(() => {
  return () => {
    if (gameOverTimer.current) {
      clearTimeout(gameOverTimer.current);
    }

    soundManager.stopAll();
  };
}, []);



//confirm answer
const confirmAnswer = async () => {
  setShowFinalAnswer(false);
  setAnswerLocked(true);
  locked();

try {
    const data = await beginAnswerConfirmation(
        gameId,
        submitAnswer,
        soundManager
    );
    setCorrectAnswer(data.correctAnswer);
    setShowResult(true);

    //handle wrong answer
  const isWrong = handleWrongAnswer(data, {
  wrong,
  soundManager,
  showStatus,
  gameOverTimer,
  setCurrentPrize,
  safePrize,
  setGameResult,
  setGameOver,
});
if (isWrong) return;

//handle winner function
const isWinner = handleWinner(data, {
  soundManager,
  toast,
  setCurrentPrize,
  setSafePrize,
  setGameResult,
  setGameOver,
});

if (isWinner) return;

//function to handle correct answer
     handleCorrectAnswer(data, {
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
});
  } catch (error) {
    toast.error("Something went wrong");
  }
};

//cancel final answer
const cancelFinalAnswer = () => {
  setShowFinalAnswer(false);
  setPendingAnswer(null);
  setSelectedAnswer(null); // Remove the highlight
};

//Timer
const handleTimeout = () => {
  
  if (gameOver) return;// Prevent the timeout function from running again

  soundManager.stopAll();

  // Show the timeout result immediately
  setCurrentPrize(safePrize);
  setGameResult("timeout");
  wrong();
  setGameOver(true);

  
  
};


//walk away function 
 const handleWalkAway = async () => {
    try {
        const data = await walkAway(gameId);

        setShowWalkAwayModal(false);

        soundManager.stopAll();

   soundManager.playEffect(
    "/sounds/walkaway.mp3",
    1,
    () => {
        setTimeout(() => {
          setGameResult("quit");
            setGameOver(true);
        }, 500);
    }
);
        setCurrentPrize(data.amountWon);

        showStatus(data.message, "success");

    } catch (error) {
        toast.error("Unable to walk away");
    }
};
  //handle game over function
const handleGameOverClose = () => {
  if (gameOverTimer.current) {
    clearTimeout(gameOverTimer.current);
  }

  soundManager.stopAll();

  navigate("/dashboard");
};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl">Loading Game...</h1>
      </div>
    );
  }

 
  

  return (
   <div
   className={`
  game-stage
  stage-${stageEffect}
  relative
  min-h-screen
  w-full
  overflow-hidden
`}
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}
>
<SpotlightBackground />
{/* Dark Overlay */}

<div className="relative z-10 bg-black/60 px-3 py-3 sm:px-4 lg:px-5">


      <div className="max-w-6xl mx-auto">

       <h1 className="text-center text-lg sm:text-xl lg:text-3xl font-bold text-yellow-400 mb-3">
          Who Wants To Be A Millionaire
        </h1>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">

  <div className="lg:col-span-2 flex w-full">

 <div className="question-stage w-full bg-blue-950/90 backdrop-blur-md rounded-3xl border-2 border-blue-700 p-8 shadow-2xl">

<div className="flex flex-wrap items-center justify-center gap-4 mb-5">
  <Timer
    question={question}
    gameOver={gameOver}
    paused={showFinalAnswer || answerLocked}
    onTimeout={handleTimeout}
  />


           <Lifelines
  fiftyUsed={fiftyUsed}
  audienceUsed={audienceUsed}
  phoneUsed={phoneUsed}
  onFifty={() => handleFifty(showStatus)}
  onAudience={() => handleAudience(showStatus)}
  onPhone={handlePhoneFriend}
  disabled={showFinalAnswer || answerLocked}
/>
  </div>

 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">

  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center lg:text-left">
    Question {currentQuestion} of 15
  </h2>

  <div className="mt-4 lg:mt-0 h-12 flex items-center justify-center lg:justify-end">

    {statusMessage && (
      <div
        className={`
          animate-fadeIn
          min-w-[180px]
          px-4
          py-2
          text-center
          rounded-full
          font-bold
          shadow-xl
          border-2
          ${
            statusType === "success"
              ? "bg-green-600 border-green-300 text-white"
              : statusType === "error"
              ? "bg-red-600 border-red-300 text-white"
              : "bg-yellow-500 border-yellow-300 text-black"
          }
        `}
      >
        {statusMessage}
      </div>
    )}


  </div>

</div>

<div
  className={`
    transition-opacity
    duration-700
    ${
      sceneTransition
        ? "opacity-0"
        : "opacity-100"
    }
  `}
>
<QuestionCard
question={question.question}
  options={question.options}
  selectedAnswer={selectedAnswer}
  onAnswerSelect={handleAnswer}
  disabled={selectedAnswer !== null}
  remainingIndexes={remainingIndexes}
  correctAnswer={correctAnswer}
  showResult={showResult}
  answerLocked={answerLocked}
/>
</div>
<div className="mt-5 flex flex-col sm:flex-row gap-3 justify-between items-center">

           <button
  disabled={showFinalAnswer || answerLocked}
  onClick={() => setShowWalkAwayModal(true)}
  className={`
    px-5 py-3 rounded-xl font-bold transition
    ${
      showFinalAnswer || answerLocked
        ? "bg-gray-600 cursor-not-allowed opacity-50"
        : "bg-red-600 hover:bg-red-700"
    }
  `}
>
    Walk Away
</button>

            <h2 className="text-xl sm:text-2xl lg:text-3xl text-yellow-400 font-bold">
              ₦{currentPrize.toLocaleString()}
            </h2>

          </div>

</div>
</div>

   {/*prize ladder*/}
  <div className="lg:col-span-1 flex justify-center lg:justify-end">
    <PrizeLadder
        currentQuestion={currentQuestion}
    />
</div>

        </div>
</div>
</div>
 <AudienceModal
      isOpen={showAudience}
      poll={audiencePoll}
      onClose={() => setShowAudience(false)}
    />

<PhoneFriendModal
  isOpen={showPhoneModal}
  stage={phoneStage}
  answer={phoneAnswer}
  confidence={phoneConfidence}
  onClose={() => setShowPhoneModal(false)}
/>


<WalkAwayModal
    isOpen={showWalkAwayModal}
    onCancel={() => setShowWalkAwayModal(false)}
    onConfirm={handleWalkAway}
     
/>

<FinalAnswerModal
  isOpen={showFinalAnswer}
  answer={question?.options?.[pendingAnswer]}
  onConfirm={confirmAnswer}
  onCancel={cancelFinalAnswer}
/>

<GameOverModal
    isOpen={gameOver}
    result={gameResult}
    amountWon={currentPrize}
    onClose={handleGameOverClose}
/>
    </div>
  );
};

export default PlayGame;