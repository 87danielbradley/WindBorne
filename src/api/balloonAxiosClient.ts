import axios from "axios";

const API_BASE_URL = import.meta.env.WINDBORNE_API_URL;

export const balloonAxiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});