import axios from "axios";

export const httpInstance = await axios.create({
    baseURL: "http://localhost:4000",
});

