import React, { useState } from "react";

function CreateQuote({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your favorite quote..."
      />
      <button type="submit">Add Quote</button>
    </form>
  );
}

export default CreateQuote;
