import React, { useState } from "react";

import ProductItem from "../components/ProductItem/ProductItem";

function Stock() {
  const [onPlus, setOnPlus] = useState(false);
  return (
    <section>
      <div class="container py-5">
        <h4 class="my-5">Categories</h4>
        <div class="row">
          <ProductItem
            img={
              "https://static.cotondoux.com/media/product/large/2022/01/11098/34363.jpg"
            }
            categoryName={"Tops"}
            categoryColor={"#FFFFFF"}
          />
          <ProductItem
            img={
              "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(2).webp"
            }
            categoryName={"categoryName"}
            categoryColor={"#FFFFFF"}
          />
          <ProductItem
            img={
              "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(2).webp"
            }
            categoryName={"+"}
            categoryColor={"#FFFFFF"}
          />
        </div>
      </div>
    </section>
  );
}

export default Stock;
