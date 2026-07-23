import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/game", gameRoutes);

app.use("/api/leaderboard", leaderboardRoutes);

// Handle unknown routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        message: "Millionaire API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on ${PORT}`)
);