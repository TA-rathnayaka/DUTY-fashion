import { Router } from "express";
import db from "../database/db.js";
import route from "./users.js";

route.get("/data", async (req, res) => {
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
route.get("/all/:gender/:category", async (req, res) => {
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
route.get("/all/:id", async (req, res) => {
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

export default route;
