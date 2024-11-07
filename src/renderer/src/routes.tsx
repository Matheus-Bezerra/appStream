// src/routes.tsx
import React from "react";
import { createHashRouter } from "react-router-dom"; 
import {MainLayout} from "./layouts/MainLayout";
import {AuthLayout} from "./layouts/AuthLayout";
import {Home} from "./pages/Main/Home";
import {Login} from "./pages/Auth/Login";
import { Predefinicoes } from "./pages/Main/Predefinicoes";

export const router = createHashRouter([
    {
        path: "/",
        element: <MainLayout />,  // Layout principal para as rotas da aplicação
        children: [
            {
                path: "/",
                element: <Home />
            },
            // {
            //     path: "/",
            //     element: <Predefinicoes />
            // },
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,  // Layout para rotas de autenticação
        children: [
            {
                path: "/login",
                element: <Login />
            },
        ]
    }
]);
