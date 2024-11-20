import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [livros, setLivros] = useState([0]);
  const [livro, setLivro] = useState("");
  const [date, setDate] = useState(0);

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/livros/");
      const data = await response.json();
      setLivros(data);
    }catch(err){
      console.log(err);
    }
  };

  const addLivro = async () => {
    const livroData = {
      livro,
      date,
    };
    try{
      
    const response = await fetch("http://127.0.0.1:8000/api/livros/create", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroData),
    });
    const data = await response.json()
    setLivro((prev) => [...prev, data]);
      }catch(err){
        console.log(err);
      }
 };

  return (
    <>
      <h1>Sites de Livros</h1>
      <div>
        <input 
          type="text" 
          placeholder='titulo do livro...' 
          onClick={(e)=> setLivro(e.target.value)}
          />
        <input 
          type="number" 
          placeholder='Data de lançamento...'
          onClick={(e)=> setDate(e.target.value)}
        />
        <button onClick={addLivro}>adicione o livro</button>
      </div>
       {livros.map((livros) => (
        <div>
          <p>Livro: {livros.livro} </p>
          <p>Ano de lançamento: {livros.date} </p>
        </div>
       ))}
    </>
  );
}

export default App
