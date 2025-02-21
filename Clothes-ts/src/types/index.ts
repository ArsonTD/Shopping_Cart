export type  Clothes = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export  type CartItem = Clothes & {
    quantity: number
}


// export type ClothesID = Clothes['id'| 'name']

// export  type CartItem = Pick<Clothes. 'id'| 'name' | 'price' | > &{
//     quantity: number
// }

// export type CartItem = Omit<Clothes, 'id' | 'name' | 'price' | > & {
//     quantity: number
// }