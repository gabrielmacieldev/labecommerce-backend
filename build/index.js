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
//# sourceMappingURL=index.js.map