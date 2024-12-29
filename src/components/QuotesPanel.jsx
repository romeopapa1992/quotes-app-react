import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Quotes from "./Quotes";
import Unit from "./Unit";

function QuotesPanel() {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); 
        return;
      }

      try {
        await axios.get("http://localhost:3000/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Authentication failed:", error.response || error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/"); 
      }
    };

    checkAuthentication();

    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/quotes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQuotes(response.data);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      }
    };

    fetchQuotes();
  }, [navigate]);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("http://localhost:3000/refresh-token", {
        token: refreshToken,
      });
      localStorage.setItem("token", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error.response || error.message);
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/"); 
    }
  };

  const addQuote = async (newQuote) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post("http://localhost:3000/quotes", newQuote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuotes((prev) => [...prev, response.data]);
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn("Token expired, attempting to refresh...");
        const newToken = await refreshAccessToken();
        if (newToken) {
          const response = await axios.post("http://localhost:3000/quotes", newQuote, {
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
      await axios.delete(`http://localhost:3000/quotes/${id}`, {
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
        `http://localhost:3000/quotes/${id}`,
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
        {quotes.map((unit) => (
          <Unit
            key={unit.id}
            id={unit.id}
            content={unit.content}
            source={unit.source}
            onDelete={deleteQuote}
            onEdit={editQuote}
          />
        ))}
      </div>
    </div>
  );
}

export default QuotesPanel;

