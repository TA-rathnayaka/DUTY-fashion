import { React, useState, useEffect } from "react";
import ProductItem from "../components/ProductItem/ProductItem";
import axios from "axios";
import { useParams } from "react-router-dom";

function ListOfProducts() {
  const { gender, category } = useParams();
  const [backEndData, setBackEndData] = useState([{}]);
  const fetchDate = async () => {
    const response = await axios.get(`/all/${gender}/${category}`);
    setBackEndData(response.data);
  };
  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <section>
      <div class="container py-5">
        <h4 class="my-5">{category}</h4>
        <div class="row">
          {backEndData.map((item) => {
            return (
              <ProductItem
                img={
                  "https://static.cotondoux.com/media/product/large/2022/01/11098/34363.jpg"
                }
                item={item}
                categoryColor={"#FFFFFF"}
                productPrice={item.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ListOfProducts;
