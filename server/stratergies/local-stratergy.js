import passport from "passport";
import { Strategy } from "passport-local";
import db from "../database/db.js";
import bcrypt from "bcrypt";

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

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const result = await db.query("SELECT * from user_table WHERE email=$1", [
        email,
      ]);
      if (result.rows.length === 0) {
        return done(null, false, { message: "Incorrect email." });
      }
      const user = result.rows[0];
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (!isAuthenticated) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);
