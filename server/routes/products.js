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
          "SELECT DISTINCT(category) FROM product_table WHERE UPPER(gender)=UPPER($1)",
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
      `WITH min_price_items AS (
    SELECT
        p.product_id,
        p.product_name,
        p.description,
        p.gender,
        p.category,
        i.item_id,
        i.size,
        i.amount,
        i.price,
        MIN(i.price) OVER (PARTITION BY i.product_id) AS min_price
    FROM
        product_table p
    INNER JOIN
        item_table i
    ON
        p.product_id = i.product_id
    WHERE
        UPPER(p.gender) = UPPER($1)
        AND UPPER(p.category) = UPPER($2)
),
same_price_check AS (
    SELECT
        product_id,
        MIN(price) AS min_price,
        COUNT(DISTINCT price) AS price_count
    FROM
        min_price_items
    GROUP BY
        product_id
)
SELECT
    m.product_id,
    m.product_name,
    m.description,
    m.gender,
    m.category,
    m.item_id,
    m.size,
    m.amount,
    m.price
FROM
    min_price_items m
JOIN
    same_price_check s
ON
    m.product_id = s.product_id
WHERE
    m.price = s.min_price
    AND (s.price_count > 1 OR m.size = 'S')
`,
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
      "SELECT * FROM product_table INNER JOIN item_table ON product_table.product_id = item_table.product_id WHERE product_table.product_id=$1",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error handling /collection request:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.get("/cart", async (req, res) => {
  if (!req.user) return res.status(401).send("user is not authenticated");

  const id = req.user.user_id;
  try {
    const result = await db.query(
      "SELECT * FROM user_product INNER JOIN item_table ON item_table.item_id = user_product.item_id INNER JOIN product_table ON product_table.product_id = item_table.product_id WHERE user_product.user_id = $1;",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error handling /collection request:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.post("/cart", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("user is not authenticated");
  }

  const { user_id, item_id, wanted_amount } = {
    user_id: req.user.user_id,
    ...req.body,
  };

  try {
    const checkResult = await db.query(
      "SELECT * FROM user_product WHERE user_id = $1 AND item_id = $2",
      [user_id, item_id]
    );

    if (checkResult.rows.length > 0) {
      const updateResult = await db.query(
        "UPDATE user_product SET wanted_amount = wanted_amount + $3 WHERE user_id = $1 AND item_id = $2 RETURNING *",
        [user_id, item_id, wanted_amount]
      );
      res.json(updateResult.rows[0]);
    } else {
      const insertResult = await db.query(
        "INSERT INTO user_product (user_id, item_id, wanted_amount) VALUES ($1, $2, $3) RETURNING *",
        [user_id, item_id, wanted_amount]
      );
      res.json(insertResult.rows[0]);
    }
  } catch (error) {
    console.error("Error handling /cart request:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default route;
