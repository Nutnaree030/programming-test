// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [record, setRecord] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:5000/api/recordings')
      .then((response) => response.json())
      .then((data) => setRecord(data));
  }, []);

  return (
    <div className="App">
      <h1>Recording</h1>
      <ul>
        {record.map((rec) => (
          <li key={rec.recordId}>
            {rec.workName} - start: {rec.startTime} end: {rec.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
