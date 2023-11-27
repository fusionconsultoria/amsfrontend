import { api, requestConfig } from "../utils/config";

const insertHistory = async (data, id, token) => {
    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(api + "/history/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get history
const getHistory = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + "/history/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// Delete a history
const deleteHistory = async (id, token) => {
    const config = requestConfig("DELETE", "", token);

    try {
        const res = await fetch(api + "/history/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const historyService = {
    insertHistory,
    getHistory,
    deleteHistory
};

export default historyService;