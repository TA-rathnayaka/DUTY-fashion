import React, { useState } from "react";
import HomePageGridItem from "./HomePageGridItem/HomePageGridItem";

function HomePageContent() {
  const [getGridElement, setGridElement] = useState(null);
  return (
    <div
      className="row container-fluid"
      style={{ padding: "0", margin: "0px" }}
    >
      <HomePageGridItem img="green" />
      <HomePageGridItem img="red" />
    </div>
  );
}

export default HomePageContent;
