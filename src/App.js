import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProductListing from './components/ProductList';
import Header from './components/Header';
import AddCategory from './components/AddCategory';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://192.168.1.5:8000/api/obtainCategoryAndSections/');
      setData(res.data.data);

      // Log the fetched categories to the console
      console.log('Fetched Categories:', res.data.data);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on mount
  }, []);

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="sidebar-container">
          <AddCategory refreshCategories={fetchCategories} />
          <Sidebar data={data} setSelectedProductType={setSelectedProductType} />
        </div>
        <div className="right-content">
          <ProductListing data={selectedProductType} />
        </div>
      </div>
    </>
  );
}

export default App;
