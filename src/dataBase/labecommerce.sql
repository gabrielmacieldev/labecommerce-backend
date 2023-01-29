-- Active: 1673899046608@@127.0.0.1@3306

-- nome da tabela: users
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- email (TEXT, único e obrigatório)
-- password (TEXT e obrigatório)
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users(id, name, email, password)
VALUES 
('a01', 'Alfredinho', 'alfredinho@gmail.com', '123456'),
('a02', 'Xurupitas', 'farm@gmail.com', '654321'),
('a03', 'John Textor', 'johntextor@botafogo.com', 'boss2022'),
('a04', 'Gabriel', 'gabrielmacieldev@gmail.com', 'devlabenu'),
('a05', 'malvina', 'malvina@gmail.com', 'malvininha');

PRAGMA table_info ('users');
DROP TABLE users;

-- nome da tabela: products
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- name (TEXT e obrigatório)
-- price (REAL e obrigatório)
-- category (TEXT e obrigatório)

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);
INSERT INTO products (id, name, price, description, image_url)
VALUES
('b01', 'memória ram', 250, 'informática','http://lorempixel.com.br/500/400/?1'),
('b02', 'placa de vídeo', 5000, 'informática','http://lorempixel.com.br/500/400/?1'),
('b03', 'processador', 1000, 'informática','http://lorempixel.com.br/500/400/?1'),
('b04', 'water cooler', 350, 'informática','http://lorempixel.com.br/500/400/?1'),
('b05', 'placa mãe', 1000, 'informática','http://lorempixel.com.br/500/400/?1');


DROP TABLE products;
DROP TABLE purchases_products;

PRAGMA table_info ('products');

-- Get All Users
-- retorna todos os usuários cadastrados
SELECT * FROM users;
-- Get All Products
-- retorna todos os produtos cadastrados
SELECT * FROM products;
-- Search Product by name
-- mocke um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name = 'placa de vídeo';

-- Create User
-- mocke um novo usuário
-- insere o item mockado na tabela users
INSERT INTO users(id, email, password)
VALUES 
('a04', 'optimusprime@optimus.com', 'transformers');

-- Create Product
-- mocke um novo produto
-- insere o item mockado na tabela products

INSERT INTO products(id, name, price, category)
VALUES 
('b06', 'memória ram', 250, 'computer');

-- Get Products by id
-- mocke uma id
-- busca baseada no valor mockado
SELECT * FROM products
WHERE id = 'b06';

-- Delete User by id
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE FROM users
WHERE id = 'a01';

-- Delete Product by id
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE FROM products
WHERE id = 'b01';

-- Edit User by id
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados
UPDATE users SET email = 'xurupitasfarm@xurupitas.com'
WHERE id = 'a02';

-- Edit Product by id
-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados
UPDATE products SET price = '5000'
WHERE id = 'b02';
UPDATE products SET price = '1000'
WHERE id = 'b05';

-- Copie as queries do exercício 1 e refatore-as

-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * from products
ORDER BY price ASC
LIMIT 20;

-- Get All Products versão 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE price > 100 AND price < 1500
ORDER BY price ASC;

-- Criação da tabela de pedidos
-- nome da tabela: purchases
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- total_price (REAL, único e obrigatório)
-- paid (INTEGER e obrigatório)
-- delivered_at (TEXT e opcional)
-- buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME()),
    paid INTEGER DEFAULT (0) NOT NULL, 
    FOREIGN KEY (buyer) REFERENCES users (id)
);
DROP TABLE purchases;
INSERT INTO purchases (id, buyer, total_price)
VALUES
('c01', 'a01', 250),
('c02', 'a02', 350),
('c03', 'a03', 5000),
('c04', 'a04', 1000),
('c05', 'a05', 5000),
('c06', 'a02', 1000);

SELECT * FROM purchases;

PRAGMA table_info ('purchases');

UPDATE purchases SET total_price = '5000'
WHERE id = 'c02';

UPDATE purchases SET delivered_at = DATETIME('now')
WHERE id = 'c06'; 

SELECT * FROM users
INNER JOIN purchases
ON users.id = buyer_id
WHERE users.id = 'a03';

-- Criação da tabela de relações
-- nome da tabela: purchases_products
-- colunas da tabela:
-- purchase_id (TEXT e obrigatório, não deve ser único)
-- product_id (TEXT e obrigatório, não deve ser único)
-- quantity (INTEGER e obrigatório, não deve ser único)
-- Como essa lógica funciona?
-- Cada compra é registrada uma única vez na tabela purchases.
-- Cada produto da mesma compra é registrado uma única vez na tabela purchases_products.
-- Exemplo:

-- uma pessoa coloca 5 laranjas (p001) e 3 bananas (p002) no carrinho e confirma sua compra

-- a compra é registrada com id c001 na tabela purchases

-- a seguir, cada item do carrinho é registrado na tabela purchases_products
-- 5 laranjas são registradas na tabela purchases_products (c001, p001, 5)
-- 3 bananas são registradas na tabela purchases_products (c001, p002, 3)

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
);

DROP TABLE purchases_products;

INSERT INTO purchases_products (product_id, purchase_id, quantity) 
VALUES
('b01', 'c01',1),
('b04', 'c02',1),
('b02', 'c03',1);

SELECT
    products.name,
    purchases_products.product_id AS productId,
    purchases_products.purchase_id AS purchaseId,
    purchases_products.quantity,
    purchases.total_price
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id;  
 
SELECT
    products.name,
    purchases_products.product_id AS productId,
    purchases_products.purchase_id AS purchaseId,
    purchases_products.quantity,
    purchases.total_price
FROM purchases_products
RIGHT JOIN products
ON purchases_products.product_id = products.id
LEFT JOIN purchases
ON purchases_products.purchase_id = purchases.id;   






