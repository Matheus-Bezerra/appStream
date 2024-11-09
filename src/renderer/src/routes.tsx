// src/routes.tsx
import React from "react";
import { createHashRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Home } from "./pages/Main/Home";
import { Login } from "./pages/Auth/Login";
import { Predefinicoes } from "./pages/Main/Predefinicoes";
import { Jogos } from "./pages/Main/Jogos";
import { GameModes } from "./pages/Main/GameModes";  

export const router = createHashRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/jogos",
                element: <Jogos />
            },
            {
                path: "/jogos/:idJogo", 
                element: <GameModes />
            },
            {
                path: "/jogos/predefinicoes/:idJogoSelecionado/:modoJogoSelecionado", 
                element: <Predefinicoes />
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]);
