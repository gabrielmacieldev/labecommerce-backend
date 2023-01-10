import { CATEGORY, TProduct, TPurchase, TUser } from "./types"

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
        category: CATEGORY.FOOD
    },
    {
        id: '01',
        name: 'placa de vídeo',
        price: 5.000,
        category: CATEGORY.COMPUTER
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

export const createUser = (id: string, email: string, password: string): string => {
    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }

    users.push(newUser)
    return 'cadastro realizado com sucesso'

}

// getAllUsers (busca todas as pessoas da lista de users)
// input: nenhum
// output: lista atualizada de users
// exemplo de chamada: getAllUsers()

export function getAllUsers(): TUser[] {
    return users
}

// Product
// createProduct (cria um novo produto na lista de products)
// input: quatro parâmetros (id, name, price e category)
// output: frase de sucesso ("Produto criado com sucesso")
// exemplo de chamada: createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS)

export const createProduct = (id: string, name: string, price: number, category: string): string => {
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)
    return 'Produto criado com Sucesso'
}

// getAllProducts (busca todos os produtos da lista de products)
// input: nenhum
// output: lista atualizada de products
// exemplo de chamada: getAllProducts()

export const getAllProducts = (): TProduct[] => {
    return products
}
// getProductById (busca por produtos baseado em um id da lista de products)
// input: um parâmetro (idToSearch)
// output: o produto encontrado ou undefined
// exemplo de chamada: getProductById("p004")

export const getProductById = (idToSearch: string): TProduct[] | undefined => {
    return products.filter((product) => {
        if (product.id.toLowerCase() === idToSearch.toLowerCase()) {
            return product
        }
    })
}

// Product
// queryProductsByName (busca por produtos baseado em um nome da lista de products)
// input: um parâmetro (q)
// q é a abreviação de query (termo de busca/consulta)
// output: lista de produtos com nomes que contenham o termo de busca
// extra: o resultado da busca deve ser case insensitive
// exemplo de chamada: queryProductsByName("monitor")

export const queryProductsByName = (q: string): TProduct[] | undefined => {
    return products.filter((product) => {
        if (product.name.toLowerCase() === q.toLowerCase()) {
            return product
        }
    })
}

// Purchase
// createPurchase (cria uma nova compra na lista de purchases)
// input: quatro parâmetros (userId, productId, quantity e totalPrice)
// output: frase de sucesso ("Compra realizada com sucesso")
// exemplo de chamada: createPurchase("u003", "p004", 2, 1600)

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number): string => {
    const newPurchase: TPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }
    purchases.push(newPurchase)
    return 'Compra realizada com sucesso'
}

// getAllPurchasesFromUserId (busca todas as compras feitas baseado no id do usuário)
// input: userIdToSearch
// output: lista atualizada de compras nas quais o userId delas são do userIdToSearch
// exemplo de chamada: getAllPurchasesFromUserId("u003")

export const getAllPurchasesFromUserId = (userIdToSearch: string) => {
    return purchases.filter((purchase) => {
        return purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase())
    })
} 
