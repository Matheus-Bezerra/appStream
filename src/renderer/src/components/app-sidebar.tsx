// src/components/ui/sidebar.tsx
import React from "react";
import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import logoImage from "../imagens/image.png";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex h-screen">
            {/* Botão para expandir/recolher a sidebar, sempre visível */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-1/2 left-0 z-50 transform -translate-y-1/2 p-2 rounded-r-lg transition-transform bg-black text-white hover:bg-gray-700 focus:outline-none ${isOpen ? "-translate-x-full" : "translate-x-0"}`}
            >
                {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                id="separator-sidebar"
                className={`transition-transform transform text-white overflow-hidden h-full ${isOpen ? "w-64" : "w-0"}`}
                aria-label="Sidebar"
            >
                <div className="h-full px-1 py-4 overflow-y-auto overflow-x-hidden">
                    {/* Imagem da logo no topo */}
                    <div className="mb-4 flex justify-center">
                        <img
                            src={logoImage} // Substitua com o caminho real da sua logo
                            alt="Logo"
                            className="w-32 h-auto" // Ajuste o tamanho conforme necessário
                        />
                    </div>

                    {/* Botão de seta para expandir/recolher a parte interna da sidebar */}
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center justify-center w-full mb-4 text-white hover:text-gray-300 focus:outline-none"
                    >
                        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>

                    {/* Conteúdo da sidebar */}


                    <div className="h-screen w-64 bg-gray-800 text-white">
                        <div className="h-screen w-64 bg-black text-white">
                            <button
                                data-drawer-target="separator-sidebar"
                                data-drawer-toggle="separator-sidebar"
                                aria-controls="separator-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>


                            <div className="h-full px-3 py-4 overflow-y-auto bg-black">
                                <ul className="space-y-2 font-medium">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 group active:border-yellow-500"
                                        >
                                            {/* Ícone de casa para "Início" */}
                                            <svg
                                                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 2L2 8h2v10h4v-6h4v6h4V8h2L10 2z" />
                                            </svg>
                                            <span className="ms-3">Inicio</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <svg
                                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 18 18"
                                            >
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">
                                                Jogos
                                            </span>

                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <svg
                                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">
                                                Live
                                            </span>

                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            {/* Ícone de tela para "Overlays" */}
                                            <svg
                                                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2h4v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">
                                                Overlays
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            {/* Ícone de engrenagem para "Configurações" */}
                                            <svg
                                                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 1a3 3 0 0 0-3 3v1.18a8.965 8.965 0 0 0-2.192 1.285l-.822-.822a3 3 0 0 0-4.242 4.243l.822.822A8.965 8.965 0 0 0 4.18 15H3a3 3 0 0 0 0 6h1.18a8.965 8.965 0 0 0 1.285 2.192l-.822.822a3 3 0 0 0 4.243 4.242l.822-.822A8.965 8.965 0 0 0 15 20.82V22a3 3 0 0 0 6 0v-1.18a8.965 8.965 0 0 0 2.192-1.285l.822.822a3 3 0 0 0 4.242-4.243l-.822-.822A8.965 8.965 0 0 0 20.82 15H22a3 3 0 0 0 0-6h-1.18a8.965 8.965 0 0 0-1.285-2.192l.822-.822a3 3 0 0 0-4.243-4.243l-.822.822A8.965 8.965 0 0 0 15 4.18V3a3 3 0 0 0-3-3zM12 6a6 6 0 1 1 0 12A6 6 0 0 1 12 6z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">
                                                Configurações
                                            </span>
                                        </a>
                                    </li>

                                </ul>

                                <div
                                    id="dropdown-cta"
                                    className="p-4 mt-6 rounded-3xl bg-[#363B4A] flex flex-col justify-center"
                                    role="alert"
                                >
                                    <div className="flex items-center mb-3 justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="fill-yellow-400 max-w-36"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8l240 0c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z" />
                                        </svg>
                                    </div>
                                    <h2 className="border-solid border-[#FFC90A] border-2 p-2 text-center uppercase rounded-3xl mb-5">
                                        premium
                                    </h2>
                                    <p className="mb-3 text-sm text-[#B1B1B1] dark:text-blue-400 text-center">
                                        Assine a versão PRO
                                    </p>
                                    <p className="mb-3 text-sm text-[#B1B1B1] dark:text-blue-400 text-center">
                                        Com 15% de desconto
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Outras opções do sidebar */}
                </div>
            </aside>
        </div>
    );
};
