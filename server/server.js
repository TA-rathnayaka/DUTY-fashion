import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import dotenv from "dotenv";
import route from "./routes/users.js";
import db from "./database/db.js";

dotenv.config();
const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const result = await db.query(
        "SELECT password from user_table WHERE email=$1",
        [email]
      );
      if (result.rows.length === 0) {
        return done(null, false, { message: "Incorrect email." });
      }
      const isAuthenticated = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      if (!isAuthenticated) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM user_table WHERE user_id=$1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return done(new Error("User not found"));
    }
    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

async function data() {
  let users = await db.query("SELECT * FROM user_table");
  return users.rows;
}
app.use(route);

app.get("/", async (req, res) => {
  const data_ = await data();
  console.log(data_);
  res.send(data_);
});

app.get("/data", async (req, res) => {
  try {
    if (req.query.type === "categories") {
      const gender = req.query.gender;
      let result = {};
      if (gender) {
        result = await db.query(
          "SELECT DISTINCT(category) FROM product_table WHERE gender=$1",
          [gender]
        );
      } else {
        result = await db.query("SELECT DISTINCT(category) FROM product_table");
      }
      return res.json(result.rows);
    }
    res.status(400).send("Invalid request type");
  } catch (error) {
    console.error("Error handling /stock request:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/all/:gender/:category", async (req, res) => {
  const { gender, category } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM product_table INNER JOIN item_table ON product_table.product_id = item_table.item_id WHERE gender=$1 AND category=$2",
      [gender, category]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error handling /collection request:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/all/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM product_table INNER JOIN item_table ON product_table.product_id = item_table.item_id WHERE product_table.product_id=$1",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error handling /collection request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/cart", (req, res) => {
  console.log("ok");
  // const { id } = req.params;

  // try {
  //   const result = await db.query(
  //     "SELECT * FROM user_product INNER JOIN item_table ON item_table.item_id = user_product.item_id INNER JOIN user_table ON user_table.user_id = user_product.user_id;",
  //     [id]
  //   );
  //   res.json(result.rows);
  // } catch (error) {
  //   console.error("Error handling /collection request:", error);
  //   res.status(500).send("Internal Server Error");
  // }
});
app.get("/signup", (req, res) => {
  res.redirect("register");
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const result = await db.query(
      "INSERT INTO user_table (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, email, hashedPassword]
    );
    res.status(200).send("Signup successful");
  } catch (error) {
    console.error("Error handling /signup:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query(
      "SELECT password from user_table WHERE email=$1",
      [email]
    );
    const hashedPassword = result.rows[0].password;
    const authenticated = await bcrypt.compare(password, hashedPassword);
    if (authenticated) {
      res.status(200).send("Sign in successful");
    } else {
      res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.error("Error handling /sign in:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Sever is listening at localhost ${port}`);
});
