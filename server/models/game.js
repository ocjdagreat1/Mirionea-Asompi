import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    currentQuestion: {
      type: Number,
      default: 0,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        selectedAnswer: Number,
        isCorrect: Boolean,
      },
    ],

    amountWon: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    currentStreak: {
    type: Number,
    default: 0,
},

    lifelines: {
      fiftyFifty: {
        type: Boolean,
        default: true,
      },

      askAudience: {
        type: Boolean,
        default: true,
      },

      phoneFriend: {
        type: Boolean,
        default: true,
      },
    },

    gameStatus: {
      type: String,
      enum: ["playing", "won", "lost", "quit","timeout",],
      default: "playing",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Game", gameSchema);