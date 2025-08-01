import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
function Sidebar({ categories, selected, onSelect, onCreateNote }) {
  return (
    <nav className="sidebar" role="navigation" aria-label="Categories">
      <div className="logo">Notebook</div>
      <div className="categories">
        <div
          className={`category${selected == null ? " selected" : ""}`}
          onClick={() => onSelect(null)}
          tabIndex={0}
          role="button"
        >
          All Notes
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id || cat.name}
            className={`category${selected === cat.name ? " selected" : ""}`}
            onClick={() => onSelect(cat.name)}
            tabIndex={0}
            role="button"
          >
            {cat.name}
          </div>
        ))}
      </div>
      <div className="sidebar-bottom">
        <button className="new-note-btn" onClick={onCreateNote}>
          + New Note
        </button>
      </div>
    </nav>
  );
}
Sidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onCreateNote: PropTypes.func.isRequired,
};

export default Sidebar;
