import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const TOKEN_KEY = "TEPI_JWT";

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setToken = (token) => {
  if (!token) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, token);
};

export const decodeJwt = (token) => {
  const parts = token.split(".");
  if (parts.length < 2) throw new Error("Invalid JWT");
  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join(""),
  );
  return JSON.parse(jsonPayload);
};

export const getStoredAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    return decodeJwt(token);
  } catch {
    return null;
  }
};

export default api;

