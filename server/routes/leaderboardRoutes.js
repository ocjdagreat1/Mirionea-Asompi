import express from "express";
import { leaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", leaderboard);

export default router;