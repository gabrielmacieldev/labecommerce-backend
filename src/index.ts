import { getAllPurchasesFromUserId, products, purchases, queryProductsByName, users } from "./database"
import cors from "cors"
import express, { Request, Response } from "express"
import { TProduct, TPurchase, TUser } from "./types"

console.log("Hello world!")

console.log("Usuário Cadastrado")
console.table(users)

console.log("Produtos Cadastrados")
console.table(products)

console.log("Purchases")
console.table(purchases)

console.table(queryProductsByName("plAca De víDeo"))
console.table(queryProductsByName("FUBá"))
console.table(getAllPurchasesFromUserId("a02"))
console.table(getAllPurchasesFromUserId("a01"))

const app = express()
app.use(express.json())
app.use(cors())

app.listen(8080, () => {
    console.log('servidor rodando na porta 8080')
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong')
})

// Get All Users
// method HTTP (GET)
// path ("/users")
// response
// status 200
// array de users do database.ts

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

// Get All Products
// method HTTP (GET)
// path ("/products")
// response
// status 200
// array de products do database.ts

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

// Search Product by name
// method HTTP (GET)
// path ("/product/search")
// query params
// q
// response
// status 200
// array do resultado da busca

app.get('/product/search', (req: Request, res: Response) => {

    const q = req.params.q

    const result = products.find((product) => {
        return product.name === q

    })
    res.status(200).send(result)
})

// Create User
// method HTTP (POST)
// path ("/users")
// body
// id
// email
// password
// response
// status 201
// "Cadastro realizado com sucesso"

app.post('/users', (req: Request, res: Response) => {

    const { id, email, password } = req.body as TUser

    const newUser = {
        id, email, password
    }
    users.push(newUser)

    res.status(201).send('Cadastro realizado com sucesso')
})

// Create Product
// method HTTP (POST)
// path ("/products")
// body
// id
// name
// price
// category
// response
// status 201
// "Produto cadastrado com sucesso"

app.post('/products', (req: Request, res: Response) => {

    const { id, name, price, category } = req.body as TProduct

    const newProduct = {
        id, name, price, category
    }
    products.push(newProduct)

    res.status(201).send('Produto cadastrado com sucesso')
})

// Create Purchase
// method HTTP (POST)
// path ("/purchases")
// body
// userId
// productId
// quantity
// totalPrice
// response
// status 201
// "Compra realizada com sucesso"

app.post('/purchases', (req: Request, res: Response) => {

    const { userId, productId, quantity, totalPrice } = req.body as TPurchase

    const newPurchase = {
        userId, productId, quantity, totalPrice
    }
    purchases.push(newPurchase)

    res.status(201).send('Compra realizada com sucesso')
})

// Get Products by id
// method HTTP (GET)
// path ("/products/:id")
// response
// status 200
// objeto product encontrado

app.get('/products/:id', (req: Request, res: Response) => {

    const id = req.params.id
    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
})

// Get User Purchases by User id
// method HTTP (GET)
// path ("/users/:id/purchases")
// response
// status 200
// array de compras do user procurado

app.get('/users/purchases/:id', (req: Request, res: Response) => {

    const id = req.params.id
    const result = purchases.find((purchase) => {
        return purchase.userId === id
    })
    res.status(200).send(result)
})

// Delete User by id
// method HTTP (DELETE)
// path ("/user/:id")
// response
// status 200
// "User apagado com sucesso"

app.delete('/user/:id', (req: Request, res: Response) => {

    const id = req.params.id as string

    const userIndex = users.findIndex((user) => {
        return user.id === id
    })
    console.log('Index', userIndex)
    if (userIndex >= 0) {
        users.splice(userIndex, 1)
        res.status(200).send('User apagado com sucesso')
    } else {
        res.status(404).send('User not found')
    }
})

// Delete Product by id
// method HTTP (DELETE)
// path ("/product/:id")
// response
// status 200
// "Produto apagado com sucesso"

app.delete('/product/:id', (req: Request, res: Response) => {

    const id = req.params.id as string

    const productIndex = products.findIndex((product) => {
        return product.id === id
    })
    console.log('Index', productIndex)
    if (productIndex >= 0) {
        users.splice(productIndex, 1)
        res.status(200).send('Produto apagado com sucesso')
    } else {
        res.status(404).send('Products not found')
    }
})

// Edit User by id
// method HTTP (PUT)
// path ("/user/:id")
// body
// email (parâmetro opcional)
// password (parâmetro opcional)
// response
// status 200
// "Cadastro atualizado com sucesso"

app.put('/user/:id', (req: Request, res: Response) => {

    const { id, email, password } = req.body as TUser | undefined

    const response = req.params.id
    const result = users.find((user) => {
        return user.id === response
    })
    if (result) {
        result.id = req.body.id || result.id
        result.email = req.body.email || result.email
        result.password = req.body.password || result.password
        res.status(200).send('Edição feita com sucesso')
    } else {
        res.status(404).send('Not found')
    }
})

// Edit Product by id
// method HTTP (PUT)
// path ("/product/:id")
// body
// name (parâmetro opcional)
// price (parâmetro opcional)
// category (parâmetro opcional)
// response
// status 200
// "Produto atualizado com sucesso"

app.put('/product/:id', (req: Request, res: Response) => {

    const { id, name, price, category } = req.body as TProduct | undefined

    const response = req.params.id
    const result = products.find((product) => {
        return product.id === response
    })
    if (result) {
        result.id = req.body.id || result.id
        result.name = req.body.name || result.name
        result.price = req.body.price || result.price
        result.category = req.body.category || result.category
        res.status(200).send('Edição feita com sucesso')

    } else {
        res.status(404).send('Not found')
    }
})
