import { useState, useEffect } from "react";
import "./App.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

function App() {
  const [livros, setLivros] = useState([]);
  const [livro, setLivro] = useState("");
  const [date, setDate] = useState("");
  const [novoTitulo, setNovoTitulo] = useState("");

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/livros/");
      const data = await response.json();
      setLivros(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addLivro = async () => {
    const livroData = {
      livro,
      date,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/livros/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroData),
      });

      const data = await response.json();
      setLivros((prevLivros) => [...prevLivros, data]);
      setLivro("");
      setDate("");
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk, currentDate) => {
    if (novoTitulo.trim() === "") {
      alert("O título não pode ser vazio!");
      return; // Não envia a requisição se o título estiver vazio
    }

    const livroData = {
      livro: novoTitulo,
      date: currentDate,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/livros/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroData),
      });

      const data = await response.json();
      setLivros((prevLivros) =>
        prevLivros.map((livro) => {
          if (livro.id === pk) {
            return data;
          } else {
            return livro;
          }
        })
      );
      setNovoTitulo(""); // Limpar campo após atualização
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLivro = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/livros/${pk}`, {
        method: "DELETE",
      });

      setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Biblioteca de Livros</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Título do livro..."
          value={livro}
          onChange={(e) => setLivro(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Ano de lançamento..."
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field"
        />
        <button onClick={addLivro} className="button">
          <FaPlus /> Adicionar Livro
        </button>
      </div>

      <div className="card-container">
        {livros.map((item) => (
          <div key={item.id} className="card">
            <div className="card-title">{item.livro}</div>
            <div className="card-date">{item.date}</div>

            {/* Campo de Novo Título */}
            <input
              type="text"
              value={novoTitulo === "" ? "" : novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              className="fieldBox"
              placeholder="Novo título"
            />

            <div className="card-buttons">
              <button className="edit" onClick={() => updateTitle(item.id, item.date)}>
                <FaEdit /> Editar
              </button>
              <button className="delete" onClick={() => deleteLivro(item.id)}>
                <FaTrashAlt /> Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

