import { getAllPurchasesFromUserId, products, purchases, queryProductsByName, users } from "./database"

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


