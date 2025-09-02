import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

    //pointer move
  useEffect(() => {
    console.log('efecto', { enabled })
      
      const handleMove = (event) => {
        const { clientX, clientY } = event
        console.log('handleMove', {clientX, clientY })
        setPosition({ x: clientX,y: clientY})
      }
      if (enabled) {
      window.addEventListener('pointermove', handleMove)
      }

      /*limpiamos efectos
      cuando el componente es desmontado, cuando cambian dependencias antes de ejecutar
      el efecto nuevamente*/
      return () => {
        console.log('cleanup')
        window.removeEventListener('pointermove', handleMove)
      }

  } , [enabled])

  //change body className
  useEffect(() => {
     document.body.classList.toggle('no-cursor', enabled)

     return () => {
      document.body.classList.remove('no-cursor')
     }
  },[enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor:'rgba(0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
  <button onClick={()=> setEnabled(!enabled)}>
    {enabled ? 'Desactivar' : 'Activar'} Seguir puntero
    </button>
      </>
    )
}

function App() {

  return (
    <main>
     <FollowMouse />
    </main>
  )

}

export default App

