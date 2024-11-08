import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div>
      <header>Auth Header (pode ser vazio ou ter informações básicas)</header>
      <Outlet />
    </div>
  );
};