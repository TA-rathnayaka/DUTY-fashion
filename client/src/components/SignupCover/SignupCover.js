import React from "react";
import backgroundImage from "./Images/signup.jpg";

function SignUpCover() {
  return (
    <div
      className="p-5 bg-image"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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

export default SignUpCover;
