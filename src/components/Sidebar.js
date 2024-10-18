import React, { useState } from 'react';
import './Sidebar.css';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';

const Sidebar = ({ data, setSelectedProductTypeId }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [isTopCategoriesExpanded, setIsTopCategoriesExpanded] = useState(false); // State for Topcategories

  // Toggle Category Expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Toggle Topcategories Expansion
  const toggleTopCategories = () => {
    setIsTopCategoriesExpanded((prev) => !prev);
  };

  if (!data || data.length === 0) {
    return <div className='nocategories'>No categories available.</div>;
  }

  // Toggle Section Expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleProductTypeSelect = (productTypeId) => {
    setSelectedProductTypeId(productTypeId);
  };

  return (
    <div className="sidebar">
      <ul >
        <li className="top-menu" onClick={toggleTopCategories}>
          Categories
        </li>
        {isTopCategoriesExpanded && (
          <ul className="category-list">
            {data.map((category) => (
              <li key={category.category_id}>
                <div 
                  onClick={() => toggleCategory(category.category_id)} 
                  className="category-name"
                  style={{ cursor: 'pointer' }}
                >
                  {category.name} 
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
        )}
        <li className="top-menu" >Products</li>
        <li className="top-menu" >Variants</li>
        <li className="top-menu" >Import</li>
        <li className="top-menu">Export</li>
        <li className="top-menu" >Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
