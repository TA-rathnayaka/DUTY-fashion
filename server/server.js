import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "StyleStoreDB",
  password: "password",
  port: 5432,
});

db.connect();

async function data() {
  let users = await db.query("SELECT * FROM user_table");
  return users.rows;
}

app.get("/", async (req, res) => {
  const data_ = await data();
  console.log(data_);
  res.send(data_);
});

app.get("/stock", async (req, res) => {
  try {
    if (req.query.type === "categories") {
      const result = await db.query(
        "SELECT DISTINCT(category) FROM product_table"
      );
      return res.json(result.rows);
    } else if ((req.type.query.type = "gender")) {
      console.log("You have to change the database table"); // fix this
    }
    res.status(400).send("Invalid request type");
  } catch (error) {
    console.error("Error handling /stock request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Sever is listening at localhost ${port}`);
});
