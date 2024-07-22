import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const fetchDate = async () => {
    const response = await axios.get(`/all/${id}`);
    setItem(response.data[0]);
  };
  useEffect(() => {
    fetchDate();
  }, []);
  return (
    <>
      <div className="row mt-5 pt-5">
        <div className="col-md-6 mb-4">
          <img
            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg"
            className="img-fluid"
            alt=""
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

            <p className="lead">
              <span>${item.price}</span>
            </p>

            <strong>
              <p style={{ fontSize: "20px" }}>Description</p>
            </strong>

            <p>{item.description}</p>

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
    </>
  );
}

export default ProductPage;
