import axios from "axios";

export default axios.create({
    baseURL: "https://coinview-ai.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});