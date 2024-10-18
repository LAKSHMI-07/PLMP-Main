// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import './ProductList.css';
import axios from 'axios';

const ProductList = ({ productTypeId }) => {
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (productTypeId) {
        setLoading(true);
        try {
          // Ensure the URL is correctly formed without duplicate "api"
          const url = `${process.env.REACT_APP_IP}/obtainAllProductList/`;
          console.log('API URL:', url); // Log the URL to verify it's correct

          const response = await axios.post(url, {
            id: productTypeId
          });

          // Check the response structure and update state accordingly
          if (response.data && response.data.data && response.data.data.product_list) {
            setResponseData(response.data.data.product_list); // Update state with product_list
          } else {
            throw new Error("Unexpected response structure");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); // Set loading to false when done
        }
      } else {
        setLoading(false); // Handle case when productTypeId is not provided
      }
    };

    fetchData();
  }, [productTypeId]); // Re-fetch data when productTypeId changes

  return (
    <div className="product-list">
      <h2>Product List:</h2>
      <div>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : responseData.length > 0 ? (
          responseData.map((item) => (
            <div key={item.product_id} className='productClassname'>
              <p>{item.product_name}</p>
              {/* Check if URLs are an array and render images */}
              {Array.isArray(item.url) ? (
                item.url.map((imgUrl, index) => (
                  <img key={index} src={imgUrl} alt={item.product_name} />
                ))
              ) : (
                <img src={item.url} style={{ width: "20%"}} alt={item.product_name} />
              )}
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
