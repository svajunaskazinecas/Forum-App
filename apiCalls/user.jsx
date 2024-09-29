import axios from "axios";
import cookie from "js-cookie";

export const login = async ({ email, password }) => {
  const body = {
    email: email,
    password: password,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
    body
  );

  return response;
};

export const validateUser = async () => {
  const jwt = cookie.get("token");

  const headers = {
    authorization: jwt,
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/login/validate`,
    {
      headers,
    }
  );

  return response;
};
