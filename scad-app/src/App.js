import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EvaluationsStudent from './Member4/EvaluationsStudent';
import CoursesInMajor from './Member4/CoursesInMajor';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<EvaluationsStudent />} />
          <Route path="/courses-by-major" element={<CoursesInMajor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
