import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        highestPrize: {
            type: Number,
            default: 0
        },

        gamesPlayed: {
            type: Number,
            default: 0
        },
        gamesWon: {
    type: Number,
    default: 0,
},
        correctAnswers: {
    type: Number,
    default: 0
},

questionsAnswered: {
    type: Number,
    default: 0
},

bestStreak: {
    type: Number,
    default: 0
},
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);