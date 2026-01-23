import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/admin/AdminDashboard";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un token de autenticación
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para acceder al panel de administración");
      navigate("/");
    }
  }, [navigate]);

  return <AdminDashboard />;
};

export default Admin;
