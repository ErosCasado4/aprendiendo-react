import { useState } from "react"

const TURNS = { //pasamos variable turnos
  X: 'x',
  O: 'o'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  /*creamos el elemento cuadrado del tablero con las props asociadas,
  como el children ya estudiado anteriormente, isSelected y updateBoard como
  funciones añadidas para el funcionamiento posterior y el indice numerico.*/

  const handleClick = () => { //funcion que actualiza tablero en el momento que hacemos click, usando la funcion updateBoard
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

function App() {
  const [board, setBoard] = useState( 
    Array(9).fill(null))
  /*hemos creado el array del tablero con 9 posiciones y usaremos el hook useState
  para actualizar el estado pasando el parametro setBoard*/
    const [turn, setTurn] = useState(TURNS.X)
    // null es que no hay ganador, false es empate

    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {
      // revisamos todas las combos ganadoras
      //para ver el ganador
      for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
          boardToCheck[a] &&
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
      }
      //si no hay ganador
      return null
    }

    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
    }
    const updateBoard = (index) => {
      /* no actualizamos el tablero
      si ya tiene algo o hay ganador*/
      if(board[index] || winner) return
      //queremos que al actualizar el tablero recoja la info del array[board] y que se guarde en setBoard
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn) //asociamos nuevo turno
      //revisamos si hay ganador
      const newWinner = checkWinner(newBoard)
      if(newWinner) {
        setWinner(newWinner)
      } //Verificar quien ha ganado
    }

  return (
  <main className="board">
    <h1>Tic Tac Toe</h1>
    <section className="game">
      {
        board.map((_, index) => {
          return (//mapeamos el array y añadimos en cada cuadrado su Key, el indice y la funcion ejecutandose
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
              </Square>
          )
        })
      }
    </section>

    <section className="turn"> {/*para saber quien tiene el turno*/}
      <Square isSelected={turn === TURNS.X}>
      {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
      {TURNS.O}
      </Square>
    </section>

    {
      winner != null && (
        <section className="winnner">
          <div className="text">
            <h2>
              {
                winner === false
                ? 'Empate'
                : 'Ganó: '
              }
            </h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )
    }
  </main>  
  )
}

export default App
