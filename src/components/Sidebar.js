// Sidebar.js

import React, { useState } from 'react';
import './Sidebar.css';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';
import ProductList from './ProductList';

const Sidebar = ({ data, setSelectedProductType }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  // Toggle Category Expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  if (!data || data.length === 0) {
    return <div>No categories available.</div>; // Render message if data is empty
  }

  // Toggle Section Expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const shoot = (productTypeName) => {
    setSelectedProductType(productTypeName);
  };

  return (
    <div className="sidebar">
      <span className='sidebarBlock-heading'>Product categories</span>
      <ul className="category-list">
        {data.length > 0 ? (
          data.map((category) => (
            <li key={category.category_id}>
              {/* Category Name */}
              <div 
                onClick={() => toggleCategory(category.category_id)} 
                className="category-name"
                style={{ cursor: 'pointer' }}
              >
                {category.name} <ChevronDownIcon style={{ fontSize: 20, float: "right" }} />
              </div>
              {/* Render Sections if Category is Expanded */}
              {expandedCategories[category.category_id] && (
                <ul className="section-list">
                  {category.sections.map((section) => (
                    <li key={section.section_id}>
                      {/* Section Name */}
                      <div 
                        onClick={() => toggleSection(section.section_id)} 
                        className="section-name"
                        style={{ cursor: 'pointer' }}
                      >
                        {section.section_name}
                      </div>
                      {/* Render Product Types if Section is Expanded */}
                      {expandedSections[section.section_id] && (
                        <ul className="product-type-list">
                          {section.product_types.map((productType) => (
                            <li 
                              key={productType.id}   
                              onClick={() => shoot(productType.name)} 
                              className="product-type-name"
                            >
                              {productType.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <li>No categories available</li> // Fallback message if no categories
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
