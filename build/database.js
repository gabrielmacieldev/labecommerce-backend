"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
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
];
exports.products = [
    {
        id: 'p01',
        name: 'fubá',
        price: 10,
        category: types_1.CATEGORY.FOOD
    },
    {
        id: '01',
        name: 'placa de vídeo',
        price: 5.000,
        category: types_1.CATEGORY.COMPUTER
    }
];
exports.purchases = [
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
];
const createUser = (id, email, password) => {
    const newUser = {
        id: id,
        email: email,
        password: password
    };
    exports.users.push(newUser);
    return 'cadastro realizado com sucesso';
};
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
    return 'Produto criado com Sucesso';
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    return exports.products.filter((product) => {
        if (product.id.toLowerCase() === idToSearch.toLowerCase()) {
            return product;
        }
    });
};
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    return exports.products.filter((product) => {
        if (product.name.toLowerCase() === q.toLowerCase()) {
            return product;
        }
    });
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    };
    exports.purchases.push(newPurchase);
    return 'Compra realizada com sucesso';
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchases.filter((purchase) => {
        return purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase());
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map