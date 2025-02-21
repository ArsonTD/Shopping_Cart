import { useReducer, useEffect } from "react"
import Header from "./components/Header"
import Clothes from "./components/Clothes"
import { cartReducer, initialState } from "./reducers/cart-reducer"


function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <>
      {/* Cabecera que recibe información del carrito y funciones para manejarlo */}
      <Header 
        cart={state.cart}
        dispatch={dispatch}
      />

      {/* Contenido principal: muestra la colección de productos */}
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((clothes) => ( // Recorre la lista de productos y crea un componente para cada uno
            <Clothes
              key={clothes.id}
              clothes={clothes}
              dispatch={dispatch}
            />
          ))}
        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">Arson - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App;