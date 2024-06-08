import React from "react";
import "./Styles/HomePageGridItem.css";
import { Link } from "react-router-dom";

function HomePageGridItem({
  img,
  id,
  setOnTop,
  gridSize,
  typeName,
  typeColor,
}) {
  return (
    <div
      className={`grid-item col-lg-${gridSize} col-sm-12 d-flex align-items-center justify-content-center p-0`}
      onMouseOver={() => {
        setOnTop(id);
      }}
      onMouseLeave={() => {
        setOnTop(null);
      }}
    >
      <div
        className="grid-item-inner"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <a href="/stock" style={{ color: typeColor }}>
        {typeName}
      </a>
    </div>
  );
}

export default HomePageGridItem;
