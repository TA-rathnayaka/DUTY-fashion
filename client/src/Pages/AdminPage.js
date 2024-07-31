import React, { useState, useEffect } from "react";
import AdminItem from "../components/AdminItem";

import axios from "axios";

function AdminPage() {
  const [AdminData, setAdminData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/all`);
      const groupedData = response.data.reduce((acc, item) => {
        if (!acc[item.product_id]) {
          acc[item.product_id] = {
            product_id: item.product_id,
            product_name: item.product_name,
            description: item.description,
            gender: item.gender,
            category: item.category,
            sizes: [],
            prices: [],
            amounts: [],
            item_ids: [],
          };
        }
        acc[item.product_id].sizes.push(item.size);
        acc[item.product_id].prices.push(item.price);
        acc[item.product_id].amounts.push(item.amount);
        acc[item.product_id].item_ids.push(item.item_id);
        return acc;
      }, {});
      setAdminData(Object.values(groupedData));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const onEdit = async (id, editedItem) => {
    // try {
    //   const response = await axios.patch(`/cart/${id}`, editedItem, {
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (response.status === 200) {
    //     // Update the cart data with the edited item
    //     setAdminData((prevCartData) =>
    //       prevCartData.map((item) =>
    //         item.item_id === id ? { ...item, ...editedItem } : item
    //       )
    //     );
    //     console.log("Successfully edited the cart item");
    //   } else {
    //     console.warn(`Unexpected response status: ${response.status}`);
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     if (error.response.status === 400) {
    //       console.error("Bad request. Please check the input data.");
    //     } else {
    //       console.error(`Server error: ${error.response.status}`);
    //     }
    //   } else {
    //     console.error("Network error or no response received.");
    //   }
    // }
  };

  const onDelete = async (item_id) => {
    // try {
    //   const response = await axios.delete(`/cart/${item_id}`, {
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (response.status === 200) {
    //     setAdminData(AdminData.filter((item) => item.item_id !== item_id));
    //     console.log("Successfully deleted the cart item");
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     console.error("Bad request. Please check the input data.");
    //   } else {
    //     console.error("There was an error deleting the data:", error);
    //   }
    // }
  };

  useEffect(() => {
    fetchData();
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
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h5 className="mb-0">All Products</h5>
                        <h6 className="mb-0 text-muted">
                          {AdminData.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />

                      <div className="row mb-4 d-flex justify-content-between align-items-center">
                        {AdminData.map((item) => (
                          <AdminItem
                            key={item.item_id}
                            item={item}
                            onEdit={onEdit}
                            onDelete={onDelete}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
