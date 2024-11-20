import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [livros, setLivros] = useState([]);
  const [livro, setLivro] = useState("");
  const [date, setDate] = useState("");

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
          Adicionar Livro
        </button>
      </div>

      <div className="card-container">
        {livros.map((item, index) => (
          <div key={index} className="card">
            <h2 className="card-title">{item.livro}</h2>
            <p className="card-date">Ano de lançamento: {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
