
-- Create a database called 'Bamazon' --
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table called 'products' which contains the store inventory --
CREATE TABLE products (
CREATE TABLE products(
  item_id INTEGER(13) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(13) NOT NULL,
  PRIMARY KEY (item_id)
);



-- Insert mock data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Shampoo', 'Cosmetics', 4.75, 500),
    ('Conditioner', 'Cosmetics', 5.25, 627),
    ('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 300),
    ('Brawny Paper Towels', 'Grocery', 4.25, 400),
    ('Granny Smith Apples', 'Produce', 0.35, 800),
    ('Chiquita Bannana', 'Produce', 0.20, 10000),
    ('5lb Dumb bell', 'Sports', 7.99, 89),
    ('Tie Dye Shirt', 'Clothing', 5.55, 120),
    ('Nike Shorts', 'Clothing', 17.88, 250),
    ('Ben & Jerry Ice Cream', 'Grocery', 3.25, 432);

SELECT * FROM products;