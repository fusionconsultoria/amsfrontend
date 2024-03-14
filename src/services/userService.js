import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);

    try {
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "/users/", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const getUserDetails = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + "/users/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/users/", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id, token) => {
    const config = requestConfig("DELETE", "", token);

    try {
        const res = await fetch(api + "/users/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const userService = {
    profile,
    updateProfile,
    getUserDetails,
    getAllUsers,
    deleteUser
};

export default userService;