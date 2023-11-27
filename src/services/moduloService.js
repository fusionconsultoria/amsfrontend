import { api, requestConfig } from "../utils/config";

// Publish a business process
const publishModulo = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/modulo", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get all modulos
const getModulos = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/modulo", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get modulo
const getModulo = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/modulo/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const moduloService = {
  publishModulo,
  getModulos,
  getModulo
};

export default moduloService;