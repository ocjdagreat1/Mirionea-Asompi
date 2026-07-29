import  { useEffect, useState, useRef }  from "react";
import { toast } from "react-toastify";
import { startGame, 
  submitAnswer, 
  walkAway, 
  useFiftyFifty,
  askAudience, 
 phoneFriend,} from "../services/gameService";
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


const PlayGame = () => {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState("");
  const [question, setQuestion] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  //const [amountWon, setAmountWon] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(0);
const [safePrize, setSafePrize] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
const [remainingIndexes, setRemainingIndexes] = useState(null);
const [fiftyUsed, setFiftyUsed] = useState(false);
const [audienceUsed, setAudienceUsed] = useState(false);
const [phoneUsed, setPhoneUsed] = useState(false);
const [phoneAnswer, setPhoneAnswer] = useState("");
const [phoneConfidence, setPhoneConfidence] = useState(0);
const [phoneStage, setPhoneStage] = useState("calling");
const [showPhoneModal, setShowPhoneModal] = useState(false);
const [audiencePoll, setAudiencePoll] = useState(null);
const [showAudience, setShowAudience] = useState(false);
const [correctAnswer, setCorrectAnswer] = useState(null);
const [showResult, setShowResult] = useState(false);
const gameOverTimer = useRef(null);
const [showWalkAwayModal, setShowWalkAwayModal] = useState(false);
const [gameResult, setGameResult] = useState("");
const [showFinalAnswer, setShowFinalAnswer] = useState(false);
const [pendingAnswer, setPendingAnswer] = useState(null);
const [answerLocked, setAnswerLocked] = useState(false);
const [stageEffect, setStageEffect] = useState("normal");
const [statusMessage, setStatusMessage] = useState("");
const [statusType, setStatusType] = useState(""); // success, error, info


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

         // 🔊 Play game start sound
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


//Handle answer
 const handleAnswer = (index) => {
  if (selectedAnswer !== null || showFinalAnswer) return;

  setPendingAnswer(index);
  setSelectedAnswer(index); // Highlight the selected option
  setShowFinalAnswer(true);
};

//confirm answer
const confirmAnswer = async () => {
  setShowFinalAnswer(false);
  setAnswerLocked(true);
  setStageEffect("locked");

 // Keep the selected answer highlighted
  soundManager.playBackground("/sounds/thinking.mp3");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const data = await submitAnswer(gameId, pendingAnswer);

    setCorrectAnswer(data.correctAnswer);
    setShowResult(true);

    // 👇 Paste the rest of your existing logic here
    
     if (!data.success) {
      setStageEffect("wrong");
  soundManager.stopAll();
  soundManager.playEffect("/sounds/wrong.mp3");
  //toast.error("Wrong Answer!");
  showStatus("✖ Wrong Answer!", "error");

  gameOverTimer.current = setTimeout(() => {
    soundManager.playEffect("/sounds/gameover.mp3");

    setCurrentPrize(safePrize); // Player goes home with checkpoint money
    setGameResult("wrong");
    setGameOver(true);
  }, 1500);

  return;
}
if (data.winner) {
  soundManager.stopBackground();

  soundManager.playEffect("/sounds/win.mp3");

  toast.success("🎉 Congratulations! You won the game!");

  setCurrentPrize(10000000);
  setSafePrize(10000000);
  setGameResult("winner");
  setGameOver(true);

  return;
}
     soundManager.stopAll();// Stop thinking music
setStageEffect("correct");
soundManager.playEffect("/sounds/correct.mp3");// Play correct answer sound
showStatus("✔ Correct Answer!", "success");
//toast.success("Correct Answer!");

     setTimeout(() => {
      
 const nextQuestion = currentQuestion + 1;

setQuestion(data.nextQuestion);
setCurrentQuestion(nextQuestion);

setCurrentPrize(data.amountWon);

// You just answered currentQuestion correctly
const newSafePrize = getSafePrize(currentQuestion);
setSafePrize(newSafePrize);

setSelectedAnswer(null);
setAnswerLocked(false);
setPendingAnswer(null);
setCorrectAnswer(null);
setShowResult(false);
setRemainingIndexes(null);

setAnswerLocked(false);
setStageEffect("normal");

soundManager.playBackground("/sounds/thinking.mp3");

}, 2500);
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
  setStageEffect("wrong");
  setGameOver(true);

  
  
};


//handle 50 50
const handleFifty = async () => {
  try {
    const data = await useFiftyFifty(gameId);

    setRemainingIndexes(data.remainingIndexes);

    setFiftyUsed(true);

   soundManager.playEffect("/sounds/fifty_fifty.mp3");

    showStatus("50:50 Activated", "info");

  } catch (error) {
    toast.error(error.response?.data?.message || "Unable to use 50:50");
  }
};

//ask the audience function 
const handleAudience = async () => {
  try {
    const data = await askAudience(gameId);

    setAudiencePoll(data.poll);

    setAudienceUsed(true);

    setShowAudience(true);
showStatus("Audience has voted!", "info");
    //toast.success("Audience has voted!");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Unable to use Audience lifeline"
    );
  }
};


//phone a friend function
const handlePhoneFriend = async () => {
  try {
    const data = await phoneFriend(gameId);

    setPhoneAnswer(data.answer);
    setPhoneConfidence(data.confidence);

    setPhoneUsed(true);

    setPhoneStage("calling");
    setShowPhoneModal(true);

    // Calling...
    setTimeout(() => {
      setPhoneStage("ringing");
      soundManager.playEffect("/sounds/ringing.mp3");
    }, 500);

    // Friend thinking
    setTimeout(() => {
  soundManager.stopEffect();// Stop the ringing sound
//setPhoneStage("Hello");
  setPhoneStage("thinking");

}, 3500);
    // Friend answers
    setTimeout(() => {
      setPhoneStage("speaking");
    }, 6000);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to use Phone a Friend"
    );
  }
};


//show game question status

const showStatus = (message, type = "info") => {
  setStatusMessage(message);
  setStatusType(type);

  setTimeout(() => {
    setStatusMessage("");
    setStatusType("");
  }, 2000);
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
    backgroundSize: "cover/contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}
>
<SpotlightBackground />
{/* Dark Overlay */}
{/* Dark Overlay */}
<div className="relative z-10 flex-1 bg-black/60 px-4 py-6 sm:px-6 lg:px-8">


      <div className="max-w-7xl mx-auto">

        <h1 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold text-yellow-400 mb-4">
          Who Wants To Be A Millionaire
        </h1>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-8">

   <div className="lg:col-span-3 flex">
 
  <div className="question-stage w-full bg-blue-950/90 backdrop-blur-md rounded-3xl border-2 border-blue-700 p-8 shadow-2xl">

<div className="flex flex-wrap items-center justify-center gap-8 mb-8">
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
    onFifty={handleFifty}
    onAudience={handleAudience}
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
          min-w-[240px]
          text-center
          px-6
          py-3
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

<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">

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
  <div
  className="
    mt-8
    flex justify-center
    lg:mt-0
    lg:block
    lg:sticky
    lg:top-6
    self-start
  "
>
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