import Game from "../models/game.js";

export const leaderboard = async (req, res) => {

    const leaders = await Game.find()
        .populate("user", "name")
        .sort({
            amountWon: -1,
        })
        .limit(10);

    res.json(leaders);

};