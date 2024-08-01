import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/styles.css";

function AddItem({ onAdd }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const handleAddSize = () => {
    if (newSize && newAmount >= 0 && newPrice >= 0) {
      setSizes([
        ...sizes,
        { size: newSize, amount: newAmount, price: parseFloat(newPrice) },
      ]);
      setNewSize("");
      setNewAmount(0);
      setNewPrice(0);
    }
  };

  const handleSave = () => {
    if (itemName && category && description && sizes.length > 0) {
      const newItem = {
        product_name: itemName,
        category,
        description,
        sizes: sizes.map((size) => size.size),
        amounts: sizes.map((size) => size.amount),
        prices: sizes.map((size) => size.price),
      };
      onAdd(newItem);
      setItemName("");
      setCategory("");
      setDescription("");
      setSizes([]);
    }
  };

  return (
    <div
      className="row align-items-center position-relative"
      style={{ marginBottom: "1rem" }}
    >
      <div className="col-md-3 col-lg-3 col-xl-3">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Product Name"
          className="form-control my-3"
          style={{ fontSize: "1rem", fontWeight: "bold" }}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="form-control my-3"
          style={{ fontSize: "0.875rem" }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="form-control my-3"
          rows="3"
          style={{ fontSize: "0.875rem" }}
        />
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="Size"
            className="form-control me-2"
            style={{ fontSize: "0.875rem" }}
          />
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(Number(e.target.value))}
            placeholder="Amount"
            min="0"
            className="form-control me-2"
            style={{ fontSize: "0.875rem" }}
          />
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
            placeholder="Price"
            min="0"
            className="form-control"
            style={{ fontSize: "0.875rem" }}
          />
          <button className="btn btn-primary ms-2" onClick={handleAddSize}>
            <FontAwesomeIcon icon={faPlus} /> Add Size
          </button>
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
        <div className="d-flex flex-column align-items-end">
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
