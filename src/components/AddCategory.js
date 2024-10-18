import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = ({ refreshCategories }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://192.168.1.5:8000/api/createCategory/', {
        name: categoryName,
      });

      // Clear input field
      setCategoryName('');

      // Call the refresh function to update the category list
      await refreshCategories(); // Ensure it's awaited for proper sequencing
      alert('Category added successfully!');

      // Log the updated categories to verify the addition
      console.log('Updated Categories after addition:');
      const updatedCategories = await axios.get('http://192.168.1.5:8000/api/obtainCategoryAndSections/');
      console.log(updatedCategories.data.data);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category. Please try again.');
    }
  };

  return (
    <div className="add-category">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          required
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
