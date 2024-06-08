import React from "react";
import sideCoverImage from "./Images/about.jpg";

function SideCover() {
  return (
    <div className="col-12 col-lg-6 col-xl-5 px-0">
      <img
        className="img-fluid rounded"
        loading="lazy"
        src={sideCoverImage}
        alt="Fashion About 1"
      />
    </div>
  );
}

export default SideCover;
