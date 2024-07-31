import React, { useState, useEffect } from "react";
import CartItem from "../../components/CartItem";
import "./css/styles.css";
import axios from "axios";

function CartItems() {
  const [cartData, setCartData] = useState([]);
  const fetchDate = async () => {
    const response = await axios.get(`/cart`);
    console.log(response.data);

    setCartData(response.data);
  };

  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <section className="h-100 h-custom mt-5">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h5 className="mb-0">Shopping Cart</h5>
                        <h6 className="mb-0 text-muted">
                          {cartData.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />

                      <div className="row mb-4 d-flex justify-content-between align-items-center">
                        {cartData.map((item) => (
                          <CartItem item={item} />
                        ))}
                      </div>

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="#!" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-body-tertiary">
                    <div className="p-5">
                      <h5 className="mb-5 mt-2 pt-1">Summary</h5>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5>Total price</h5>
                        <h5>$ {}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartItems;
