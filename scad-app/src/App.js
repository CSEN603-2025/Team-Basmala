// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CompanyDashboard from './CompanyDashboard';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div style={{ marginLeft: '100px', padding: '20px' }}>
          <Routes>
            <Route path="./CompanyDashboard" element={<CompanyDashboard/>} />
        
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
