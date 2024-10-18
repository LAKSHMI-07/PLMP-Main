// src/components/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';

const Sidebar = ({ data, setSelectedProductTypeId }) => {
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
    return <div className='nocategories'>No categories available.</div>; // Render message if data is empty
  }

  // Toggle Section Expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleProductTypeSelect = (productTypeId) => {
    setSelectedProductTypeId(productTypeId); // Set selected product type ID
  };

  return (
    <div className="sidebar">
      <ul className="category-list">
        {data.map((category) => (
          <li key={category.category_id}>
            <div 
              onClick={() => toggleCategory(category.category_id)} 
              className="category-name"
              style={{ cursor: 'pointer' }}
            >
              {category.name} <ChevronDownIcon style={{ fontSize: 20, float: "right" }} />
            </div>
            {expandedCategories[category.category_id] && (
              <ul className="section-list">
                {category.sections.map((section) => (
                  <li key={section.section_id}>
                    <div 
                      onClick={() => toggleSection(section.section_id)} 
                      className="section-name"
                      style={{ cursor: 'pointer' }}
                    >
                      {section.section_name}
                    </div>
                    {expandedSections[section.section_id] && (
                      <ul className="product-type-list">
                        {section.product_types.map((productType) => (
                          <li 
                            key={productType.id} 
                            onClick={() => handleProductTypeSelect(productType.id)} 
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
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
