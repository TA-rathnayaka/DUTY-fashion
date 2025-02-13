import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import dotenv from "dotenv";
import router from "./routes/index.js";
import db from "./database/db.js";
import "./stratergies/local-stratergy.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["https://dutyfashion.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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
app.use(router);

async function data() {
  let users = await db.query("SELECT * FROM user_table");
  return users.rows;
}
app.get("/", async (req, res) => {
  const data_ = await data();
  console.log(data_);
  res.send(data_);
});

app.listen(port, () => {
  console.log(`Sever is listening at localhost ${port}`);
});
