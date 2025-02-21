import { Dispatch } from 'react'
import { CartActions } from '../reducers/cart-reducer';
import type { Clothes} from '../types/index'


//type Separado:

type ClothesProps = {
    clothes : Clothes,
    dispatch: Dispatch<CartActions>

}

    export default function Clothes({ clothes, dispatch} : ClothesProps) { 
        
        const { name, image, description, price } = clothes
    
        return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            {/* Imagen del producto */}
            <div className="col-4">
            <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
    
            {/* Información del producto */}
            <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
            <p>{description}</p>
            <p className="fw-black text-primary fs-3">${price}</p>
            <button 
                type="button"
                className="btn btn-dark w-100"
                onClick={() => dispatch({type: 'ADD_TO_CART', payload: {item: clothes}})} // Llama a la función `addToCart`
            >
                Agregar al Carrito
            </button>
            </div>
        </div>
        );
    }
    