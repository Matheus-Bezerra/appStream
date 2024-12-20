import React from "react";

const Register = () => {
  return (
    <div className="mx-auto max-w-[532px] mt-10 bg-[#161920] rounded-md shadow-lg drop-shadow-md">
      <div className="px-4 py-3 flex justify-center items-center">
        <div>
          <h2 className="font-bold text-xl text-primary text-center">Cadastre-se</h2>
        </div>
        
      </div>
      <hr className="bg-primary" />
      <div className="px-4 pt-3 pb-6 space-y-3">
        <div className="space-x-3 flex">
          <input
            type="text"
            id="first-name"
            placeholder="Nome"
            className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 mt-4 px-3 focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            id="surname"
            placeholder="Sobre Nome"
            className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 mt-4 px-3 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <input
            type="email"
            id="contact-info"
            placeholder="E-mail"
            className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 mt-4 px-3 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-3xl font-bold py-2 mt-4 px-3 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="birthdate" className="text-white">
            Data de Nascimento <a href="#" className="text-primary">(?)</a>
          </label>
          <div className="mt-1 flex space-x-3">
            <select
              id="day"
              name="day"
              className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
            >
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              id="month"
              name="month"
              className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
            >
              {[
                 "Janeiro",
                 "Fevereiro",
                 "Março",
                 "Abril",
                 "Maio",
                 "Junho",
                 "Julho",
                 "Agosto",
                 "Setembro",
                 "Outubro",
                 "Novembro",
                 "Dezembro",
              ].map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              id="year"
              name="year"
              className="w-full border bg-[#363B4A] text-white border-zinc-800 rounded-xl font-bold py-2 px-3 focus:outline-none focus:border-primary"
            >
              {Array.from({ length: 34 }, (_, i) => 1990 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="gender" className="text-white">
            Gênero <a href="#" className="text-primary">(?)</a>
          </label>
          <div className="mt-1 flex space-x-3">
            {["Feminino", "Masculino", "Outro"].map((gender) => (
              <label
                key={gender}
                className="flex-1 flex justify-between items-center rounded-md px-2 py-1 border border-gray-400"
              >
                <span className="text-white">{gender}</span>
                <input type="radio" name="gender" value={gender} />
              </label>
            ))}
          </div>
        </div>
        <div>
          
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-black font-bold px-16 py-2 mt-7 rounded-3xl transition-all duration-100 hover:bg-zinc-600 hover:text-white focus:outline-none "
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
