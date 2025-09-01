// React component that fetches personas from http://127.0.0.1:8000/api/personas
// Display them as a list of checkboxes
// Allow user to select multiple personas and return the selected ones

import React, { useEffect, useState } from "react";
import axios from "axios";

const PersonaSelector = ({ onChange }) => {
  const [personas, setPersonas] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/personas")
      .then((res) => setPersonas(res.data))
      .catch((err) => console.error("Failed to fetch personas:", err));
  }, []);

  const handleCheckbox = (persona) => {
    let updated;
    if (selected.includes(persona)) {
      updated = selected.filter((p) => p !== persona);
    } else {
      updated = [...selected, persona];
    }
    setSelected(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div>
      <h3>Select Personas</h3>
      {personas.length === 0 && <p>No personas found.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {personas.map((persona) => (
          <li key={persona}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(persona)}
                onChange={() => handleCheckbox(persona)}
              />
              {persona}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonaSelector;
