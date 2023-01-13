export const url = "https://ecommerce-backend-production-be36.up.railway.app";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
