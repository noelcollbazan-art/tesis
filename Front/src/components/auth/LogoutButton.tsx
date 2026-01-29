import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  /** Clases CSS adicionales para el botón (ej. variante para header o panel) */
  className?: string;
  /** Ruta a la que redirigir tras cerrar sesión. Por defecto "/" */
  redirectTo?: string;
}

const LogoutButton = ({ className = "", redirectTo = "/" }: LogoutButtonProps) => {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(redirectTo);
    setIsConfirmOpen(false);
  };

  const handleClick = () => {
    setIsConfirmOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={
          className ||
          "px-6 py-2.5 bg-slate-700 hover:bg-red-600/90 border border-slate-500/50 hover:border-red-500/50 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
        }
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
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4"
          />
        </svg>
        Cerrar sesión
      </button>

      {/* Modal de confirmación */}
      {isConfirmOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsConfirmOpen(false)}
        >
          <div
            className="bg-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-purple-300 mb-2">
              ¿Está seguro de que desea cerrar sesión?
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Tendrá que volver a iniciar sesión para acceder al panel.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="px-5 py-2.5 bg-slate-700 border border-slate-500/50 rounded-lg font-medium hover:bg-slate-600 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-all"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
