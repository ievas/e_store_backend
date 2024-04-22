const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/store_db"
);
let uuid = require("uuid");
let bcrypt = require("bcrypt");

let createTables = async () => {
  const SQL = `
    CREATE TABLE users (
        id UUID PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255)
    );
    
    CREATE TABLE items (
        id UUID PRIMARY KEY,
        name VARCHAR(255),
        price DECIMAL(10, 2),
        description TEXT
    );
    
    CREATE TABLE carts (
        id UUID PRIMARY KEY,
        user_id UUID,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE TABLE cart_items (
        cart_id UUID,
        item_id UUID,
        quantity INTEGER,
        FOREIGN KEY (cart_id) REFERENCES carts(id),
        FOREIGN KEY (item_id) REFERENCES items(id),
        PRIMARY KEY (cart_id, item_id)
        );
      `;
  await client.query(SQL);
};

module.exports = {
  client,
  createTables,
};
