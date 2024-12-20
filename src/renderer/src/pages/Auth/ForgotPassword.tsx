import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className="bg-[#161920] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-[#1c1f28] rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-primary dark:text-white">
          Mudar Senha
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-primary"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="seuemail@.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-primary"
            >
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Nova senha"
                className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-primary"
            >
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirme a senha"
                className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-primary hover:text-zinc-800 hover:-translate-y-2 hover:scale-100 duration-200 transition ease-in-out delay-150 text-white font-medium rounded-3xl py-2 px-4 text-center focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Resetar Senha
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
