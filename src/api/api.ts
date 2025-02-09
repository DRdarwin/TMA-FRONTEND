import axios from "axios";

const API_URL = "https://be.specialized-air.services:5000"; // ⚡ Замінити на реальний бекенд URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
