import { useState } from "react";
import { toast } from "react-toastify";
import {
  useFiftyFifty,
  askAudience,
  phoneFriend,
} from "../services/gameService";
import soundManager from "../utils/soundManager";

const useLifelines = (gameId) => {
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [audienceUsed, setAudienceUsed] = useState(false);
  const [phoneUsed, setPhoneUsed] = useState(false);

  const [remainingIndexes, setRemainingIndexes] = useState(null);

  const [audiencePoll, setAudiencePoll] = useState(null);
  const [showAudience, setShowAudience] = useState(false);

  const [phoneAnswer, setPhoneAnswer] = useState("");
  const [phoneConfidence, setPhoneConfidence] = useState(0);
  const [phoneStage, setPhoneStage] = useState("calling");
  const [showPhoneModal, setShowPhoneModal] = useState(false);


  //handle 50 50 logic

  const handleFifty = async (showStatus) => {
  try {
    const data = await useFiftyFifty(gameId);

    setRemainingIndexes(data.remainingIndexes);
    setFiftyUsed(true);

    soundManager.playEffect("/sounds/fifty_fifty.mp3");

    showStatus("50:50 Activated", "info");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to use 50:50"
    );
  }
};

//handle audience 
const handleAudience = async (showStatus) => {
  try {
    const data = await askAudience(gameId);

    setAudiencePoll(data.poll);

    setAudienceUsed(true);

    setShowAudience(true);

    showStatus("Audience has voted!", "info");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to use Audience lifeline"
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

  return {
    fiftyUsed,
  audienceUsed,
  phoneUsed,

  remainingIndexes,

  audiencePoll,
  showAudience,

  phoneAnswer,
  phoneConfidence,
  phoneStage,
  showPhoneModal,

  setFiftyUsed,
  setAudienceUsed,
  setPhoneUsed,

  setRemainingIndexes,

  setAudiencePoll,
  setShowAudience,

  setPhoneAnswer,
  setPhoneConfidence,
  setPhoneStage,
  setShowPhoneModal,

  handleFifty,
handleAudience,
handlePhoneFriend,
  };
};

export default useLifelines;