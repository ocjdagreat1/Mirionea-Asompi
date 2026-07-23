import express from "express";

import {
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
} from "../controllers/questionController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getQuestions);

router.post("/", protect, admin, createQuestion);

router.put("/:id", protect, admin, updateQuestion);

router.delete("/:id", protect, admin, deleteQuestion);

export default router;