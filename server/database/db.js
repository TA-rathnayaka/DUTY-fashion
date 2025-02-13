import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.POSTGRES_PASSWORD}@${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}/${process.env.PGDATABASE}`;

const db = new pg.Client(connectionString);

db.connect();

// const createTables = async () => {
//   try {
//     await db.connect();

//     const queries = [
//       `CREATE TABLE IF NOT EXISTS user_table (
//         user_id SERIAL PRIMARY KEY,
//         first_name VARCHAR(250) NOT NULL,
//         last_name VARCHAR(250),
//         email VARCHAR(250) NOT NULL UNIQUE,
//         password VARCHAR(250) NOT NULL
//       );`,

//       `CREATE TABLE IF NOT EXISTS admin_table (
//         admin_id SERIAL PRIMARY KEY,
//         user_id INTEGER REFERENCES user_table(user_id) UNIQUE,
//         admin_role VARCHAR(250) NOT NULL
//       );`,

//       `CREATE TABLE IF NOT EXISTS product_table (
//         product_id SERIAL PRIMARY KEY,
//         product_name VARCHAR(250) UNIQUE NOT NULL,
//         description TEXT NOT NULL,
//         gender VARCHAR(10) NOT NULL,
//         category VARCHAR(250) NOT NULL
//       );`,

//       `CREATE TABLE IF NOT EXISTS item_table (
//         item_id SERIAL PRIMARY KEY,
//         product_id INTEGER REFERENCES product_table(product_id),
//         size VARCHAR(10) NOT NULL,
//         amount INTEGER NOT NULL,
//         price DECIMAL NOT NULL
//       );`,

//       `CREATE TABLE IF NOT EXISTS user_product (
//         user_id INTEGER REFERENCES user_table(user_id),
//         item_id INTEGER REFERENCES item_table(item_id),
//         wanted_amount INTEGER NOT NULL,
//         PRIMARY KEY(user_id, item_id)
//       );`,

//       `CREATE TABLE IF NOT EXISTS product_image (
//         image_id SERIAL PRIMARY KEY,
//         product_id INTEGER REFERENCES product_table(product_id),
//         image_url TEXT NOT NULL,
//         is_primary BOOLEAN DEFAULT FALSE
//       );`,
//     ];

//     for (const query of queries) {
//       await db.query(query);
//     }

//     console.log("All tables created successfully!");
//   } catch (err) {
//     console.error("Error creating tables:", err);
//   } finally {
//     await db.end();
//   }
// };

// createTables();

export default db;
