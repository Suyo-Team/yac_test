import axios from "axios";

const api = {
  postLogin: (username, password) => {
    return axios.post("/api/login", { username, password });
  },
  postSignup: (username, password) => {
    return axios.post("/api/signup", { username, password });
  },

};

export default api;
