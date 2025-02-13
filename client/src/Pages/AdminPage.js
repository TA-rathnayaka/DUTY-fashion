import React, { useState, useEffect } from "react";
import AdminItem from "../components/AdminItem/AdminItem";
import AddItem from "../components/AddItem/AddItem";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const apiUrl = process.env.REACT_APP_API_URL;

function AdminPage() {
  const [AdminData, setAdminData] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all`);
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
            image_url: item.image_url,
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

  const onAdd = async (newItem) => {
    const {
      product_name,
      category,
      description,
      gender,
      sizes,
      amounts,
      prices,
      image,
    } = newItem;

    try {
      const productResponse = await axios.post(
        `${apiUrl}/all`,
        {
          product_name: product_name,
          category: category,
          description: description,
          gender: gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const productId = productResponse.data.product_id;

      await axios.post(
        `${apiUrl}/images`,
        {
          product_id: productId,
          image_url: image,
          is_primary: true,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const itemRequests = sizes.map((size, index) => {
        return axios.post(
          `${apiUrl}/items`,
          {
            product_id: productId,
            size: size,
            amount: amounts[index],
            price: prices[index],
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      });

      const itemResponses = await Promise.all(itemRequests);

      const item_ids = itemResponses.map((response) => response.data.item_id);

      const productWithItems = {
        ...productResponse.data,
        sizes: sizes,
        amounts: amounts,
        prices: prices,
        item_ids: item_ids,
      };

      setAdminData((prevData) => [...prevData, productWithItems]);
      setShowAddItem(false);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  const onEdit = async (product_id, item_ids, editedItem) => {
    console.log(typeof editedItem);
    try {
      const hasProductName = editedItem.product_name !== undefined;
      const hasDescription = editedItem.description !== undefined;
      const hasImage = editedItem.image !== undefined;

      if (hasProductName || hasDescription || hasImage) {
        const response = await axios.patch(
          `${apiUrl}/all/${product_id}`,
          editedItem,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Product details updated:", response.data);
      }

      if (editedItem.amounts || editedItem.prices) {
        const updatedItems = item_ids
          .map((item_id, index) => ({
            item_id,
            amount: editedItem.amounts ? editedItem.amounts[index] : undefined,
            price: editedItem.prices ? editedItem.prices[index] : undefined,
          }))
          .filter(
            (item) => item.amount !== undefined || item.price !== undefined
          );

        for (const item of updatedItems) {
          const { item_id, amount, price } = item;
          const updatedItemDetails = {};
          if (amount !== undefined) updatedItemDetails.amount = amount;
          if (price !== undefined) updatedItemDetails.price = price;

          const itemResponse = await axios.patch(
            `${apiUrl}/items/${item_id}`,
            updatedItemDetails,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("Item details updated:", itemResponse.data);
        }
      }

      console.log("Updates completed successfully.");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const onDelete = async (product_id) => {
    try {
      const response = await axios.delete(`${apiUrl}/product/${product_id}`);
      setAdminData((items) =>
        items.filter((item) => item.product_id !== product_id)
      );
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data?.error || error.message
      );
    }
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
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => setShowAddItem(!showAddItem)}
                        >
                          <FontAwesomeIcon
                            icon={showAddItem ? faMinus : faPlus}
                          />
                        </button>
                        <h6 className="mb-0 text-muted">
                          {AdminData.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />

                      <div className="row mb-4 d-flex justify-content-between align-items-center">
                        {showAddItem && <AddItem onAdd={onAdd} />}
                        {AdminData.map((item) => (
                          <AdminItem
                            key={item.product_id}
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
