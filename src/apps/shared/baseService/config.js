import axios from "axios";

export const http = axios.create({
  // baseURL: process.env.VUE_APP_URL_API,
  // baseURL: "http://localhost:3000",
  baseURL: "http://200.129.165.106/bases/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.token ? JSON.parse(sessionStorage.token) : ""
    }`
  }
});
