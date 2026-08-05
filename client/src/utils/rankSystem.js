// src/utils/rankSystem.js

export const RANKS = [
  {
    title: "🎮 Rookie Contestant",
    minPrize: 0,
    color: "text-green-400",
  },
  {
    title: "🥉 Bronze Contestant",
    minPrize: 1250000,
    color: "text-amber-400",
  },
  {
    title: "🥈 Silver Challenger",
    minPrize: 2500000,
    color: "text-gray-300",
  },
  {
    title: "🥇 Gold Champion",
    minPrize: 5000000,
    color: "text-yellow-400",
  },
  {
    title: "👑 Millionaire Legend",
    minPrize: 10000000,
    color: "text-yellow-300",
  },
];

// Returns the player's current rank
export const getRank = (prize = 0) => {
  let currentRank = RANKS[0];

  for (const rank of RANKS) {
    if (prize >= rank.minPrize) {
      currentRank = rank;
    }
  }

  return currentRank;
};

// Returns achievement badges with unlocked status
export const getAchievements = (prize = 0) => {
  return RANKS.map((rank) => ({
    title: rank.title.replace(/^.+?\s/, ""), // Removes emoji if desired
    icon: rank.title.split(" ")[0], // Gets the emoji
    unlocked: prize >= rank.minPrize,
  }));
};

// Returns progress toward Millionaire Legend
export const getRankProgress = (prize = 0) => {
  return Math.min((prize / 10000000) * 100, 100);
};