import User from "../models/user.js";

export const leaderboard = async (req, res) => {
  try {
    const leaders = await User.find()
      .select("name highestPrize gamesPlayed")
      .sort({
        highestPrize: -1,
        gamesPlayed: -1,
      })
      .limit(10);

    res.status(200).json({
      success: true,
        currentUser: req.user?.id || null,
      leaders,
    });

  } catch (error) {
    console.error("Leaderboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load leaderboard.",
    });
  }
};