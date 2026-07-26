import { useEffect, useState } from "react";
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

const PlayGame = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState("");
  const [question, setQuestion] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [amountWon, setAmountWon] = useState(0);
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
  
  // Start Game
  useEffect(() => {
    const createGame = async () => {
      try {
        const data = await startGame();

        setGameId(data.gameId);
        setQuestion(data.question);

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
  // ===========================
  useEffect(() => {
    return () => {
      soundManager.stopBackground();
    };
  }, []);



//handle 50 50
const handleFifty = async () => {
  try {
    const data = await useFiftyFifty(gameId);

    setRemainingIndexes(data.remainingIndexes);

    setFiftyUsed(true);

   soundManager.playEffect("/sounds/fifty_fifty.mp3");

    toast.success("50:50 Activated!");

  } catch (error) {
    toast.error(error.response?.data?.message || "Unable to use 50:50");
  }
};

  const handleAnswer = async (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    try {
      const data = await submitAnswer(gameId, index);

      if (!data.success) {
          soundManager.stopBackground();

    soundManager.playEffect("/sounds/wrong.mp3");

   toast.error("Wrong Answer!");

setTimeout(() => {
  soundManager.playEffect("/sounds/gameover.mp3");

  setAmountWon(data.amountWon);
  setGameOver(true);
}, 1500);
return;
      }

      if (data.winner) {
        soundManager.stopBackground();

    soundManager.playEffect("/sounds/win.mp3");

    toast.success("🎉 Congratulations! You won the game!");

    setAmountWon(data.amountWon);
    setGameOver(true);

    return;
      }

     // Stop thinking music
soundManager.stopBackground();
// Play correct answer sound
soundManager.playEffect("/sounds/correct.mp3");
toast.success("Correct Answer!");

     setTimeout(() => {
  setQuestion(data.nextQuestion);
  setCurrentQuestion((prev) => prev + 1);
  setAmountWon(data.amountWon);
  setSelectedAnswer(null);
// Reset the hidden options for the next question
  setRemainingIndexes(null);

   // 🔊 Restart thinking music for next question
  soundManager.playBackground("/sounds/thinking.mp3");

}, 2500);

    } catch (error) {
      toast.error("Something went wrong");
    }
  };


//Timer
const handleTimeout = () => {
  setGameOver(true);
};

//ask the audience function 
const handleAudience = async () => {
  try {
    const data = await askAudience(gameId);

    setAudiencePoll(data.poll);

    setAudienceUsed(true);

    setShowAudience(true);

    toast.success("Audience has voted!");

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



//walk away function 
  const handleWalkAway = async () => {
    try {
      const data = await walkAway(gameId);

      soundManager.stopBackground();

soundManager.playEffect("/sounds/walkaway.mp3");

toast.success(data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error("Unable to walk away");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl">Loading Game...</h1>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-blue-950 p-10 rounded-xl text-center">

          <h1 className="text-5xl font-bold text-red-500 mb-6">
            Game Over
          </h1>

          <h2 className="text-3xl mb-8">
            You won
          </h2>

          <p className="text-5xl text-yellow-400 mb-8">
            ₦{amountWon.toLocaleString()}
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <div
    className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${bgImage})`,
    }}
  >

{/* Dark Overlay */}
<div className="min-h-screen bg-black/60 p-8">


      <div className="max-w-5xl mx-auto">

        <h1 className="text-center text-4xl font-bold text-yellow-400 mb-4">
          Who Wants To Be A Millionaire
        </h1>

        <h2 className="text-2xl font-bold">
    Question {currentQuestion} of 15
  </h2>

  <Timer
    question={question}
    gameOver={gameOver}
    onTimeout={handleTimeout}
  />

        <div className="bg-blue-950 rounded-xl p-8">

           <Lifelines
    fiftyUsed={fiftyUsed}
    audienceUsed={audienceUsed}
    phoneUsed={phoneUsed}
    onFifty={handleFifty}
    onAudience={handleAudience}
    onPhone={handlePhoneFriend}
    
  />
<QuestionCard
  question={question.question}
  options={question.options}
  selectedAnswer={selectedAnswer}
  onAnswerSelect={handleAnswer}
  disabled={selectedAnswer !== null}
  remainingIndexes={remainingIndexes}
/>

<div className="mt-8 flex justify-between items-center">

            <button
              onClick={handleWalkAway}
              className="bg-red-600 px-6 py-3 rounded-lg"
            >
              Walk Away
            </button>

            <h2 className="text-2xl text-yellow-400">
              ₦{amountWon.toLocaleString()}
            </h2>

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
    </div>
  );
};

export default PlayGame;