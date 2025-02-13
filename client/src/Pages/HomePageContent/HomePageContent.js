import React, { useState } from "react";
import HomePageGridItem from "../../components/HomePageGridItem/HomePageGridItem";
import men from "../../components/HomePageGridItem/images/men.jpg";
import women from "../../components/HomePageGridItem/images/women.jpg";
import "./styles/main.css";

function HomePageContent() {
  const [getGridElement, setGridElement] = useState(null);
  let firstGridSize = 6;
  let secondGridSize = 6;
  if (getGridElement === 0) {
    firstGridSize = 8;
    secondGridSize = 4;
  } else if (getGridElement === 1) {
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
        typeColor={"#007bff"}
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
