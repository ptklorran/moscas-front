import axios from "axios";

export const http = axios.create({
  // baseURL: process.env.VUE_APP_URL_API,
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.token ? JSON.parse(sessionStorage.token) : ""
    }`
  }
});
