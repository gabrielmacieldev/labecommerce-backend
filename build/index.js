"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log("Hello world!");
console.log("Usuário Cadastrado");
console.table(database_1.users);
console.log("Produtos Cadastrados");
console.table(database_1.products);
console.log("Purchases");
console.table(database_1.purchases);
console.table((0, database_1.queryProductsByName)("plAca De víDeo"));
console.table((0, database_1.queryProductsByName)("FUBá"));
console.table((0, database_1.getAllPurchasesFromUserId)("a02"));
console.table((0, database_1.getAllPurchasesFromUserId)("a01"));
//# sourceMappingURL=index.js.map