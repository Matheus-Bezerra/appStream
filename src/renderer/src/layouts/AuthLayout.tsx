import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div>
      
        {/* Renderiza a página atual de autenticação com base na rota */}
        <Outlet />
      
    </div>
  );
};
