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
route.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
    })(req, res, next);
  },
  (req, res) => {
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Login successful",
        user: { user_id: user.user_id, email: user.email },
      });
    });
  }
);
route.post("/logout", async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }

    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to destroy session", error: err });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

route.get("/status", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.status(200).json({ success: true });
    } else {
      res
        .status(200)
        .json({ success: false, message: "User is not authenticated" });
    }
  } catch (error) {
    console.error("Error in /status route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user_id: req.user.user_id, isAdmin: true });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
export default route;
