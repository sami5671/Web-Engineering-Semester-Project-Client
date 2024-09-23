import requestOnAxios from ".";

// Get token from server
export const getToken = async (email) => {
  const { data } = await requestOnAxios.post(`/jwt`, { email });
  console.log("Token received from server------>", data);
  return data;
};
