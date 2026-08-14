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
          config.headers.Authorization = `Bearer ${parsedAuth.token}`;
        }
      } catch (error) {
        console.error("Invalid auth storage:", error);
      }
    }

    return config;
  },

  (error) => Promise.reject(error),
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

        console.error(
            "API Error:",
            error.response?.status,
            error.response?.data
        );

        if (error.response?.status === 401) {

            console.error(
                "Authentication expired or invalid."
            );

            localStorage.removeItem(
                "temple_trust_auth"
            );

        }

        return Promise.reject(error);
    }

);


// ===============================
// POOJAS
// ===============================

export const getPujas = async () => {

    try {

        const response = await api.get(
            "/admin/poojas"
        );

        console.log(
            "Pooja API Response:",
            response.data
        );

        return response.data.poojas || [];

    } catch (error) {

        console.error(
            "Error fetching pujas:",
            error
        );

        console.error(
            "Status:",
            error.response?.status
        );
        console.error(
            "Response:",
            error.response?.data
        );

        throw error;
    }
};


// ===============================
// LOGOUT
// ===============================

export const logoutUser = () => {
    return api.post("/logout");
};

export default api;
