// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <header>Main Layout</header>
      <Outlet />
    </div>
  );
};