export const Square = ({children, isSelected, updateBoard, index}) => {
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