import { Router } from "express";
import db from "../database/db.js";
import bcrypt from "bcrypt";
import passport from "passport";

const route = Router();

route.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const result = await db.query(
      "INSERT INTO user_table (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword]
    );

    req.logIn(result.rows[0], (err) => {
      if (err) next(err);
      res.status(200).send("Signup successful");
    });
  } catch (error) {
    console.error("Error handling /signup:", error);
    res.status(500).json("Failed to signup");
  }
});
route.post("/login", passport.authenticate("local"), async (req, res) => {
  res.status(200).json("logged in successful");
});

route.get("/status", async (req, res) => {
  res.status(200).json({ success: req.isAuthenticated() });
});

export default route;
