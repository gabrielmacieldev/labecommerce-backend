// import { getAllPurchasesFromUserId, products, purchases, queryProductsByName, users } from "./database"
import cors from "cors"
import express, { Request, Response } from "express"
import { TUser, TProduct, TPurchase, TPurchases_products } from "./types"
import { db } from "./dataBase/knex"

console.log("Hello world!")

console.log("Usuário Cadastrado")
// console.table(users)

// console.log("Produtos Cadastrados")
// console.table(products)

// console.log("Purchases")
// console.table(purchases)

// console.table(queryProductsByName("plAca De víDeo"))
// console.table(queryProductsByName("FUBá"))
// console.table(getAllPurchasesFromUserId("a02"))
// console.table(getAllPurchasesFromUserId("a01"))

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('servidor rodando na porta 3003')
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong')
})

// Get All Users
// app.get('/users', (req: Request, res: Response) => {
//     res.status(200).send(users)
// })

app.get('/users', async (req: Request, res: Response) => {
    try {
        const getUsers = req.query.q as string | undefined

        if (getUsers === undefined) {
            const result = await db.raw(`SELECT * FROM users`)
            res.status(200).send(result)
        }
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Get All Products
// app.get('/products', (req: Request, res: Response) => {
//     res.status(200).send(products)
// })
app.get('/products', async (req: Request, res: Response) => {
    try {
        const getProducts = req.query.q as string | undefined

        if (getProducts === undefined) {
            const result = await db.raw(`SELECT * FROM products`)
            res.status(200).send(result)
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
app.get('/purchases', async (req: Request, res: Response) => {
    try {
        const getPurchases = req.query.q as string | undefined

        if (getPurchases === undefined) {
            const result = await db.raw(`SELECT * FROM purchases`)
            res.status(200).send(result)
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Search Product by name
// app.get('/product/search', (req: Request, res: Response) => {

//     const q = req.params.q

//     const result = products.find((product) => {
//         return product.name === q

//     })
//     res.status(200).send(result)
// })
app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string | undefined

        const result = await db.raw(`SELECT * FROM products WHERE name LIKE "%${name}%";`)

        if (!result) {
            res.status(404)
            throw new Error("Produto Inexistente");
        }
        if (name !== undefined) {
            if (name.length > 1) {
                res.status(200).send(result)
            } else {
                res.status(400)
                throw new Error("O 'nome' deve ter mais de 1 caracter");
            }
        }

    } catch (error: any) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
// Create User
// app.post('/users', (req: Request, res: Response) => {

//     const { id, email, password } = req.body as TUser

//     const newUser = {
//         id, email, password
//     }
//     users.push(newUser)

//     res.status(201).send('Cadastro realizado com sucesso')
// })
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id'deve ser uma string")
            }
            const [resultId]: TUser[] | undefined[] = await db('users').where({ id: id })

            if (resultId) {
                res.status(400)
                throw new Error("Id já existente");
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name'deve ser uma string")
            }
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'email'deve ser uma string")
            }
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new Error("Parâmetro 'email' inválido")
            }
            const [resultEmail]: TUser[] | undefined[] = await db('users').where({ email: email })

            if (resultEmail) {
                res.status(400)
                throw new Error("Email já existente");
            }
        }
        if (password !== undefined) {

            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'password'deve ser uma string")
            }
            // if (!password.match("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$")) {
            //     res.status(404)
            //     throw new Error(`Parâmetro 'senha' inválido: Use Mínimo de oito caracteres,
            //      uma letra maiúscula, uma letra minúscula, um número e um caractere especial.`);
            // }
        }
        const newUser: TUser = {
            id, name, email, password
        }
        await db('users').insert(newUser)
        res.status(201).send("Usuário Cadastrado")

    } catch (error: any) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Create Product
// app.post('/products', (req: Request, res: Response) => {

//     const { id, name, price, category } = req.body as TProduct

//     const newProduct = {
//         id, name, price, category
//     }
//     products.push(newProduct)

//     res.status(201).send('Produto cadastrado com sucesso')
// })
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string")
            }
            const [product]: TProduct[] | undefined[] = await db('products').where({ id: id })

            if (product) {
                res.status(400)
                throw new Error("Produto já existente");
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
        }
        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description' deve ser uma string")
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'number' deve ser um número")
            }
        }
        // const product = products.find((product) => product.id === id)
        const newProduct: TProduct = {
            id, name, price, description, image_url
        }
        await db('products').insert(newProduct)
        res.status(201).send('Cadastro realizado com sucesso')

    } catch (error: any) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Create Purchase
