import { db } from "../data/db"
import { CartItem, Clothes } from "../types"


export type CartActions = 
    { type: 'ADD_TO_CART', payload: {item: Clothes} } |
    { type: 'REMOVE_FROM_CART', payload: {id: Clothes['id']} } |
    { type: 'DECREASE_QUANTITY', payload: {id: Clothes['id']} } |
    { type: 'INCREASE_QUANTITY', payload: {id: Clothes['id']} } |
    { type: 'CLEAR_CART' }


    //Types de acciones 

    export type CartState = {
        data: Clothes[]
        cart: CartItem[]
    }

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : [] 
    }



    export const initialState: CartState = {
        data: db,
        cart: initialCart()
    }


    const MINI_ITEMS = 1
    const MAX_ITEMS = 5

    export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
        ) => {

            if(action.type === "ADD_TO_CART") {
                const itemExists = state.cart.find(clothes => clothes.id === action.payload.item.id) 
                let updateCart : CartItem[] = [] 
                if(itemExists) { // Si el producto ya está en el carrito
                    updateCart = state.cart.map(item => {
                        if(item.id === action.payload.item.id) {
                        if(item.quantity < MAX_ITEMS) {
                            return {...item, quantity: item.quantity + 1} 
                        } else {
                            return item
                        }
                    } else {
                            return item
                        }
                    })

                } else { 
                    const newItem : CartItem = {...action.payload.item, quantity: 1} 
                    updateCart = [...state.cart, newItem] 
                }

                    return {
                        ...state,
                        cart: updateCart
                    }
                }

                if(action.type === "REMOVE_FROM_CART") {
                    const cart= state.cart.filter(clothes => clothes.id !== action.payload.id) 
                    return {
                        ...state,
                        cart
                    }
                }

                if(action.type === "DECREASE_QUANTITY") {
                        const cart = state.cart.map(item => {
                        if(item.id === action.payload.id && item.quantity > MINI_ITEMS) { 
                            return {
                            ...item,
                            quantity: item.quantity - 1
                            }
                        }
                        return item
                        })
                    return {
                        ...state,
                        cart
                    }
                }

                if(action.type === "INCREASE_QUANTITY") {
                        const cart = state.cart.map(item => {
                        if(item.id === action.payload.id && item.quantity < MAX_ITEMS) { // Solo aumenta si la cantidad es menor al máximo permitido
                            return {
                            ...item,
                            quantity: item.quantity + 1
                            }
                        }
                        return item
                        })
                    
                    return {
                        ...state,
                        cart
                    }
                }

                if(action.type === "CLEAR_CART") {
                    return {
                        ...state,
                        cart: []
                    }
                }

                return state
            }