import { useState, useEffect } from "react";
import { gamesAPI, reviewsAPI, API_URL } from "../../services/api";
import type { Game } from "../../types/game.types";
import type { Review } from "../../types/review.types";

interface GameDetailModalProps {
  gameId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const getImageUrl = (imageUrl: string) => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_URL}${imageUrl}`;
};

const GameDetailModal = ({ gameId, isOpen, onClose }: GameDetailModalProps) => {
  const [game, setGame] = useState<Game | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!isOpen || !gameId) return;
    setLoading(true);
    setError(null);
    Promise.all([gamesAPI.getOne(gameId), reviewsAPI.getByGame(gameId)])
      .then(([gameData, reviewsData]) => {
        setGame(gameData);
        setReviews(reviewsData);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error al cargar el juego");
      })
      .finally(() => setLoading(false));
  }, [isOpen, gameId]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameId || !user?.id) return;
    setReviewLoading(true);
    setError(null);
    setSuccess("");
    try {
      await reviewsAPI.create({
        gameId,
        rating,
        comment: comment.trim() || undefined,
        userId: user.id,
      });
      const updated = await reviewsAPI.getByGame(gameId);
      setReviews(updated);
      setComment("");
      setRating(5);
      setSuccess("¡Reseña publicada!");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      setError(msg || "Error al publicar la reseña");
    } finally {
      setReviewLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900 z-10 p-6 border-b border-purple-500/20 flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Detalles del juego
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-purple-500 border-t-transparent" />
              <p className="text-gray-400 mt-4">Cargando...</p>
            </div>
          ) : error && !game ? (
            <p className="text-red-400">{error}</p>
          ) : game ? (
            <>
              <div className="rounded-xl overflow-hidden border border-purple-500/20">
                <img
                  src={getImageUrl(game.imageUrl)}
                  alt={game.title}
                  className="w-full h-56 object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-purple-600/80 rounded-full text-sm font-medium">
                    {game.category}
                  </span>
                  {game.featured && (
                    <span className="px-3 py-1 bg-yellow-500/80 text-slate-900 rounded-full text-sm font-medium">
                      Destacado
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-purple-300 mb-2">{game.title}</h3>
                <p className="text-gray-400 leading-relaxed">{game.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {game.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-800/50 border border-purple-500/20 rounded text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating promedio y reseñas */}
              <div className="border-t border-purple-500/20 pt-6">
                <h4 className="text-lg font-bold text-purple-300 mb-4">
                  Reseñas de usuarios
                </h4>
                {averageRating !== null && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-yellow-400">
                      {averageRating}
                    </span>
                    <span className="text-gray-400 text-sm">
                      / 5 ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
                    </span>
                  </div>
                )}

                {/* Formulario comentar (solo si está logueado) */}
                {user ? (
                  <form onSubmit={handleSubmitReview} className="mb-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tu puntuación (1-5)
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            className={`w-10 h-10 rounded-lg border transition-all ${
                              rating >= n
                                ? "bg-yellow-500/80 border-yellow-500 text-slate-900"
                                : "bg-slate-800 border-purple-500/30 text-gray-400"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Comentario (opcional)
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                        rows={3}
                        placeholder="Escribe tu opinión sobre el juego..."
                      />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && <p className="text-green-400 text-sm">{success}</p>}
                    <button
                      type="submit"
                      disabled={reviewLoading}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50"
                    >
                      {reviewLoading ? "Publicando..." : "Comentar juego"}
                    </button>
                  </form>
                ) : (
                  <p className="text-gray-400 text-sm mb-6">
                    Inicia sesión para dejar tu reseña y comentar el juego.
                  </p>
                )}

                {/* Lista de reseñas */}
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aún no hay reseñas.</p>
                  ) : (
                    reviews.map((r) => (
                      <div
                        key={r.id}
                        className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-purple-300">
                            {r.user?.username ?? "Usuario"}
                          </span>
                          <span className="text-yellow-400 text-sm">
                            {r.rating}/5
                          </span>
                        </div>
                        {r.comment && (
                          <p className="text-gray-400 text-sm">{r.comment}</p>
                        )}
                        <p className="text-gray-500 text-xs mt-2">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GameDetailModal;
