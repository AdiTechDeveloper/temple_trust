import api from "./api.js";

export const joinCommunity = (data) => {
  return api.post("/register", data);
};
