import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "StyleStoreDB",
  password: "password",
  port: 5432,
});

async function createDatabaseAndTables() {
  try {
    await db.connect();

    const dbCheckQuery = `SELECT 1 FROM pg_database WHERE datname = 'StyleStoreDB'`;
    const dbRes = await db.query(dbCheckQuery);

    if (dbRes.rows.length === 0) {
      await db.query(`CREATE DATABASE StyleStoreDB`);
      console.log("Database StyleStoreDB created.");
    } else {
      console.log("Database StyleStoreDB already exists.");
    }

    db.end();
    const newDbClient = new pg.Client({
      user: "postgres",
      host: "localhost",
      database: "StyleStoreDB",
      password: "password",
      port: 5432,
    });

    await newDbClient.connect();

    const tableCheckQueries = [
      `SELECT to_regclass('public.user_table')`,
      `SELECT to_regclass('public.admin_table')`,
      `SELECT to_regclass('public.product_table')`,
      `SELECT to_regclass('public.item_table')`,
      `SELECT to_regclass('public.user_product')`,
      `SELECT to_regclass('public.product_image')`,
    ];

    const tableChecks = await Promise.all(
      tableCheckQueries.map((query) => newDbClient.query(query))
    );

    const tablesExist = tableChecks.every(
      (res) => res.rows[0].to_regclass !== null
    );

    if (tablesExist) {
      console.log("All tables already exist.");
    } else {
      const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS user_table (
          user_id SERIAL PRIMARY KEY,
          first_name VARCHAR(250) NOT NULL,
          last_name VARCHAR(250),
          email VARCHAR(250) NOT NULL UNIQUE,
          password VARCHAR(250) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS admin_table (
          admin_id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES user_table(user_id) UNIQUE,
          admin_role VARCHAR(250) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS product_table (
          product_id SERIAL PRIMARY KEY,
          product_name VARCHAR(250) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          gender VARCHAR(10) NOT NULL,
          category VARCHAR(250) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS item_table (
          item_id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES product_table(product_id),
          size VARCHAR(10) NOT NULL,
          amount INTEGER NOT NULL,
          price DECIMAL NOT NULL
        );

        CREATE TABLE IF NOT EXISTS user_product (
          user_id INTEGER REFERENCES user_table(user_id),
          item_id INTEGER REFERENCES item_table(item_id),
          wanted_amount INTEGER NOT NULL,
          PRIMARY KEY(user_id, item_id)
        );

        CREATE TABLE IF NOT EXISTS product_image (
          image_id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES product_table(product_id),
          image_url TEXT NOT NULL,
          is_primary BOOLEAN DEFAULT FALSE
        );
      `;

      await newDbClient.query(createTablesQuery);
      console.log("Tables created successfully!");
    }

    newDbClient.end();
  } catch (error) {
    console.error("Error creating database and tables:", error);
  }
}

// Call the function to create database and tables if needed
createDatabaseAndTables();

export default db;
