import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
function NoteList({ notes, loading, selectedNote, onSelect, onDelete }) {
  return (
    <div>
      <div className="notes-list-header">
        <span style={{ fontWeight: 600 }}>My Notes</span>
      </div>
      <ul className="notes-list" aria-label="Note list">
        {loading ? (
          <li style={{ color: "#bbb", padding: "2em 1em" }}>Loading...</li>
        ) : notes.length === 0 ? (
          <li style={{ color: "#bbb", padding: "2em 1em" }}>No notes found</li>
        ) : (
          notes.map((note) => (
            <li
              className={
                "note-list-item" +
                (selectedNote && note.id === selectedNote.id ? " selected" : "")
              }
              key={note.id}
              onClick={() => onSelect(note)}
              tabIndex={0}
              role="button"
            >
              <div>
                <div className="note-list-item-title">{note.title || "(Untitled)"}</div>
                <div className="note-list-item-meta">
                  {note.category && (
                    <span>
                      <span style={{ color: "#ffb300", fontWeight: 600 }}>
                        {note.category}
                      </span>
                      &nbsp;&middot;&nbsp;
                    </span>
                  )}
                  <span className="note-list-item-date">
                    {new Date(note.updated_at || note.created_at).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <button
                className="note-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    window.confirm(
                      "Delete this note? (This cannot be undone.)"
                    )
                  ) {
                    onDelete(note.id);
                  }
                }}
                title="Delete note"
                aria-label="Delete note"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedNote: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList;
