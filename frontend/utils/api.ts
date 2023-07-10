import axios, { AxiosResponse } from "axios";
import { API_URL, STRAPI_API_TOKEN } from "./urls";

export type ProductResponse = {
  data: Product[];
  meta: any;
};

export const fetchDataFromApi = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: API_URL + endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  };

  const response = await axios.request<ProductResponse>(options);

  return response.data;
};
