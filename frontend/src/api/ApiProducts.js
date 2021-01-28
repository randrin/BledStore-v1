import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios({
      url: "/v1/api/products",
      method: "GET",
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
