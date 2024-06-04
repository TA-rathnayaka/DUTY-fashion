import React, { useState } from "react";
import HomePageGridItem from "./HomePageGridItem/HomePageGridItem";
import men from "./HomePageGridItem/images/men.png";
import women from "./HomePageGridItem/images/women.png";

function HomePageContent() {
  const [getGridElement, setGridElement] = useState(null);
  let firstGridSize = 6;
  let secondGridSize = 6;
  if (getGridElement == 0) {
    firstGridSize = 8;
    secondGridSize = 4;
  } else if (getGridElement == 1) {
    firstGridSize = 4;
    secondGridSize = 8;
  } else {
    firstGridSize = 6;
    secondGridSize = 6;
  }

  return (
    <div
      className="row container-fluid"
      style={{ padding: "0", margin: "0px" }}
    >
      <HomePageGridItem
        id="0"
        img={men}
        setOnTop={setGridElement}
        gridSize={firstGridSize}
        typeName={"Male"}
        typeColor={"#A0DEFF"}
      />
      <HomePageGridItem
        id="1"
        img={women}
        setOnTop={setGridElement}
        gridSize={secondGridSize}
        typeName={"Female"}
        typeColor={"#f8cba6"}
      />
    </div>
  );
}

export default HomePageContent;
