import React from "react";
import "./Styles/ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem({ img, categoryName, categoryColor, gender, item }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="bg-image hover-zoom ripple">
        <Link
          to={
            item
              ? `/collection/${item.product_id}`
              : `/collection/${gender}/${categoryName}`
          }
        >
          <img src={img} className="w-100" alt="Product" />
          <div className="hover-overlay">
            <div className="mask"></div>
            <div className="text-overlay" style={{ color: categoryColor }}>
              {item ? item.product_name : categoryName}
            </div>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="d-flex justify-content-start align-items-start h-100">
                <h5>
                  <span className="badge bg-body-tertiary pt-2 ms-3 mt-3 text-dark">
                    {item && item.price + "$"}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
