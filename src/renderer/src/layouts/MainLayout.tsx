// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/app-sidebar";
import { Header } from "../components/header";

export const MainLayout = () => {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 text-white bg-background">
        <Header /> 
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
