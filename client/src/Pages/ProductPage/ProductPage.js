import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/ProductPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import placeholder from "./images/placeholder.webp";

const apiUrl = process.env.REACT_APP_API_URL;

function ProductPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all/${id}`);

      // Filter the images for the first item (primary image group by product)
      const filteredImages = response.data
        .filter((item) => item.product_id === parseInt(id))
        .map((item) => ({
          image_url: item.image_url,
          is_primary: item.is_primary,
        }));
      console.log(filteredImages);
      setAllItems(response.data);
      setItem(response.data[0]);
      setSelectedSize(response.data[0].size);
      setImages(filteredImages); // Set the images to be displayed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { item_id: item.item_id, wanted_amount: quantity };
    console.log("Submitting data:", data);
    try {
      const response = await axios.post(`${apiUrl}/cart`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Error:", error);
      }
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
          {/* Render the primary image (or a placeholder) */}
          <img
            src={item.image_url || placeholder}
            className="img-fluid rounded-3"
            alt={item.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholder;
            }}
            style={{ maxWidth: "100%", height: "auto" }} // Maintain aspect ratio
          />
        </div>

        <div className="col-md-6 mb-4 pt-5">
          <div className="p-4">
            <div className="mb-3">
              <span
                className="badge bg-dark me-1"
                style={{ fontSize: "0.875rem" }}
              >
                {item.category}
              </span>
              {item.amount === 0 && (
                <span
                  className="badge bg-danger me-1"
                  style={{ fontSize: "0.875rem" }}
                >
                  Out of stock
                </span>
              )}
            </div>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {item.name}
            </h2>
            <p className="lead price" style={{ fontSize: "1.25rem" }}>
              ${item.price}
            </p>
            <strong>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                Description
              </p>
            </strong>
            <p style={{ fontSize: "0.875rem" }}>{item.description}</p>

            <div className="mb-3">
              <strong style={{ fontSize: "0.875rem" }}>Select Size:</strong>
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
                      fontSize: "0.875rem",
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
                  fontSize: "0.875rem",
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span
                className="quantity-display"
                style={{ fontSize: "0.875rem" }}
              >
                {quantity}
              </span>
              <button
                type="button"
                className="btn btn-quantity"
                onClick={handleIncrease}
                style={{
                  fontSize: "0.875rem",
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <form
              className="d-flex justify-content-left"
              onSubmit={handleSubmit}
            >
              <button
                className="btn btn-dark ms-1"
                type="submit"
                style={{ fontSize: "0.875rem" }}
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
