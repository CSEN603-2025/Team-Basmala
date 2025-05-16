// page.js

'use client';

import React, { useState } from 'react';
import styles from './studentInternships.module.css';
import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

const dummyInternships = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechNova Solutions',
    date: '2024-06',
    status: 'current',
  },
  {
    id: 2,
    title: 'Data Analyst Intern',
    company: 'DataMetrics Inc.',
    date: '2023-12',
    status: 'complete',
  },
  {
    id: 3,
    title: 'Marketing Intern',
    company: 'Brandify',
    date: '2024-03',
    status: 'complete',
  },
];

export default function StudentInternships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = dummyInternships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter || internship.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleSelect = (id) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.pageLayout}>
      <SidebarSCAD activeItem="MyInternships" />
      <div className={styles.mainContent}>
        <Toolbar title="My Internships" />

        <h2 className={styles.title}>Internship History</h2>

        <div className={styles.controls}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="current">Current Intern</option>
            <option value="complete">Internship Complete</option>
          </select>
        </div>

        <div className={styles.internshipList}>
          {filtered.map((internship) => (
            <div key={internship.id} className={styles.card}>
              <p><strong>Title:</strong> {internship.title}</p>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Date:</strong> {internship.date}</p>
              <p><strong>Status:</strong> {internship.status}</p>
              {internship.status === 'complete' && (
                <button
                  className={`${styles.selectBtn} ${selectedId === internship.id ? styles.active : ''}`}
                  onClick={() => toggleSelect(internship.id)}
                >
                  {selectedId === internship.id ? 'Unselect' : 'Select'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
