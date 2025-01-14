import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Quotes from "./Quotes";
import EditQuoteForm from "./EditQuoteForm";
import { refreshAccessToken, getAccessToken, logout } from "../services/authService";

const API_URL = "https://apiquotes.romeopapa1992.org";

function QuotesPanel() {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getAccessToken();
      if (!token) {
        logout();
        navigate("/");
        return;
      }
    
      try {
        await axios.get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Authentication failed:", error);
        await refreshAccessToken();
        navigate("/");
      }
    };
    
    checkAuthentication();

    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`${API_URL}/quotes`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQuotes(response.data);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      }
    };

    fetchQuotes();
  }, [navigate]);

  const addQuote = async (newQuote) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(`${API_URL}/quotes`, newQuote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuotes((prev) => [...prev, response.data]);
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn("Token expired, attempting to refresh...");
        const newToken = await refreshAccessToken();
        if (newToken) {
          const response = await axios.post(`${API_URL}/quotes`, newQuote, {
            headers: { Authorization: `Bearer ${newToken}` },
          });
          setQuotes((prev) => [...prev, response.data]);
        }
      } else {
        console.error("Failed to add quote:", error.response || error.message);
        alert(error.response?.data?.message || "Failed to add quote");
      }
    }
  };

  const deleteQuote = async (id) => {
    try {
      await axios.delete(`${API_URL}/quotes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setQuotes((prev) => prev.filter((quote) => quote.id !== id));
    } catch (error) {
      console.error("Failed to delete quote", error);
    }
  };

  const editQuote = async (id, newContent, newSource) => {
    try {
      await axios.put(
        `${API_URL}/quotes/${id}`,
        { content: newContent, source: newSource },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setQuotes((prev) =>
        prev.map((quote) =>
          quote.id === id ? { ...quote, content: newContent, source: newSource } : quote
        )
      );
    } catch (error) {
      console.error("Failed to edit quote", error);
    }
  };

  return (
    <div>
      <Quotes onAdd={addQuote} />
      <div className="quotes-container">
        {quotes.map((quote) => (
          <EditQuoteForm
            key={quote.id}
            id={quote.id}
            content={quote.content}
            source={quote.source}
            onDelete={deleteQuote}
            onEdit={editQuote}
          />
        ))}
      </div>
    </div>
  );
}

export default QuotesPanel;

