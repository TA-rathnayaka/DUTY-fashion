import React from "react";
import { Link } from "react-router-dom";
import "./Styles/ProductItem.css";

function ProductItem({ img, categoryName, categoryColor, gender, item }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-3 p-4">
      <div className="product-item">
        <Link
          to={
            item
              ? `/collection/${item.product_id}`
              : `/collection/${gender}/${categoryName}`
          }
          className="product-link"
        >
          <img src={img} className="product-img w-100" alt="Product" />
          <div className="overlay">
            <div className="overlay-content" style={{ color: categoryColor }}>
              {item ? item.product_name : categoryName}
            </div>
            {item && (
              <div className="price-badge">
                <span>${item.price}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
