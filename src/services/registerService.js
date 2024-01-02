
import { api, requestConfig } from "../utils/config";

const register = async (data) => {
    const config = requestConfig("POST", data);;
  
    try {
      const res = await fetch(api + "/users/register", config)
        .then((res) => res.json())
        .catch((err) => err);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const registerService = {
    register,
  };

  export default registerService;
  