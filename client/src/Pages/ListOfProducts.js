import { React, useState, useEffect } from "react";
import ProductItem from "../components/ProductItem/ProductItem";
import axios from "axios";
import { useParams } from "react-router-dom";

function ListOfProducts() {
  const { gender, category } = useParams();
  const [backEndData, setBackEndData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/all/${gender}/${category}`);
      setBackEndData(response.data);
      setError(null); // Reset error if request succeeds
    } catch (err) {
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.statusText}`
          : "Server is unreachable. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [gender, category]);

  return (
    <section>
      <div className="container py-5">
        <h4 className="my-5">{category}</h4>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row">
            {backEndData.length > 0 ? (
              backEndData.map((item) => (
                <ProductItem
                  key={item.id}
                  img={item.image_url}
                  item={item}
                  categoryColor={"#FFFFFF"}
                  productPrice={item.price}
                />
              ))
            ) : (
              <p>No products available in this category.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListOfProducts;
