import type { Game } from "../../types/game.types";

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
}

const GameCard = ({ game, onEdit, onDelete }: GameCardProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        {game.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900">
            ⭐ Destacado
          </div>
        )}
        <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-xs font-semibold">
          {game.category}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-purple-300">{game.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {game.description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {game.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-slate-700/50 border border-purple-500/20 rounded text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(game)}
            className="flex-1 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-sm font-medium text-blue-300 hover:bg-blue-600/40 transition-all duration-300"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete(game.id)}
            className="flex-1 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-sm font-medium text-red-300 hover:bg-red-600/40 transition-all duration-300"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
