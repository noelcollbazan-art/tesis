import { useState, useRef } from "react";
import type { CreateGameDto } from "../../types/game.types";

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (formData: FormData) => Promise<void>;
}

const AddGameModal = ({ isOpen, onClose, onAdd }: AddGameModalProps) => {
  const [formData, setFormData] = useState<CreateGameDto>({
    title: "",
    description: "",
    category: "",
    technologies: [],
    featured: false,
  });
  const [techInput, setTechInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validaciones
      if (!formData.title.trim()) {
        throw new Error("El título es requerido");
      }
      if (!formData.description.trim()) {
        throw new Error("La descripción es requerida");
      }
      if (!formData.category.trim()) {
        throw new Error("La categoría es requerida");
      }
      if (!fileInputRef.current?.files?.[0]) {
        throw new Error("Por favor, selecciona una imagen");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("category", formData.category.trim());
      formDataToSend.append("featured", String(formData.featured));
      formDataToSend.append(
        "technologies",
        JSON.stringify(formData.technologies),
      );
      formDataToSend.append("image", fileInputRef.current.files[0]);

      console.log("Enviando datos:", {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        technologies: formData.technologies,
        featured: formData.featured,
        image: fileInputRef.current.files[0].name,
      });

      await onAdd(formDataToSend);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        technologies: [],
        featured: false,
      });
      setTechInput("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al agregar el juego";
      console.error("Error detallado:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 z-10 p-6 border-b border-purple-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Agregar Nuevo Juego
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título del Juego *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              placeholder="Ej: Cyber Quest VR"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              placeholder="Describe el juego..."
              rows={4}
              required
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Imagen *
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setFormData({
                      ...formData,
                      imageUrl: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categoría *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="VR">Realidad Virtual (VR)</option>
              <option value="AR">Realidad Aumentada (AR)</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Action">Acción</option>
              <option value="Adventure">Aventura</option>
              <option value="Racing">Carreras</option>
              <option value="Strategy">Estrategia</option>
            </select>
          </div>

          {/* Tecnologías */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tecnologías
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTechnology())
                }
                className="flex-1 px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Ej: Unity, C#, Oculus SDK"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-6 py-3 bg-purple-600 rounded-lg font-medium hover:bg-purple-700 transition-all"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-700 border border-purple-500/30 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(idx)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Destacado */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 bg-slate-800 border-purple-500/30 rounded focus:ring-purple-500"
            />
            <label htmlFor="featured" className="text-sm text-gray-300">
              ⭐ Marcar como destacado
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-800 border border-purple-500/30 rounded-lg font-medium hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Agregando..." : "Agregar Juego"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGameModal;
