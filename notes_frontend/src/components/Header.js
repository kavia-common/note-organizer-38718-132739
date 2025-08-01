import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
function Header({
  search,
  onSearch,
  categories,
  onCategoryChange,
  selectedCategory,
}) {
  return (
    <div className="header">
      <div className="header-left">
        <span className="app-title">Notes</span>
        <input
          className="search-box"
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search notes"
        />
        <select
          className="category-picker"
          value={selectedCategory || ""}
          onChange={(e) => onCategoryChange(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option value={cat.name} key={cat.id || cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
Header.propTypes = {
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

export default Header;
