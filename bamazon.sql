CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT, NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER(10) DEFAULT 0,
    PRIMARY KEY (item_id)
)

-- Seed data-values into 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
    ('Samsung TV', 'Electronics', '399.99', '1000'),
    ('Sanyo DVD', 'Electronics', '499.99', '5000'),

    ('KitchenAid Mixer', 'Appliances', '29.99', '200'),
    ('Sunbeam Can Opener', 'Appliances', '9.99', '300'),

    ('Kebo Futon', 'Furniture', '399.99', '50'),
    ('Costway Table', 'Furniture', '499.99', '20'),

    ('Levi Jeans', 'Clothing', '79.99', '10'),
    ('Converse Shoes', 'Clothing', '49.99', '12'),

    ('Matel Barbie', 'Toys', '29.99', '10000'),
    ('Hasbro Truck','Toys','19.99','20000');