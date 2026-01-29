export interface Game {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  technologies: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGameDto {
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  technologies: string[];
  featured?: boolean;
}

export interface UpdateGameDto extends Partial<CreateGameDto> {}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
