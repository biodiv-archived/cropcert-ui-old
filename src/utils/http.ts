import axios from "axios";

const ax = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

ax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      console.log("unauthorized, logging out ...");
    }
    return Promise.reject(error.response);
  }
);

export default ax;
