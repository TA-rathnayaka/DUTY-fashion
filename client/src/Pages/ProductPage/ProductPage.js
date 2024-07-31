import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(`/all/${id}`);
    setAllItems(response.data);
    setItem(response.data[0]);
    setSelectedSize(response.data[0].size);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { item_id: item.item_id, wanted_amount: quantity };
    console.log("Submitting data:", data);
    try {
      const response = await axios.post("/cart", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleIncrease = () => {
    if (quantity < item.amount) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const changeItemBasedOnSize = (size) => {
    setItem(allItems.find((item) => item.size === size));
  };

  const availableSizes = [...new Set(allItems.map((item) => item.size))];

  return (
    <div
      className="container mt-5 pt-5"
      style={{ padding: "3rem 1rem" }} // Responsive padding
    >
      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg"
            className="img-fluid"
            alt={item.name}
            style={{ maxWidth: "100%", height: "auto" }} // Maintain aspect ratio
          />
        </div>
        <div className="col-md-6 mb-4 pt-5">
          <div className="p-4">
            <div className="mb-3">
              <span
                className="badge bg-dark me-1"
                style={{ fontSize: "0.875rem" }} // Match font size with other pages
              >
                {item.category}
              </span>
              {item.amount === 0 && (
                <span
                  className="badge bg-danger me-1"
                  style={{ fontSize: "0.875rem" }} // Match font size with other pages
                >
                  Out of stock
                </span>
              )}
            </div>

            <h2
              style={{
                fontSize: "1.5rem", // Adjust to match consistent font size
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {item.name}
            </h2>
            <p
              className="lead price"
              style={{ fontSize: "1.25rem" }} // Adjust to match consistent font size
            >
              ${item.price}
            </p>
            <strong>
              <p
                style={{
                  fontSize: "1.25rem", // Adjust to match consistent font size
                  fontWeight: "bold",
                }}
              >
                Description
              </p>
            </strong>
            <p
              style={{
                fontSize: "0.875rem", // Match font size with other pages
              }}
            >
              {item.description}
            </p>

            <div className="mb-3">
              <strong
                style={{ fontSize: "0.875rem" }} // Match font size with other pages
              >
                Select Size:
              </strong>
              <div className="btn-group d-flex mt-2 size-buttons">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`btn ${
                      selectedSize === size
                        ? "btn-dark active"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => {
                      setSelectedSize(size);
                      changeItemBasedOnSize(size);
                      setQuantity(1);
                    }}
                    style={{
                      fontSize: "0.875rem", // Match font size with other pages
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-control">
              <button
                type="button"
                className="btn btn-quantity"
                onClick={handleDecrease}
                style={{
                  fontSize: "0.875rem", // Match font size with other pages
                }}
              >
                -
              </button>
              <span
                className="quantity-display"
                style={{ fontSize: "0.875rem" }} // Match font size with other pages
              >
                {quantity}
              </span>
              <button
                type="button"
                className="btn btn-quantity"
                onClick={handleIncrease}
                style={{
                  fontSize: "0.875rem", // Match font size with other pages
                }}
              >
                +
              </button>
            </div>

            <form
              className="d-flex justify-content-left"
              onSubmit={handleSubmit}
            >
              <button
                className="btn btn-dark ms-1"
                type="submit"
                style={{
                  fontSize: "0.875rem", // Match font size with other pages
                }}
              >
                Add to cart
                <i className="fas fa-shopping-cart ms-1"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
