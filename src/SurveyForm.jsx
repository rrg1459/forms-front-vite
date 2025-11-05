import { useState } from "react";

function SurveyForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/v1/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ survey: { title, description } }),
    })
    .then(res => res.json())
    .then(data => {
      alert('Encuesta creada con ID ' + data.id);
      // Notify parent so it can update its list without a refresh
      if (onCreate) onCreate(data);
      // reset form
      setTitle('');
      setDescription('');
    })
    .catch(err => {
      console.error('Error creating survey', err);
      alert('Error al crear la encuesta');
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input type="text" value={title} placeholder="Título." onChange={e => setTitle(e.target.value)} required />
      <br />
      <textarea value={description} placeholder="Descripción" onChange={e => setDescription(e.target.value)} />
      <br />
      <button type="submit">Crear Encuesta</button>
    </form>
  );
}

export { SurveyForm };