// app.post('/purchases', (req: Request, res: Response) => {

//     const { userId, productId, quantity, totalPrice } = req.body as TPurchase

//     const newPurchase = {
//         userId, productId, quantity, totalPrice
//     }
//     purchases.push(newPurchase)

//     res.status(201).send('Compra realizada com sucesso')
// })

// id do usuário que fez a compra deve existir no array de usuários cadastrados
// id do produto que foi comprado deve existir no array de produtos cadastrados
// a quantidade e o total da compra devem estar com o cálculo correto

app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const { id, buyer, total_price } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string")
            }
            const [userPurchase]: TPurchase[] | undefined[] = await db('purchases').where({ buyer: buyer })

            if (!userPurchase) {
                res.status(404).send({ error: "Compra impossibilitada, realize um cadastro" })
            }
            const [purchase]: TPurchase[] | undefined[] = await db('purchases').where({ id: id })

            if (purchase) {
                res.status(400)
                throw new Error("Não foi possível efetuar a compra: ID de compra já efetuado.")
            }
        }
        if (typeof buyer !== "string") {
            res.status(400)
            throw new Error("'Buyer' deve ser uma string")
        }
        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'total_price' deve ser uma number")
        }

        const newPurchase: TPurchase = {
            id, buyer, total_price
        }

        await db('purchases').insert(newPurchase)
        res.status(201).send({
            message: 'Compra realizada com sucesso',
            Purchases: newPurchase
        })

    } catch (error: any) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Get Products by id
// app.get('/products/:id', (req: Request, res: Response) => {

//     const id = req.params.id
//     const result = products.find((product) => {
//         return product.id === id
//     })
//     res.status(200).send(result)
// })
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [result]: TProduct[] | undefined[] = await db('products').where({ id: id })

        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send({ error: "Produto inexistente" })
        }
    } catch (error: any) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
app.get('/purchase/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [result]: TPurchase[] | undefined[] = await db('purchases').where({ id: id })

        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send({ error: "Compra inexistente" })
        }
    } catch (error: any) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// app.get('/products/:id', async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
//         const product = await db('products').where({ id }).select('id','name', 'price', 'description', 'image_url')

//         if (product.length > 0) {
//             res.status(200).send(product)
//         } else {
//             res.status(404).send({ error: "Produto inexistente" })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ error: "Erro interno do servidor" })
//     }
// })

// const result = products.find((product) => product.id === id)

// Get User Purchases by User id
// app.get('/users/purchases/:id', (req: Request, res: Response) => {

//     const id = req.params.id
//     const result = purchases.find((purchase) => {
//         return purchase.userId === id
//     })
//     res.status(200).send(result)
// })
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const buyer = req.params.id as string | undefined
        const result: TPurchase[] | undefined[] = await db('purchases').where({ buyer: buyer })

        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send({ error: "Produto inexistente" })
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
// const result = purchases.find((purchase) => purchase.userId === id)

// Delete User by id
// app.delete('/user/:id', (req: Request, res: Response) => {

//     const id = req.params.id as string

//     const userIndex = users.findIndex((user) => {
//         return user.id === id
//     })
//     console.log('Index', userIndex)
//     if (userIndex >= 0) {
//         users.splice(userIndex, 1)
//         res.status(200).send('User apagado com sucesso')
//     } else {
//         res.status(404).send('User not found')
//     }
// })
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [searchUserById]: TUser[] | undefined[] = await db('users').where({ id: idToDelete })

        if (!searchUserById) {
            res.status(404)
            throw new Error("'Id' não encontrado");
        }
        await db('users').del().where({ id: idToDelete })
        res.status(200).send({ message: "Usuário deletado com sucesso" })

        // const userIndex = users.findIndex((user) => user.id === id)
        // if (userIndex > -1) {
        //     users.splice(userIndex, 1)
        //     res.status(200).send('Usuário apagado com sucesso')
        // } else {
        //     res.status(404)
        //     throw new Error("Usuário inexistente");
        // }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Delete Product by id
// app.delete('/product/:id', (req: Request, res: Response) => {

