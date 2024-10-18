// src/App.js
import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProductListing from './components/ProductList';
import Header from './components/Header';
import AddCategory from './components/AddCategory';
import axios from 'axios';

function App() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedProductTypeId, setSelectedProductTypeId] = useState(null); // Store selected product type ID

  console.log('API URL:', process.env.REACT_APP_IP);


  // Fetch categories and sections from API
  const fetchCategories = async () => {
    try {
      // const res = await axios.get('http://192.168.162.82:8000/api/obtainCategoryAndSections/');
      const res = await axios.get(`${process.env.REACT_APP_IP}/obtainCategoryAndSections/`,);
      setCategoriesData(res.data.data);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="sidebar-container">
          <AddCategory refreshCategories={fetchCategories} />
          <Sidebar data={categoriesData} setSelectedProductTypeId={setSelectedProductTypeId} />
        </div>
        <div className="right-content">
          <ProductListing productTypeId={selectedProductTypeId} />
        </div>
      </div>
    </>
  );
}

export default App;
