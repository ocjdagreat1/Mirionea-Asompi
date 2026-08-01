import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  startGame,
  submitAnswer,
  walkAway,
  timeoutGame,
  gameHistory,
   useFiftyFifty,
    askAudience,
      phoneFriend,
} from "../controllers/gameController.js";

const router = express.Router();

router.post("/start", protect, startGame);

router.post("/answer", protect, submitAnswer);
router.post("/fifty", protect, useFiftyFifty);
router.post("/audience", protect, askAudience);
router.post("/phone", protect, phoneFriend);

router.post("/walkaway", protect, walkAway);
router.post("/timeout", protect, timeoutGame);

router.get("/history", protect, gameHistory);

export default router;