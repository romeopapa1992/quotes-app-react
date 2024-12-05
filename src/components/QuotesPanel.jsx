import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateQuote from "./CreateQuote";
import Quote from "./Quote";

function QuotesPanel() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quotes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQuotes(response.data);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      }
    };
    fetchQuotes();
  }, []);

  const addQuote = async (newQuote) => {
    try {
      const response = await axios.post("http://localhost:5000/api/quotes", newQuote, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setQuotes((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to add quote", error);
    }
  };

  const deleteQuote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/quotes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setQuotes((prev) => prev.filter((quote) => quote.id !== id));
    } catch (error) {
      console.error("Failed to delete quote", error);
    }
  };

  return (
    <div>
      <CreateQuote onAdd={addQuote} />
      {quotes.map((quote) => (
        <Quote key={quote.id} id={quote.id} text={quote.text} onDelete={deleteQuote} />
      ))}
    </div>
  );
}

export default QuotesPanel;
