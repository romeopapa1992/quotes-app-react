import axios from "axios";

const API_URL = "http://api.quotes.romeopapa1992.org";

export const getAccessToken = () => localStorage.getItem("token");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, { token: refreshToken });
    setTokens({ accessToken: response.data.accessToken, refreshToken });
    return response.data.accessToken;
  } catch (error) {
    logout();
    throw new Error("Session expired. Please log in again.");
  }
};

export const register = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, credentials);
      return response.data; 
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 400 || status === 409) {
        throw new Error(message || "Validation error");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  };  

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    setTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });
  };
  
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
