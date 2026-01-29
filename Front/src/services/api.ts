import axios from "axios";
import type {
  Game,
  CreateGameDto,
  UpdateGameDto,
  LoginResponse,
} from "../types/game.types";
import type { Review, CreateReviewDto } from "../types/review.types";

export const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // No establecer Content-Type si es FormData, dejar que axios lo maneje
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un estado que no es 2xx
      console.error("Error de respuesta:", {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data?.message,
      });
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error("Sin respuesta del servidor:", error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error("Error en la petición:", error.message);
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response.data;
  },

  register: async (
    username: string,
    password: string
  ): Promise<{ message: string; user: { id: number; username: string; role: string; createdAt: string } }> => {
    const response = await api.post("/auth/register", { username, password });
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

  create: async (data: CreateGameDto | FormData): Promise<Game> => {
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

// Reviews
export const reviewsAPI = {
  getByGame: async (gameId: number): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews/game/${gameId}`);
    return response.data;
  },

  create: async (data: CreateReviewDto): Promise<Review> => {
    const response = await api.post<Review>("/reviews", data);
    return response.data;
  },
};

export default api;
