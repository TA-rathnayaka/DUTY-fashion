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
          `SELECT pt.category, pi.image_url
           FROM product_table pt
           LEFT JOIN product_image pi ON pt.product_id = pi.product_id AND pi.is_primary = TRUE
           WHERE UPPER(pt.gender) = UPPER($1)
           GROUP BY pt.category, pi.image_url`,
          [gender]
        );
      } else {
        result = await db.query(
          `SELECT pt.category, pi.image_url
           FROM product_table pt
           LEFT JOIN product_image pi ON pt.product_id = pi.product_id AND pi.is_primary = TRUE
           GROUP BY pt.category, pi.image_url`
        );
      }

      return res.json(result.rows);
    }

    res.status(400).send("Invalid request type");
  } catch (error) {
    console.error("Error handling /data request:", error);
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

route.patch("/cart", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("user is not authenticated");
  }

  const { user_id, item_id, wanted_amount } = {
    user_id: req.user.user_id,
    ...req.body,
  };

  try {
    const updateResult = await db.query(
      "UPDATE user_product SET wanted_amount = $3 WHERE user_id = $1 AND item_id = $2 RETURNING *",
      [user_id, item_id, wanted_amount]
    );
    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error("Error handling /cart request:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.delete("/cart/:item_id", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("User is not authenticated");
  }

  const { item_id } = req.params;

  if (!item_id) {
    return res.status(400).send("Item ID is required");
  }

  try {
    const result = await db.query(
      "DELETE FROM user_product WHERE user_id = $1 AND item_id = $2 RETURNING *",
      [req.user.user_id, item_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Item not found or already deleted");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error handling /cart request:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.get("/all", async (req, res) => {
  try {
    const response = await db.query(
      "SELECT * FROM product_table INNER JOIN item_table ON product_table.product_id = item_table.product_id"
    );

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error fetching products and items:", error);

    res.status(500).json({ message: "Internal server error" });
  }
});

route.patch("/all/:id", async (req, res) => {
  const { id } = req.params;
  const { product_name, description, category } = req.body;

  // Ensure the id is provided
  if (!id) {
    return res.status(400).send("Product ID is required");
  }

  // Ensure at least one field is provided for update
  if (!product_name && !description && !category) {
    return res.status(400).send("At least one field is required for update");
  }

  // Construct a dynamic query to update only provided fields
  let updateQuery = "UPDATE product_table SET ";
  const queryParams = [];
  let queryIndex = 1;

  if (product_name) {
    updateQuery += `product_name = $${queryIndex++}, `;
    queryParams.push(product_name);
  }
  if (description) {
    updateQuery += `description = $${queryIndex++}, `;
    queryParams.push(description);
  }
  if (category) {
    updateQuery += `category = $${queryIndex++}, `;
    queryParams.push(category);
  }

  updateQuery = updateQuery.slice(0, -2);
  updateQuery += ` WHERE product_id = $${queryIndex}`;
  queryParams.push(id);

  try {
    const result = await db.query(updateQuery, queryParams);
    if (result.rowCount === 0) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error handling /all/:id patch request:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.post("/all", async (req, res) => {
  const { product_name, description, category, gender } = req.body;

  if (!product_name || !description || !category || !gender) {
    return res
      .status(400)
      .send(
        "All fields are required: product_name, description, category, category"
      );
  }

  try {
    const result = await db.query(
      "INSERT INTO product_table (product_name, description, category, gender) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_name, description, category, gender]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error handling /all POST request:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.post("/items", async (req, res) => {
  const { product_id, size, amount, price } = req.body;

  if (!product_id || !size || amount == null || price == null) {
    return res.status(400).json({
      error: "All fields are required: product_id, size, amount, price",
    });
  }

  try {
    const result = await db.query(
      "INSERT INTO item_table (product_id, size, amount, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_id, size, amount, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error handling /items POST request:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.patch("/items/:item_id", async (req, res) => {
  const { item_id } = req.params;
  const { amount, price } = req.body;

  try {
    if (amount == null && price == null) {
      return res
        .status(400)
        .json({ error: "At least one field (amount or price) is required" });
    }

    let query = "UPDATE item_table SET";
    const values = [];
    let index = 1;

    if (amount != null) {
      query += ` amount = $${index++},`;
      values.push(amount);
    }
    if (price != null) {
      query += ` price = $${index++},`;
      values.push(price);
    }

    query = query.slice(0, -1) + ` WHERE item_id = $${index}`;
    values.push(item_id);

    await db.query(query, values);

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.delete("/product/:product_id", async (req, res) => {
  const { product_id } = req.params;

  try {
    await db.query("BEGIN");
    await db.query("DELETE FROM item_table WHERE product_id = $1", [
      product_id,
    ]);
    await db.query("DELETE FROM product_table WHERE product_id = $1", [
      product_id,
    ]);
    await db.query("COMMIT");

    res
      .status(200)
      .json({ message: "Product and associated items deleted successfully" });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default route;
