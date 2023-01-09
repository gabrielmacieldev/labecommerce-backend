"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
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
        category: 'alimentação'
    },
    {
        id: '01',
        name: 'placa de vídeo',
        price: 5.000,
        category: 'computação'
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
//# sourceMappingURL=database.js.map