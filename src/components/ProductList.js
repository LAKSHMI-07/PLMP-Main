// productlist.js

import React from 'react';
import './ProductList.css';

const ProductList = ({ data }) => {
  return (
    <div className="product-list">
      <h3>Selected Product Type: {data}</h3>
    </div>
  );
};

export default ProductList;
