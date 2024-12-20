import React from "react";
import logoImage from "../../imagens/image.png";
import GoogleIcon from "@mui/icons-material/Google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-[#161920] flex justify-center items-center h-screen overflow-y-hidden">
      <div className="lg:p-28 md:p-52 sm:p-20 p-6 w-full lg:w-1/2">
        <img src={logoImage} alt="Logo" />{" "}
        <form action="#" method="POST">
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-primary mb-2">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-primary mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
              autoComplete="off"
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="lembrarme"
                name="lembrarme"
                className="text-red-500"
              />
              <label htmlFor="lembrarme" className="text-primary ml-2">
                Lembrar Me
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className=" text-white mb-4">
              <Link to="/auth/forgot-password" className="hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          {/* Remember Me Checkbox */}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full border bg-[#363B4A] hover:bg-primary hover:text-black ease-in duration-300 border-primary rounded-3xl font-bold text-white text-lg py-2 px-3 focus:outline-none focus:border-primary"
          >
            Entrar
          </button>
        </form>
        <div className="mt-5 flex gap-3 justify-between">
          <a
            href="#"
            className="hover:bg-slate-700 ease-in duration-300 flex items-center justify-around gap-2 bg-[#363B4A] rounded-3xl px-2 py-2 w-32"
          >
            <GoogleIcon className="stroke-white fill-white" />
            <h2 className="text-white ">Google</h2>
          </a>
          <a
            href="#"
            className="hover:bg-slate-700 ease-in duration-300 flex items-center justify-around gap-2 bg-[#363B4A] rounded-3xl px-2 py-2 w-32 "
          >
            <FontAwesomeIcon icon={faTiktok} className="fill-white" />
            <h2 className="text-white ">Tik Tok</h2>
          </a>
        </div>
        {/* Sign up Link */}
        <div className="mt-6 text-white text-center">
          <Link to="/auth/register" className="hover:underline">
            Registre-se Aqui
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-screen bg-[#1c1f28] hidden lg:block">
        <div className="mt-40">
          <img src={logoImage} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
