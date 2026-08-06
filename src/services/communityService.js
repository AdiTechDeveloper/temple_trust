    import api from "./api.js";

    export const joinCommunity = (data) => {
        return api.post("/community/join", data);
    };