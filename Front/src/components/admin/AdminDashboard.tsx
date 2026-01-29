import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gamesAPI } from "../../services/api";
import type { Game, UpdateGameDto } from "../../types/game.types";
import GameCard from "./GameCard";
import AddGameModal from "./AddGameModal";
import EditGameModal from "./EditGameModal";
import LogoutButton from "../auth/LogoutButton";

const AdminDashboard = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setIsLoading(true);
      const data = await gamesAPI.getAll();
      setGames(data);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
      alert("Error al cargar los juegos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGame = async (gameData: FormData) => {
    try {
      await gamesAPI.create(gameData);
      await loadGames();
      alert("✅ Juego agregado exitosamente");
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error al agregar juego:", error);
      alert("❌ Error al agregar el juego. Por favor, verifica los datos e intenta nuevamente.");
      throw error;
    }
  };

  const handleEditGame = async (id: number, gameData: UpdateGameDto) => {
    try {
      await gamesAPI.update(id, gameData);
      await loadGames();
      alert("✅ Juego actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar juego:", error);
      throw error;
    }
  };

  const handleDeleteGame = async (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este juego?")) {
      try {
        await gamesAPI.delete(id);
        await loadGames();
        alert("✅ Juego eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar juego:", error);
        alert("❌ Error al eliminar el juego");
      }
    }
  };

  const openEditModal = (game: Game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header con Cerrar sesión */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Panel de Administración
            </h1>
            <p className="text-gray-400 text-lg">
              Gestiona los videojuegos del Centro VERTEX
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 bg-slate-700/80 hover:bg-slate-600 border border-slate-500/50 rounded-lg font-medium transition-all duration-300"
            >
              Inicio
            </Link>
            <LogoutButton
              redirectTo="/"
              className="px-6 py-2.5 bg-slate-700/80 hover:bg-red-600/90 border border-slate-500/50 hover:border-red-500/50 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {games.length}
            </div>
            <div className="text-gray-400">Total de Juegos</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {games.filter((g) => g.featured).length}
            </div>
            <div className="text-gray-400">Juegos Destacados</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {new Set(games.map((g) => g.category)).size}
            </div>
            <div className="text-gray-400">Categorías</div>
          </div>
        </div>

        {/* Add Game Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-300">
            Todos los Juegos
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Agregar Juego
          </button>
        </div>

        {/* Games Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Cargando juegos...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
            <svg
              className="w-20 h-20 mx-auto text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              No hay juegos registrados
            </h3>
            <p className="text-gray-500 mb-6">
              Comienza agregando tu primer videojuego
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Agregar Primer Juego
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={openEditModal}
                onDelete={handleDeleteGame}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGame}
      />

      <EditGameModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedGame(null);
        }}
        onUpdate={handleEditGame}
        game={selectedGame}
      />
    </div>
  );
};

export default AdminDashboard;
