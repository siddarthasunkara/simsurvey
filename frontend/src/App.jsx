import React, { useState } from "react";
import SurveyInput from "./components/SurveyInput";
import PersonaSelector from "./components/PersonaSelector";
import ResultsPage from "./components/ResultsPage";

const App = () => {
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [personas, setPersonas] = useState([]);

  const handleQuestions = (qs) => {
    setQuestions(qs);
    setStep(2);
  };

  const handlePersonas = (ps) => {
    setPersonas(ps);
  };

  const handleShowResults = () => {
    setStep(3);
  };

  const handleRestart = () => {
    setStep(1);
    setQuestions([]);
    setPersonas([]);
  };

  return (
    <div style={{ maxWidth: 700, margin: "2em auto", fontFamily: "sans-serif" }}>
      <h1>SimSurvey</h1>
      {step === 1 && (
        <div>
          <SurveyInput onQuestions={handleQuestions} />
        </div>
      )}
      {step === 2 && (
        <div>
          <PersonaSelector onChange={handlePersonas} />
          <button
            style={{ marginTop: "2em" }}
            onClick={handleShowResults}
            disabled={personas.length === 0}
          >
            Show Results
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <ResultsPage personas={personas} questions={questions} />
          <button style={{ marginTop: "2em" }} onClick={handleRestart}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
