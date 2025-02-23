import React, { useState, useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";
import "./css/styles.css";
import axios from "axios";

function CartItems() {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotal = cartData.reduce(
      (acc, item) => acc + item.wanted_amount * parseFloat(item.price),
      0
    );
    setTotalPrice(newTotal);
  }, [cartData]);

  const fetchDate = async () => {
    try {
      const response = await axios.get(`/cart`);
      setCartData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("There was an error fetching data", error);
    }
  };

  const onEdit = async (id, editedAmount) => {
    try {
      const response = await axios.patch(
        "/cart",
        { item_id: id, wanted_amount: editedAmount },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setCartData((prev) =>
          prev.map((item) =>
            item.item_id === id
              ? { ...item, wanted_amount: editedAmount }
              : item
          )
        );
        console.log("Successfully edited the cart item");
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.error("Bad request. Please check the input data.");
        } else {
          console.error(`Server error: ${error.response.status}`);
        }
      } else {
        console.error("Network error or no response received.");
      }
    }
  };

  const onDelete = async (item_id) => {
    try {
      const response = await axios.delete(
        `/cart/${item_id}`,

        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        setCartData(cartData.filter((item) => item.item_id !== item_id));
        console.log("successfully deleted the cart item");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
      } else {
      }
      console.error("There was an error deleting data", error);
    }
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
                          <CartItem
                            item={item}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            setTotalPrice={setTotalPrice}
                          />
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
                        <h5>$ {totalPrice.toFixed(2)}</h5>
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
