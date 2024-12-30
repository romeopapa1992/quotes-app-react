import React, { useState } from "react";
import { validateQuote } from "../services/validation";

function Quotes({ onAdd }) {
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [errors, setErrors] = useState({});

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setErrors((prev) => ({ ...prev, content: "" })); 
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    setErrors((prev) => ({ ...prev, source: "" })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateQuote(content, source);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAdd({ content, source });
    setContent("");
    setSource("");
    setErrors({}); 
  };

  return (
    <div className="container">
      <h1 className="title">Add a Quote</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your favorite quote..."
            className={errors.content ? "error" : ""}
          />
          {errors.content && (
            <span className="error-text">{errors.content}</span>
          )}
        </div>
        <div className="input-group">
          <input
            type="text"
            value={source}
            onChange={handleSourceChange}
            placeholder="Who said it?"
            className={errors.source ? "error" : ""}
          />
          {errors.source && <span className="error-text">{errors.source}</span>}
        </div>
        <button type="submit">Add Quote</button>
      </form>
    </div>
  );
}

export default Quotes;
