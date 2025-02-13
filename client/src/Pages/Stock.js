import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../components/ProductItem/ProductItem";

const apiUrl = process.env.REACT_APP_API_URL;
function Stock() {
  const [backEndData, setBackEndData] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/data`, {
        params: { type: "categories", gender },
      });
      if (Array.isArray(response.data)) {
        setBackEndData(response.data);
        setError(null);
      } else {
        setError("Invalid data format received.");
      }
    } catch (err) {
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.statusText}`
          : "Server is unreachable. Please try again later."
      );
    }
  }, [gender]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section>
      <div className="container py-5">
        <h5 className="my-5 h5 m-0">Categories</h5>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row">
            {backEndData && backEndData.length > 0 ? (
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
