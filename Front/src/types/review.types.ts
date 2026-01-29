export interface Review {
  id: number;
  gameId: number;
  userId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  user?: { id: number; username: string };
}

export interface CreateReviewDto {
  gameId: number;
  rating: number;
  comment?: string;
  userId?: number;
}
