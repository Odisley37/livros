import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Sites de Livros</h1>
      <div>
        <input type="text" placeholder='titulo do livro...'/>
        <input type="number" placeholder='Data de lançamento...'/>
        <button>adicione o livro</button>
      </div>
    </>
  )
}

export default App
