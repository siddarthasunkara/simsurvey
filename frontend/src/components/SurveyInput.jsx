// React component SurveyInput
// Options: Upload a PDF file OR type questions manually
// If PDF uploaded, call http://127.0.0.1:8000/survey/upload with FormData
// Display the extracted questions
// If manual option selected, show a textarea to enter questions line by line

import React, { useState } from "react";
import axios from "axios";

const SurveyInput = ({ onQuestions }) => {
  const [mode, setMode] = useState("pdf"); // "pdf" or "manual"
  const [file, setFile] = useState(null);
  const [manualText, setManualText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setQuestions([]);
    setError("");
  };

  const handleManualChange = (e) => {
    setManualText(e.target.value);
    setQuestions([]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/survey/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setQuestions(res.data.questions || []);
      if (onQuestions) onQuestions(res.data.questions || []);
    } catch (err) {
      setError("Failed to extract questions from PDF.");
    }
    setLoading(false);
  };

  const handleManualSubmit = () => {
    const qs = manualText
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);
    setQuestions(qs);
    if (onQuestions) onQuestions(qs);
  };

  return (
    <div>
      <h3>Survey Questions Input</h3>
      <div>
        <label>
          <input
            type="radio"
            checked={mode === "pdf"}
            onChange={() => {
              setMode("pdf");
              setQuestions([]);
              setError("");
            }}
          />
          Upload PDF
        </label>
        <label style={{ marginLeft: "1em" }}>
          <input
            type="radio"
            checked={mode === "manual"}
            onChange={() => {
              setMode("manual");
              setQuestions([]);
              setError("");
            }}
          />
          Enter Manually
        </label>
      </div>

      {mode === "pdf" && (
        <div style={{ marginTop: "1em" }}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <button onClick={handleUpload} disabled={loading || !file}>
            {loading ? "Extracting..." : "Extract Questions"}
          </button>
        </div>
      )}

      {mode === "manual" && (
        <div style={{ marginTop: "1em" }}>
          <textarea
            rows={8}
            cols={50}
            placeholder="Enter one question per line"
            value={manualText}
            onChange={handleManualChange}
          />
          <br />
          <button onClick={handleManualSubmit}>Submit Questions</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {questions.length > 0 && (
        <div style={{ marginTop: "1em" }}>
          <h4>Extracted Questions:</h4>
          <ol>
            {questions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SurveyInput;
