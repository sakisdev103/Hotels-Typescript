import axios from "axios";

const productionUrl = "https://booking-com.p.rapidapi.com/v1";

export const customFetch = axios.create({
  baseURL: productionUrl,
  headers: {
    "X-RapidAPI-Key": "68a34a971cmshb4dafbfa28498e2p1e4c0fjsn0f1c743cc3c2",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
});
