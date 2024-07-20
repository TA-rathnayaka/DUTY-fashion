import React from "react";

function SideCover({ img }) {
  return (
    <div className="col-12 col-lg-6 col-xl-5 px-0">
      <img
        className="img-fluid rounded"
        loading="lazy"
        src={img}
        alt="Fashion About 1"
      />
    </div>
  );
}

export default SideCover;
