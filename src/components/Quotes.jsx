import React, { useState } from "react";

function Quotes({ onAdd }) {
  const [content, setContent] = useState("");
  const [source, setSource] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || !source.trim()) {
      alert("Both quote text and source are required.");
      return;
    }
    onAdd({ content, source });
    setContent("");
    setSource(""); 
  };

  return (
    <div className="container">
      <h1 className="title">Add a Quote</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your favorite quote..."
        />
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Who said it?"
        />
        <button type="submit">Add Quote</button>
      </form>
    </div>
  );
}

export default Quotes;
