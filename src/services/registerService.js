
import { api, requestConfig } from "../utils/config";

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
      const res = await fetch(api + "/users/register", config);
      const jsonData = await res.json();
      console.log("Resposta da API:", jsonData); // Registre os dados da resposta
      return jsonData;
  } catch (errors) {
      console.error("Erro na API:", errors);
      throw errors; // Rejeite o erro para ser capturado na função de chamada
  }
};

  const registerService = {
    register,
  };

  export default registerService;
  