import api from "../utils/api";

export const getLeaderboard = async () => {
  const { data } = await api.get("/leaderboard");
  return data;
};