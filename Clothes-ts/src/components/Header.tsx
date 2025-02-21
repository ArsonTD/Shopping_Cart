import { useMemo, Dispatch } from "react";
import type { CartItem } from "../types";
import type { CartActions } from "../reducers/cart-reducer";

type HeaderProps = {
    cart: CartItem[]
    dispatch: Dispatch<CartActions>
}

export default function Header({ 
        cart,
        dispatch,
    } : HeaderProps ) {

         //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * 
    item.price), 0), [cart] )

    return (
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
            {/* Logo de la página */}
            <div className="col-8 col-md-3">
                <a href="index.html">
                <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" />
                </a>
            </div>

            {/* Menú de navegación */}
            <nav className="col-md-6 mt-5 d-flex align-items-start justify-content-end">
                <div className="carrito">
                {/* Icono del carrito */}
                <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                {/* Contenido del carrito */}
                <div id="carrito" className="bg-white p-3">
                    {/* Si el carrito está vacío, muestra un mensaje */}
                    {isEmpty ? (
                    <p className="text-center">El carrito está vacío</p>
                    ) : (
                    <>
                        {/* Tabla con los productos del carrito */}
                        <table className="w-100 table">
                        <thead>
                            <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(clothes => (
                            <tr key={clothes.id}>
                                {/* Imagen del producto */}
                                <td>
                                <img
                                    className="img-fluid"
                                    src={`/img/${clothes.image}.jpg`}
                                    alt="imagen guitarra"
                                />
                                </td>
                                {/* Nombre del producto */}
                                <td>{clothes.name}</td>
                                {/* Precio unitario del producto */}
                                <td className="fw-bold">${clothes.price}</td>
                                {/* Controles para modificar la cantidad */}
                                <td className="flex align-items-start gap-4">
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={() => dispatch({type: 'DECREASE_QUANTITY',
                                        payload: {id: clothes.id}})}
                                >
                                    -
                                </button>
                                {clothes.quantity}
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={() => dispatch({type: 'INCREASE_QUANTITY',
                                        payload: {id: clothes.id}})}
                                >
                                    +
                                </button>
                                </td>
                                {/* Botón para eliminar un producto */}
                                <td>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => dispatch({type: 'REMOVE_FROM_CART', 
                                        payload: {id: clothes.id}})}
                                >
                                    X
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>

                        {/* Total a pagar */}
                        <p className="text-end">
                        Total a pagar: <span className="fw-bold">${cartTotal}</span>
                        </p>

                        {/* Botón para vaciar el carrito */}
                        <button
                        className="btn btn-dark w-100 mt-3 p-2"
                        onClick={() => dispatch({type: 'CLEAR_CART'})}
                        >
                        Vaciar Carrito
                        </button>
                    </>
                    )}
                </div>
                </div>
            </nav>
            </div>
        </div>
        </header>
    );
    }


