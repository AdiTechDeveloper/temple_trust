import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    const auth = localStorage.getItem("temple_trust_auth");

    if (auth) {

      try {

        const parsedAuth = JSON.parse(auth);

        if (parsedAuth.token) {

          config.headers.Authorization =
            `Bearer ${parsedAuth.token}`;

        }

      } catch (error) {

        console.error(
          "Invalid auth storage:",
          error
        );

      }

    }

    return config;
  },

  (error) => Promise.reject(error)
);


api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      console.error(
        "Authentication expired or invalid."
      );

      localStorage.removeItem(
        "temple_trust_auth"
      );

      // Agar chaho to redirect bhi kar sakte ho
      // window.location.href = "/membership/login";
    }

    return Promise.reject(error);
  }

);


export const logoutUser = () => {
  return api.post("/logout");
};


export default api;