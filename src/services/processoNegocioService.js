import { api, requestConfig } from "../utils/config";

const publishProcessoNegocio = async (data, token) => {
    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(api + "/processoNegocio", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};


const processoNegocioService = {
    publishProcessoNegocio,

};

export default processoNegocioService;;