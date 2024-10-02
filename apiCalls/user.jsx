import axios from "axios";

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

export const register = async ({ email, password, name }) => {
  const body = {
    email: email,
    password: password,
    name: name,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/register`,
    body
  );

  return response;
};
