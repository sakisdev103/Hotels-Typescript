import axios from "axios";

const productionUrl = "https://booking-com.p.rapidapi.com/v1";
const API_KEY = import.meta.env.VITE_APP_HOTEL_API_KEY;

export const customFetch = axios.create({
  baseURL: productionUrl,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
});
