import { useState } from "react";

function App() {
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!cep) {
      alert("Informe um CEP para continuar!");
      return;
    }
    if (cep.length !== 8) {
      alert("CEP deve ter apenas números!");
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.error) {
        alert("CEP não encontrado");
        return;
      }
      setUf(data.uf || "UF não informada");
      setEstado(data.estado || "Estado não informado");
      setCidade(data.localidade || "Localidade não informada");
      setBairro(data.bairro || "Bairro não informado");
      setRua(data.logradouro || "Rua não informada");

      // cria uma objeto de localização
      const dados = {
        Estado: data.estado || "Estado não informado",
        Cidade: data.localidade || "Localidade não informada",
        Bairro: data.bairro || "Bairro não informado",
        Rua: data.logradouro || "Rua não informada",
      };
      // mostra os dados no console
      console.table(dados);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <form
          onSubmit={handleFormSubmit}
          className="border p-2 rounded-2xl flex flex-col gap-2"
        >
          {/* CEP */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">CEP:</label>
            <input
              type="text"
              placeholder="Digite apenas números"
              className="border rounded-2xl p-2"
              value={cep}
              onChange={(e) => {
                setCep(e.target.value);
              }}
            />
          </div>
          {/* UF */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">UF:</label>
            <input type="text" className="border rounded-2xl p-2" value={uf} />
          </div>
          {/* Estado */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">Estado:</label>
            <input
              type="text"
              className="border rounded-2xl p-2"
              value={estado}
            />
          </div>
          {/* Cidade */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">Cidade:</label>
            <input
              type="text"
              className="border rounded-2xl p-2"
              value={cidade}
            />
          </div>
          {/* Bairro */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">Bairro:</label>
            <input
              type="text"
              className="border rounded-2xl p-2"
              value={bairro}
            />
          </div>
          {/* Rua */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">Rua:</label>
            <input type="text" className="border rounded-2xl p-2" value={rua} />
          </div>
          <button
            type="submit"
            className="border rounded-2xl p-2 bg-blue-400 font-bold text-2xl "
          >
            Buscar
          </button>
        </form>
      </section>
    </>
  );
}

export default App;
