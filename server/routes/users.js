import { Router } from "express";
import db from "../database/db.js";
import bcrypt from "bcrypt";
import passport from "passport";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await db.query(
      "SELECT * FROM user_table WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.query(
      "INSERT INTO user_table (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword]
    );

    const user = result.rows[0];

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: "Signup successful",
        user: { user_id: user.user_id, email: user.email },
      });
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Failed to signup" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Login successful",
        user: { user_id: user.user_id, email: user.email },
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to destroy session",
          error: err,
        });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

router.get("/status", (req, res) => {
  res.status(200).json({
    isAuthenticated: req.isAuthenticated(),
    user: req.isAuthenticated()
      ? {
          user_id: req.user.user_id,
          email: req.user.email,
        }
      : null,
  });
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      user_id: req.user.user_id,
      email: req.user.email,
      isAdmin: req.user.is_admin, // Make sure this matches your DB column name
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
