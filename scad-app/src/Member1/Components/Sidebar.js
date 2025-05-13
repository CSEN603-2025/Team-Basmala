
// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Ensure this file exists

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="SCAD Logo" />
      </div>
      <nav className="nav-links">
        <Link to="/dashboard">
          <img src="/icons/dashboard.png" alt="Dashboard" />
          <span>Dashboard</span>
        </Link>
        <Link to="/internships">
          <img src="/icons/internship-listings.png" alt="Internship Listings" />
          <span>Internship Listings</span>
        </Link>
        <Link to="/applications">
          <img src="/icons/applications.png" alt="Applications" />
          <span>Applications</span>
        </Link>
        <Link to="/interns">
          <img src="/icons/interns.png" alt="Interns" />
          <span>Interns</span>
        </Link>
        <Link to="/reports">
          <img src="/icons/reports.png" alt="Reports" />
          <span>Reports</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
