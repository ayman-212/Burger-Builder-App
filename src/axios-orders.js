import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-burger-b3cdb.firebaseio.com/",
});

export default instance;