DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (6, 2),
  stock_quantity INT NOT NULL DEFAULT '1',
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  total_sales DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (department_id)
);
Select * From departments;

ALTER TABLE products ADD COLUMN product_sales DECIMAL(7,2) DEFAULT '0.00';

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("1", "Ticket to Ride", "Board Games", "29.95", "87");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("2", "Sentinels of the Multiverse", "Board Games", "39.99", "43");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("3", "Vitamix Blender", "Small Appliances", "269.99", "28");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("4", "Convection Toaster Oven Air Fryer", "Small Appliances", "149.95", "54");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("5", "KitchenAid Stand Mixer", "Small Appliance", "199.99", "34");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("6", "Beard Oil", "Health and Beauty", "12.95", "112");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("7", "Glasses Cleaner", "Health and Beauty", "4.99", "90");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("8", "Mini Drone Quadcopter", "Small Electronics", "524.99", "69");
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("9", "1080p Home Theater Projector", "Small Electronics", "619.95", "12");

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES("10", "Oculus Quest Virtual Reality Headset", "Electronics", "399.95", "75");


