import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [selectedSize, setSelectedSize] = useState("M");

  const fetchData = async () => {
    const response = await axios.get(`/all/${id}`);
    setItem(response.data[0]);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
                {["XL", "L", "M", "SM"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`btn ${
                      selectedSize === size ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <form className="d-flex justify-content-left">
              <div className="form-outline me-1" style={{ width: "100px" }}>
                <input
                  type="number"
                  max={item.amount}
                  className="form-control"
                />
              </div>
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
