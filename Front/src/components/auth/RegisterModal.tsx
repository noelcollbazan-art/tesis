import { useState } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Register:", formData);
    // Aquí irá la lógica de registro
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all"
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
            Crear Cuenta
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Únete a VERTEXGesto y comienza tu aventura
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nombre de Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Elige tu nombre de usuario"
                required
              />
            </div>
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Edad
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Ingresa tu edad"
                min="13"
                max="120"
                required
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                required
              />
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Repite tu contraseña"
                minLength={8}
                required
              />
            </div>
          </div>

          {/* Términos y Condiciones */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 text-purple-600 bg-slate-800 border-purple-500/30 rounded focus:ring-purple-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              Acepto los{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                términos y condiciones
              </a>{" "}
              y la{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                política de privacidad
              </a>
            </label>
          </div>

          {/* Botón Registrarse */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
