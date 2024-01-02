
import { api, requestConfig } from "../utils/config";

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
      const res = await fetch(api + "/users/register", config);
      const jsonData = await res.json();
      return jsonData;
  } catch (error) {
      throw error; // Rejeite o erro para ser capturado na função de chamada
  }
};

  const registerService = {
    register,
  };

  export default registerService;
  