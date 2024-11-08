import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/app-sidebar";
import { Header } from "../components/header";
import { useState } from "react";

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isOpen} />
      <div
        className={`flex-1 text-white bg-background transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"
          }`}
      >
        <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
