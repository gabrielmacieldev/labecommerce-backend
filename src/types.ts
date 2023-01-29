export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
}
export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}
export type TPurchase = {
    id: string,
    buyer: string,
    total_price: number
}
export type TPurchases_products = {
    purchase_id: string,
    product_id: string,
    quantity: number
}
export enum CATEGORY {

    ACCESSORIES = 'acessórios',
    COMPUTER = 'Informática',
    FOOD = 'alimentação'
}
