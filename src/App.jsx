
import { useEffect, useState } from 'react'
import './App.css'
import { SurveyForm } from './SurveyForm'

function App() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/surveys')
      .then(res => res.json())
      .then(data => setSurveys(data));
  }, []);

  const handleCreate = (newSurvey) => {
    // If the API returns the created survey, add it to the list
    if (newSurvey && newSurvey.id) {
      setSurveys(prev => [newSurvey, ...prev]);
    } else {
      // fallback: re-fetch the list
      fetch('http://localhost:3000/api/v1/surveys')
        .then(res => res.json())
        .then(data => setSurveys(data));
    }
  };

  return (
    <div>
      <h1>Encuestas</h1>
      <SurveyForm onCreate={handleCreate} />
      <ul>
        {surveys.map(survey => (
          <li key={survey.id}>{survey.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
