import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onCancel, categories }) {
  const isEdit = !!note;
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [category, setCategory] = useState(note ? note.category || "" : "");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setCategory(note ? note.category || "" : "");
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      alert("Cannot save an empty note.");
      return;
    }
    onSave({
      id: note ? note.id : undefined,
      title: title.trim() || "(Untitled)",
      content,
      category: category || null,
    });
  };

  return (
    <div className="note-editor-container" aria-label={isEdit ? "Edit note" : "Create note"}>
      <form className="note-editor-form" onSubmit={handleSubmit}>
        <input
          className="note-editor-title"
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <textarea
          className="note-editor-content"
          placeholder="Start typing your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          aria-label="Note content"
        />
        <div style={{ marginTop: "1em", display: "flex", alignItems: "center", gap: "1em"}}>
          <select
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            className="category-picker"
            aria-label="Select category"
            style={{ margin: 0, minWidth: "140px" }}
          >
            <option value="">Uncategorized</option>
            {categories.map((cat) => (
              <option value={cat.name} key={cat.id || cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="note-editor-actions">
          <button className="btn accent" type="submit">
            {isEdit ? "Save" : "Create"}
          </button>
          <button className="btn cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
NoteEditor.propTypes = {
  note: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default NoteEditor;
