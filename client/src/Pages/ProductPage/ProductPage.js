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
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg"
            className="img-fluid"
            alt={item.name}
          />
        </div>
        <div className="col-md-6 mb-4 pt-5">
          <div className="p-4">
            <div className="mb-3">
              <span className="badge bg-dark me-1">{item.category}</span>
              {item.amount === 0 && (
                <span className="badge bg-danger me-1">Out of stock</span>
              )}
            </div>

            <h2>{item.name}</h2>
            <p className="lead price">${item.price}</p>
            <strong>
              <p style={{ fontSize: "20px" }}>Description</p>
            </strong>
            <p>{item.description}</p>

            <div className="mb-3">
              <strong>Select Size:</strong>
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
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                type="button"
                className="btn btn-quantity"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <form className="d-flex justify-content-left">
              <button className="btn btn-dark ms-1" type="submit">
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
