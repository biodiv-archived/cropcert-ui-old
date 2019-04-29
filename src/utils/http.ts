import axios from "axios";

import { CAS_AUTH_URL } from "./constants";

const ax = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

ax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      window.location.assign(CAS_AUTH_URL);
    }
    return Promise.reject(error.response);
  }
);

export default ax;
