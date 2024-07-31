import React, { useState, useEffect } from "react";

function AdminItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.product_name);
  const [editedCategory, setEditedCategory] = useState(item.category);
  const [selectedSize, setSelectedSize] = useState(null);
  const [editedAmount, setEditedAmount] = useState(0);
  const [editedPrice, setEditedPrice] = useState(item.price);

  // Define sizes and their corresponding amounts
  const sizes = [
    { size: "S", amount: item.amountS || 0 },
    { size: "M", amount: item.amountM || 0 },
    { size: "L", amount: item.amountL || 0 },
    { size: "XL", amount: item.amountXL || 0 },
  ];

  useEffect(() => {
    if (selectedSize) {
      const selected = sizes.find((s) => s.size === selectedSize);
      setEditedAmount(selected ? selected.amount : 0);
    }
  }, [selectedSize]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedSizes = sizes.reduce((acc, curr) => {
      if (curr.size === selectedSize) {
        acc[`amount${curr.size}`] = editedAmount;
      } else {
        acc[`amount${curr.size}`] = curr.amount;
      }
      return acc;
    }, {});
    onEdit(item.item_id, {
      product_name: editedName,
      category: editedCategory,
      ...updatedSizes,
      price: editedPrice,
    });
  };

  const handleDelete = () => {
    onDelete(item.item_id);
  };

  return (
    <div className="row align-items-center" style={{ marginBottom: "1rem" }}>
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
          className="img-fluid rounded-3"
          alt={item.product_name}
          style={{ maxWidth: "100%", height: "auto" }} // Maintain aspect ratio
        />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3">
        {isEditing ? (
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="form-control"
            style={{ fontSize: "0.875rem" }} // Match font size with other pages
          />
        ) : (
          <h6
            className="text-muted"
            style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }} // Match font size with other pages
          >
            {item.category}
          </h6>
        )}
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="form-control"
            style={{ fontSize: "1rem", fontWeight: "bold" }} // Match font size and weight with other pages
          />
        ) : (
          <h6
            className="mb-1"
            style={{ fontSize: "1rem", fontWeight: "bold" }} // Match font size and weight with other pages
          >
            {item.product_name}
          </h6>
        )}
        <div>
          {sizes.map(({ size }) => (
            <button
              key={size}
              className={`btn btn-sm ${
                selectedSize === size ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setSelectedSize(size)}
              style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
              disabled={!isEditing}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
        <button
          className="btn btn-link px-2"
          onClick={() => setEditedAmount(Math.max(0, editedAmount - 1))}
          disabled={!isEditing}
          style={{ fontSize: "0.875rem" }} // Match font size with other pages
        >
          <i className="fas fa-minus"></i>
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
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        {isEditing ? (
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
            className="form-control"
            style={{ fontSize: "1rem", fontWeight: "bold" }} // Match font size and weight with other pages
          />
        ) : (
          <h6
            className="mb-0"
            style={{ fontSize: "1rem", fontWeight: "bold" }} // Match font size and weight with other pages
          >
            $ {parseFloat(item.price).toFixed(2)}
          </h6>
        )}
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <div className="d-flex justify-content-between align-items-center">
          {isEditing ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={handleSave}
              style={{ fontSize: "0.75rem" }} // Match font size with other pages
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleEdit}
              style={{ fontSize: "0.75rem" }} // Match font size with other pages
            >
              Edit
            </button>
          )}
          <button
            className="btn btn-sm btn-danger ms-2"
            onClick={handleDelete}
            style={{ fontSize: "0.75rem" }} // Match font size with other pages
          >
            Delete
          </button>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default AdminItem;