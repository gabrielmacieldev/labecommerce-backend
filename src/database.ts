// Exercício 3
// Com as tipagens desenvolvidas, agora podemos criar alguns dados mock (de mentirinha, mas verdadeiramente estruturados).

// crie o arquivo database.ts dentro da pasta src
// iremos criar um array para cada entidade e exportá-los

// user
// no database.ts, crie e exporte a constante users e tipe-a como um array do type respectivo criado no exercício 2
// lembre-se de referenciar o material assíncrono
// crie pelo menos 2 objetos nesse array

// product
// no database.ts, crie e exporte a constante products e tipe-a como um array do type respectivo criado no exercício 2
// lembre-se de referenciar o material assíncrono
// crie pelo menos 2 objetos nesse array

// purchase
// no database.ts, crie e exporte a constante purchases e tipe-a como um array do type respectivo criado no exercício 2
// lembre-se de referenciar o material assíncrono
// crie pelo menos 2 objetos nesse array
// garanta que o userId preenchido exista na constante users
// garanta que o productId preenchido exista na constante products
// garanta que o cálculo do totalPrice esteja de acordo com a quantity da compra
// Para finalizar
// Vá para o index.ts e importe as constantes users, products e purchases. Coloque um console.log para cada e rode a aplicação com o script de start para ver se deu tudo certo!

import { TProduct, TPurchase, TUser } from "./types"

export const users: TUser[] = [
    {
        id: 'a01',
        email: 'alfredinho@alfredinho.com',
        password: '123456'
    },
    {
        id: 'a02',
        email: 'xurupitas@xurupitas.com',
        password: '654321'
    }
]
export const products: TProduct[] = [
    {
        id: 'p01',
        name: 'fubá',
        price: 10,
        category: 'alimentação'
    },
    {
        id: '01' ,
        name: 'placa de vídeo',
        price: 5.000,
        category: 'computação'
    }
]
export const purchases: TPurchase[] = [
    {
        userId: 'a01',
        productId: 'p01',
        quantity: 5,
        totalPrice: 50
    },
    {
        userId: 'a02',
        productId: '01',
        quantity: 1,
        totalPrice: 5.000
    }
]