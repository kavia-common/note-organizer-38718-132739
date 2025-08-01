import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

// API endpoint for notes (integrate with notes_database)
const API_BASE = process.env.REACT_APP_API_URL || "/api";

// PUBLIC_INTERFACE
function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Fetch all categories
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((cats) => setCategories(cats))
      .catch(() => setCategories([]));
  }, []);

  // Fetch notes, with category and search filtering
  useEffect(() => {
    setLoading(true);
    const categoryFilter = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : "";
    const searchFilter = search ? `&search=${encodeURIComponent(search)}` : "";
    fetch(`${API_BASE}/notes?limit=100${categoryFilter}${searchFilter}`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => {
        setNotes([]);
        setLoading(false);
      });
  }, [selectedCategory, search, refresh]);

  // Select note handler
  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setCreating(false);
  };

  // Create new note handler
  const handleCreateNote = () => {
    setSelectedNote(null);
    setCreating(true);
  };

  // Delete note handler
  const handleDeleteNote = (id) => {
    fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" }).then(() => {
      setSelectedNote(null);
      setRefresh((r) => r + 1);
    });
  };

  // Save (create or update) note
  const handleSaveNote = (note) => {
    const isUpdate = !!note.id;
    const request = isUpdate
      ? fetch(`${API_BASE}/notes/${note.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        })
      : fetch(`${API_BASE}/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
    request.then(() => {
      setCreating(false);
      setSelectedNote(null);
      setRefresh((r) => r + 1);
    });
  };

  // Update category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedNote(null);
    setCreating(false);
  };

  // Search input handler
  const handleSearch = useCallback((val) => {
    setSearch(val);
  }, []);

  // PUBLIC_INTERFACE
  return (
    <div className="notebook-app">
      <Sidebar
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
        onCreateNote={handleCreateNote}
      />
      <main className="main">
        <Header
          search={search}
          onSearch={handleSearch}
          categories={categories}
          onCategoryChange={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <section className="main-content">
          <div className="notes-list-pane">
            <NoteList
              notes={notes}
              loading={loading}
              selectedNote={selectedNote}
              onSelect={handleNoteSelect}
              onDelete={handleDeleteNote}
            />
          </div>
          <div className="note-editor-pane">
            {(creating || selectedNote) ? (
              <NoteEditor
                note={selectedNote}
                onSave={handleSaveNote}
                onCancel={() => {
                  setCreating(false);
                  setSelectedNote(null);
                }}
                categories={categories}
              />
            ) : (
              <div className="no-note-selected">
                <p style={{ color: "#bbb", marginTop: "2em" }}>
                  Select or create a note to begin.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
