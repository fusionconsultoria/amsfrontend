import { api, requestConfig } from "../utils/config";

const publishSubmodulo = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/submodulo", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};


const submoduloService = {
  publishSubmodulo,

};

export default submoduloService;