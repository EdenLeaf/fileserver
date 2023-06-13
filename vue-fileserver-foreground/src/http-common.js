import axios from "axios";
export default axios.create({
    baseURL: `http://${window.location.hostname}/api/`,
    headers: {
        "Content-type": "application/json; charset=utf-8"
    },
    responseEncoding: 'utf-8',
});