//     const id = req.params.id as string

//     const productIndex = products.findIndex((product) => {
//         return product.id === id
//     })
//     console.log('Index', productIndex)
//     if (productIndex >= 0) {
//         users.splice(productIndex, 1)
//         res.status(200).send('Produto apagado com sucesso')
//     } else {
//         res.status(404).send('Products not found')
//     }
// })

app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        // const productIndex = products.findIndex((product) => product.id === id)

        const [searchProductsById]: TProduct[] | undefined[] = await db('products').where({ id: idToDelete })

        if (!searchProductsById) {
            res.status(404)
            throw new Error("'Produto' não encontrado");

        }
        await db('products').del().where({ id: idToDelete })
        res.status(200).send({ message: "Produto deletado com sucesso" })

        // if (productIndex >= 0) {
        //     products.splice(productIndex, 1)
        //     res.status(200).send('Produto apagado com sucesso')
        // } else {
        //     res.status(404)
        //     throw new Error("Produto inexistente")
        // }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [searchProductsById]: TPurchase[] | undefined[] = await db('purchases').where({ id: idToDelete })

        if (!searchProductsById) {
            res.status(404).send({ error: "Compra não encontrada" })
        }
        await db('purchases').del().where({ id: idToDelete })
        res.status(200).send({ message: "Compra deletada com sucesso" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Edit User by id
// app.put('/user/:id', (req: Request, res: Response) => {

//     const { id, email, password } = req.body as TUser | undefined

//     const response = req.params.id
//     const result = users.find((user) => {
//         return user.id === response
//     })
//     if (result) {
//         result.id = req.body.id || result.id
//         result.email = req.body.email || result.email
//         result.password = req.body.password || result.password
//         res.status(200).send('Cadastro atualizado com sucesso')
//     } else {
//         res.status(404).send('Not found')
//     }
// })

app.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const newId = req.body.id
        const newName = req.body.name
        const newEmail = req.body.email
        const newPassword = req.body.password
        const newCreatedAt = req.body.created_at
        const response = req.params.id

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string")
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
        }
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'email' deve ser uma string")
            }
        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'password' deve ser uma string")
            }
        }
        if (newCreatedAt !== undefined) {
            if (typeof newCreatedAt !== "string") {
                res.status(400)
                throw new Error("'created_at' deve ser uma string")
            }
        }

        const [result]: TUser[] | undefined[] = await db('users').where({ id: response })

        if (!result) {
            res.status(404)
            throw new Error("'Id' não encontrado");
        }

        const newUsers: TUser = {
            id: newId || result.id,
            name: newName || result.name,
            email: newEmail || result.email,
            password: newPassword || result.password
        }

        await db("users").update(newUsers).where({ id: response })
        res.status(200).send({
            message: "Cadastro Atualizado com sucesso",
            users: newUsers
        })

        // const result = users.find((user) => user.id === response)
    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
// Edit Product by id
// app.put('/product/:id', (req: Request, res: Response) => {

//     const { id, name, price, category } = req.body as TProduct | undefined

//     const response = req.params.id
//     const result = products.find((product) => {
//         return product.id === response
//     })
//     if (result) {
//         result.id = req.body.id || result.id
//         result.name = req.body.name || result.name
//         result.price = req.body.price || result.price
//         result.category = req.body.category || result.category
//         res.status(200).send('Edição feita com sucesso')

//     } else {
//         res.status(404).send('Not found')
//     }
// })
app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImage = req.body.image_url
        const response = req.params.id

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string")
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' deve ser number")
            }
        }
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'category' deve ser uma string")
            }
        }
        if (newImage !== undefined) {
            if (typeof newImage !== "string") {
                res.status(400)
                throw new Error("'category' deve ser uma string")
            }
        }
        const [result]: TProduct[] | undefined[] = await db('products').where({ id: response })

        if (!result) {
            res.status(404)
            throw new Error("'Produto' não encontrado");
        }

        const newProduct: TProduct = {
            id: newId || result.id,
            name: newName || result.name,
            price: newPrice || result.price,
            description: newDescription || result.description,
            image_url: newImage || result.image_url
        }

        await db("products").update(newProduct).where({ id: response })

        res.status(200).send({
            message: "Produto Editado com sucesso",
            Product: newProduct
        })

        // const result = products.find((product) => product.id === response)
    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})