import React, { useState, useEffect } from "react";

function AdminItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.product_name);
  const [editedCategory, setEditedCategory] = useState(item.category);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [selectedSize, setSelectedSize] = useState(null);
  const [editedAmount, setEditedAmount] = useState(0);
  const [editedPrice, setEditedPrice] = useState(0);

  const sizes = item.sizes.map((size, index) => ({
    size,
    item_id: item.item_ids[index],
    amount: item.amounts[index],
    price: parseFloat(item.prices[index]),
  }));

  useEffect(() => {
    if (selectedSize) {
      const selected = sizes.find((s) => s.size === selectedSize);
      setEditedAmount(selected ? selected.amount : 0);
      setEditedPrice(selected ? selected.price : 0);
    }
  }, [selectedSize, sizes]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedSizes = sizes.reduce((acc, curr) => {
      if (curr.size === selectedSize) {
        acc[`amount${curr.size}`] = editedAmount;
        acc[`price${curr.size}`] = editedPrice;
      } else {
        acc[`amount${curr.size}`] = curr.amount;
        acc[`price${curr.size}`] = curr.price;
      }
      return acc;
    }, {});
    onEdit(item.product_id, {
      product_name: editedName,
      category: editedCategory,
      description: editedDescription,
      ...updatedSizes,
    });
  };

  const handleDelete = () => {
    onDelete(item.product_id);
  };

  return (
    <div className="row align-items-center" style={{ marginBottom: "1rem" }}>
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
          className="img-fluid rounded-3"
          alt={item.product_name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3">
        {isEditing ? (
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="form-control my-3"
            style={{ fontSize: "0.875rem" }}
          />
        ) : (
          <h6
            className="text-muted"
            style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}
          >
            {item.category}
          </h6>
        )}
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="form-control my-3"
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          />
        ) : (
          <h6 className="mb-1" style={{ fontSize: "1rem", fontWeight: "bold" }}>
            {item.product_name}
          </h6>
        )}
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="form-control my-3"
            rows="3"
            style={{ fontSize: "0.875rem" }}
          />
        ) : (
          <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            {item.description}
          </p>
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
          style={{ fontSize: "0.875rem" }}
        >
          <i className="fas fa-minus"></i>
        </button>
        <input
          id={`quantity-${item.product_id}`}
          min="0"
          name="quantity"
          value={editedAmount}
          type="number"
          className="form-control form-control-sm"
          onChange={(e) => setEditedAmount(Number(e.target.value))}
          disabled={!isEditing}
          style={{ fontSize: "0.875rem" }}
        />
        <button
          className="btn btn-link px-2"
          onClick={() => setEditedAmount(editedAmount + 1)}
          disabled={!isEditing}
          style={{ fontSize: "0.875rem" }}
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
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          />
        ) : (
          <h6 className="mb-0" style={{ fontSize: "1rem", fontWeight: "bold" }}>
            ${" "}
            {parseFloat(
              sizes.find((s) => s.size === selectedSize)?.price || 0
            ).toFixed(2)}
          </h6>
        )}
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <div className="d-flex justify-content-between align-items-center">
          {isEditing ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={handleSave}
              style={{ fontSize: "0.75rem" }}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleEdit}
              style={{ fontSize: "0.75rem" }}
            >
              Edit
            </button>
          )}
          <button
            className="btn btn-sm btn-danger ms-2"
            onClick={handleDelete}
            style={{ fontSize: "0.75rem" }}
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
