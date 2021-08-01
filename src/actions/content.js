import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1/";

export const create = async (content) => {
  return await axios
    .post(BASE_URL + "scripts", {
      script: { body: content },
    })
    .then((res) => res)
    .catch((err) => err);
};

export const getCode = (slug) => {
  return axios
    .get(BASE_URL + `scripts/${slug}`)
    .then((res) => res.data)
    .catch((err) => err);
};
