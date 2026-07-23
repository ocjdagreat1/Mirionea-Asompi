import api from "../utils/api";

export const startGame = async () => {
  const response = await api.post("/game/start");
  return response.data;
};

export const submitAnswer = async (gameId, answerIndex) => {
  const response = await api.post("/game/answer", {
    gameId,
    answerIndex,
  });

  return response.data;
};

export const walkAway = async (gameId) => {
  const response = await api.post("/game/walkaway", {
    gameId,
  });

  return response.data;
};


export const useFiftyFifty = async (gameId) => {
  const { data } = await api.post("/game/fifty", {
    gameId,
  });

  return data;
};

export const askAudience = async (gameId) => {
  const { data } = await api.post("/game/audience", {
    gameId,
  });

  return data;
};

export const phoneFriend = async (gameId) => {
  const { data } = await api.post("/game/phone", {
    gameId,
  });

  return data;
};


export const getHistory = async () => {
  const response = await api.get("/game/history");
  return response.data;
};