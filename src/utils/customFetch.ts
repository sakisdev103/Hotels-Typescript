import axios from "axios";

const productionUrl = "https://booking-com.p.rapidapi.com/v1/hotels";

export const customFetch = axios.create({
  baseURL: productionUrl,
  headers: {
    "X-RapidAPI-Key": "a0970939f6msh81801f2eafb56a2p1cb95bjsn189b56010dd4",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
});
