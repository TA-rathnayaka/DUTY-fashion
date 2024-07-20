import { Router } from "express";
import db from "../database/db.js";
import bcrypt from "bcrypt";
import passport, { authenticate } from "passport";

const route = Router();

route.get("/signup", (req, res) => {
  res.redirect("register");
});

route.post("/signup", async (req, res) => {
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
route.post("/login", passport.authenticate("local"), async (req, res) => {
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

route.get("/cart", async (req, res) => {
  const { id } = req.user.id;
  try {
    const result = await db.query(
      "SELECT * FROM user_product INNER JOIN item_table ON item_table.item_id = user_product.item_id INNER JOIN user_table ON user_table.user_id = user_product.user_id;",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error handling /collection request:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default route;
