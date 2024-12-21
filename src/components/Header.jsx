import React from "react";

function Header({ onLogout }) {
  return (
    <header>
      <button className="logout-button" onClick={onLogout}>
        Log Out
      </button>
    </header>
  );
}

export default Header;
