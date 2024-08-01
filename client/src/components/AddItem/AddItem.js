import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/styles.css";

const predefinedSizes = ["S", "M", "L", "XL", "XXL"];

function AddItem({ onAdd }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg"
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [gender, setGender] = useState("");

  const handleSaveSize = () => {
    if (selectedSize && amount >= 0 && price >= 0) {
      const sizeData = { size: selectedSize, amount, price: parseFloat(price) };
      setSizes((prevSizes) => {
        const existingSize = prevSizes.find((s) => s.size === selectedSize);
        if (existingSize) {
          return prevSizes.map((s) => (s.size === selectedSize ? sizeData : s));
        }
        return [...prevSizes, sizeData];
      });
      setSelectedSize("");
      setAmount(0);
      setPrice(0);
    }
  };

  const handleSave = () => {
    if (itemName && category && description && gender && sizes.length > 0) {
      const newItem = {
        product_name: itemName,
        category,
        description,
        gender,
        image,
        sizes: sizes.map((size) => size.size),
        amounts: sizes.map((size) => size.amount),
        prices: sizes.map((size) => size.price),
      };
      onAdd(newItem);
      setItemName("");
      setCategory("");
      setDescription("");
      setGender("");
      setImage(
        "https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg"
      );
      setSizes([]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="row align-items-center position-relative"
      style={{ marginBottom: "1rem" }}
    >
      <div className="col-md-3 col-lg-3 col-xl-3 position-relative">
        <div className="image-container">
          {image ? (
            <img
              src={image}
              alt="Product"
              className="img-fluid rounded-3"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <div className="placeholder-image">
              <FontAwesomeIcon icon={faPlus} size="2x" color="#ccc" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="imageUpload"
          />
          <button
            className="btn btn-link image-upload-button"
            onClick={() => document.getElementById("imageUpload").click()}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "none",
              opacity: "0",
              zIndex: 1, // Ensure this button does not interfere with other elements
            }}
            title="Add Image"
          >
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </button>
        </div>
      </div>
      <div className="col-md-9 col-lg-9 col-xl-9">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Product Name"
          className="form-control my-3"
          style={{ fontSize: "1rem", fontWeight: "bold", maxWidth: "90%" }}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="form-control my-3"
          style={{ fontSize: "0.875rem", maxWidth: "90%" }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="form-control my-3"
          rows="3"
          style={{ fontSize: "0.875rem", maxWidth: "90%" }}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="form-control mb-2"
          style={{ fontSize: "0.875rem", maxWidth: "90%" }}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="form-control mb-2"
          style={{ fontSize: "0.875rem", maxWidth: "90%" }}
        >
          <option value="" disabled>
            Select Size
          </option>
          {predefinedSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div className="d-flex align-items-center">
          <div className="me-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
              min="0"
              className="form-control"
              style={{ fontSize: "0.875rem", maxWidth: "90%" }}
            />
            <label htmlFor="amount" style={{ fontSize: "0.875rem" }}>
              Amount
            </label>
          </div>
          <div className="ms-2">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              placeholder="Price"
              min="0"
              className="form-control"
              style={{ fontSize: "0.875rem", maxWidth: "90%" }}
            />
            <label htmlFor="price" style={{ fontSize: "0.875rem" }}>
              Price
            </label>
          </div>
          <div>
            <button
              className="btn btn-primary ms-2"
              onClick={handleSaveSize}
              disabled={!selectedSize}
            >
              <FontAwesomeIcon icon={faPlus} /> Save
            </button>
          </div>
        </div>
        <ul className="list-group">
          {sizes.map((s, index) => (
            <li key={index} className="list-group-item">
              Size: {s.size}, Amount: {s.amount}, Price: ${s.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="position-absolute top-0 end-0 p-2">
        <div
          className="d-flex flex-column align-items-end"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 2,
          }}
        >
          <button
            className="btn btn-link"
            onClick={handleSave}
            style={{ fontSize: "1rem", color: "#343a40" }}
            title="Save"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className="btn btn-link mt-2"
            onClick={() => {
              setItemName("");
              setCategory("");
              setDescription("");
              setGender("");
              setImage(
                "https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg"
              );
              setSelectedSize("");
              setAmount(0);
              setPrice(0);
              setSizes([]);
            }}
            style={{ fontSize: "1rem", color: "#343a40" }}
            title="Cancel"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default AddItem;
