import React from "react";

function SideCover({ img }) {
  // Inline styles for the image
  const imageStyle = {
    display: "block",
    maxWidth: "100%", // Ensure the image does not overflow its container
    height: "auto", // Maintain aspect ratio
    transition: "transform 0.3s ease", // Smooth transition for transform
  };

  // Inline styles for the hover effect
  const hoverStyle = {
    transform: "none", // Prevent scaling or enlargement
  };

  return (
    <div className="col-12 col-lg-6 col-xl-5 px-0">
      <img
        style={imageStyle}
        loading="lazy"
        src={img}
        alt="Fashion About 1"
        onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
        onMouseOut={(e) => Object.assign(e.target.style, imageStyle)}
      />
    </div>
  );
}

export default SideCover;
