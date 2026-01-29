//src/components/layout/Header.tsx
import { useState } from "react";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import LogoutButton from "../auth/LogoutButton";

interface HeaderProps {
  onOpenLogin: () => void;
}

const Header = ({ onOpenLogin }: HeaderProps) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const handleOpenRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleOpenLoginModal = () => {
    setIsLoginOpen(true);
    onOpenLogin();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-emerald-500/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/50 overflow-hidden">
                <img
                  src="/images/logo/logo.png"
                  alt="VERTEXGesto"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  VERTEXGesto
                </h1>
                <p className="text-xs text-gray-400">Project Management</p>
              </div>
            </div>

            {isLoggedIn ? (
              <LogoutButton
                redirectTo="/"
                className="px-6 py-2.5 bg-slate-700/80 hover:bg-red-600/90 border border-slate-500/50 hover:border-red-500/50 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              />
            ) : (
              <button
                onClick={handleOpenLoginModal}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105"
              >
                <span className="flex items-center gap-2">
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Iniciar Sesión
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={handleOpenRegister}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
};

export default Header;
