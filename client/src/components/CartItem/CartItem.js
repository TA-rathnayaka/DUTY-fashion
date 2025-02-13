import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrashCan,
  faPenToSquare,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./css/styles.css";
import placeholder from "./images/placeholder.webp";

function CartItem({ item, onDelete, onEdit, setTotalPrice }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(item.wanted_amount);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(item.item_id, editedAmount);
  };

  const handleDelete = () => {
    onDelete(item.item_id);
  };

  return (
    <div className="row align-items-center" style={{ marginBottom: "1rem" }}>
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src={item.image_url || placeholder} // Fallback to default image if no imageUrl provided
          className="img-fluid rounded-3"
          alt={item.product_name}
          style={{ maxWidth: "100%", height: "auto" }} // Maintain aspect ratio
        />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3">
        <h6
          className="text-muted"
          style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }} // Match font size with other pages
        >
          {item.category}
        </h6>
        <h6
          className="mb-1"
          style={{ fontSize: "1rem", fontWeight: "bold" }} // Match font size and weight with other pages
        >
          {item.product_name}
        </h6>
        <p
          className="text-muted"
          style={{ fontSize: "0.875rem" }} // Match font size with other pages
        >
          Size: {item.size}
        </p>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
        <button
          className="btn btn-link px-2"
          onClick={() => setEditedAmount(Math.max(0, editedAmount - 1))}
          disabled={!isEditing}
          style={{ fontSize: "0.875rem" }} // Match font size with other pages
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <input
          id={`quantity-${item.item_id}`}
          min="0"
          name="quantity"
          value={editedAmount}
          type="number"
          className="form-control form-control-sm"
          onChange={(e) => setEditedAmount(Number(e.target.value))}
          disabled={!isEditing}
          style={{ fontSize: "0.875rem" }} // Match font size with other pages
        />

        <button
          className="btn btn-link px-2"
          onClick={() => setEditedAmount(editedAmount + 1)}
          disabled={!isEditing}
          style={{ fontSize: "0.875rem" }} // Match font size with other pages
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6
          className="mb-0"
          style={{ fontSize: "1rem", fontWeight: "bold" }} // Match font size and weight with other pages
        >
          $ {(editedAmount * parseFloat(item.price)).toFixed(2)}
        </h6>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <div className="d-flex justify-content-between align-items-center">
          {isEditing ? (
            <button
              className="btn btn-link"
              onClick={handleSave}
              style={{ fontSize: "1rem", color: "#343a40" }}
              title="Save"
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          ) : (
            <button
              className="btn btn-link"
              onClick={handleEdit}
              style={{ fontSize: "1rem", color: "#343a40" }}
              title="Edit"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
          <button
            className="btn btn-link"
            onClick={handleDelete}
            style={{ fontSize: "1rem", color: "#343a40" }}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default CartItem;
