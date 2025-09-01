import React from "react";

const ResultsPage = ({ personas = [], questions = [] }) => {
  return (
    <div>
      <h2>Results</h2>
      <div>
        <h3>Selected Personas</h3>
        {personas.length === 0 ? (
          <p>No personas selected.</p>
        ) : (
          <ul>
            {personas.map((persona, idx) => (
              <li key={idx}>{persona}</li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: "2em" }}>
        <h3>Survey Questions</h3>
        {questions.length === 0 ? (
          <p>No questions provided.</p>
        ) : (
          <ol>
            {questions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
