import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../components/ProductItem/ProductItem";

function Stock() {
  const [onPlus, setOnPlus] = useState(false);
  const [backEndData, setBackEndData] = useState([{}]);
  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  const fetchDate = async () => {
    const response = await axios.get("/data", {
      params: {
        type: "categories",
        gender: gender,
      },
    });
    console.log(response.data);
    setBackEndData(response.data);
  };
  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <section>
      <div class="container py-5">
        <h5 class="my-5 h5 m-0">Categories</h5>
        <div class="row">
          {backEndData.map((element) => {
            return (
              <ProductItem
                img={
                  "https://static.cotondoux.com/media/product/large/2022/01/11098/34363.jpg"
                }
                categoryName={element.category}
                categoryColor={"#FFFFFF"}
                gender={gender}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Stock;
