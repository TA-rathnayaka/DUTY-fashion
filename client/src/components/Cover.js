import React from "react";

function Cover({ img }) {
  return (
    <div
      className="p-5 bg-image"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
  );
}

export default Cover;
