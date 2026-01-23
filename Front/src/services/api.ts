import axios from "axios";
import type {
  Game,
  CreateGameDto,
  UpdateGameDto,
  LoginResponse,
} from "../types/game.types";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response.data;
  },
};

// Games
export const gamesAPI = {
  getAll: async (): Promise<Game[]> => {
    const response = await api.get<Game[]>("/games");
    return response.data;
  },

  getOne: async (id: number): Promise<Game> => {
    const response = await api.get<Game>(`/games/${id}`);
    return response.data;
  },

  getFeatured: async (): Promise<Game[]> => {
    const response = await api.get<Game[]>("/games/featured");
    return response.data;
  },

  create: async (data: CreateGameDto): Promise<Game> => {
    const response = await api.post<Game>("/games", data);
    return response.data;
  },

  update: async (id: number, data: UpdateGameDto): Promise<Game> => {
    const response = await api.patch<Game>(`/games/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/games/${id}`);
  },
};

export default api;
