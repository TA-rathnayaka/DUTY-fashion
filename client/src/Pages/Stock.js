import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../components/ProductItem/ProductItem";

function Stock() {
  const [onPlus, setOnPlus] = useState(false);
  const [backEndData, setBackEndData] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender");

  const fetchData = async () => {
    try {
      const response = await axios.get("/data", {
        params: { type: "categories", gender: gender },
      });

      console.log("API Response:", response.data); // Debugging log

      setBackEndData(Array.isArray(response.data) ? response.data : []);
      setError(null); // Reset error if request succeeds
    } catch (err) {
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.statusText}`
          : "Server is unreachable. Please try again later."
      );
      setBackEndData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gender]);

  return (
    <section>
      <div className="container py-5">
        <h5 className="my-5 h5 m-0">Categories</h5>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row">
            {backEndData.length > 0 ? (
              backEndData.map((element) => (
                <ProductItem
                  key={element.id}
                  img={element.image_url}
                  categoryName={element.category}
                  categoryColor={"#FFFFFF"}
                  gender={gender}
                />
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Stock;
