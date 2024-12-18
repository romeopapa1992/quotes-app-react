import React, { useState } from "react";

function Unit({ id, content, source, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newSource, setNewSource] = useState(source);

  const handleSave = () => {
    onEdit(id, newContent, newSource);
    setIsEditing(false);
  };

  return (
    <div className="quote-card">
      {isEditing ? (
  <>
    <textarea
      value={newContent}
      onChange={(e) => setNewContent(e.target.value)}
      className="quote-edit-textarea"
    />
    <input
      type="text"
      value={newSource}
      onChange={(e) => setNewSource(e.target.value)}
      className="quote-edit-input"
    />
    <div className="button-group">
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  </>
) : (
  <>
    <div className="quote-content">"{content}"</div>
    <div className="quote-source">- {source}</div>
    <div className="quote-actions">
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  </>
)}
    </div>
  );
}

export default Unit;


