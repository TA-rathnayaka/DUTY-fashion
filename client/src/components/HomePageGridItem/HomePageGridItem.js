import React, { useState } from "react";
import "./HomePageGridItem.css";

function HomePageGridItem({ img }) {
  return (
    <div
      className="grid-item col-lg-6 col-sm-12"
      style={{ backgroundColor: img, height: "100vh" }}
    ></div>
  );
}

export default HomePageGridItem;
