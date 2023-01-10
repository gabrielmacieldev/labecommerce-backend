"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(8080, () => {
    console.log('servidor rodando na porta 8080');
});
app.get('/ping', (req, res) => {
    res.send('pong');
});
//# sourceMappingURL=index.js.map