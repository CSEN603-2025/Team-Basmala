'use client';

import React, { useState } from 'react';
import styles from './CompanyCurrentInterns.module.css';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function CompanyCurrentInterns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCompletedId, setSelectedCompletedId] = useState(null);

  const [interns, setInterns] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      title: 'Frontend Intern',
      internshipName: 'Frontend Web Development Intern',
      status: 'current',
      startDate: '2025-04-01',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@sample.com',
      title: 'Backend Intern',
      internshipName: 'Backend Node.js Internship',
      status: 'complete',
      startDate: '2025-02-01',
    },
    {
      id: 3,
      name: 'Ali Hassan',
      email: 'ali@company.com',
      title: 'Data Analyst Intern',
      internshipName: 'Data Science Internship',
      status: 'current',
      startDate: '2025-03-15',
    },
    {
      id: 4,
      name: 'Mona Said',
      email: 'mona@firm.org',
      title: 'Marketing Intern',
      internshipName: 'Digital Marketing Campaigns',
      status: 'complete',
      startDate: '2025-01-10',
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setInterns((prev) =>
      prev.map((intern) =>
        intern.id === id ? { ...intern, status: newStatus } : intern
      )
    );
  };

  const toggleSelectCompleted = (id) => {
    setSelectedCompletedId((prevId) => (prevId === id ? null : id));
  };

  const filteredInterns = interns.filter((intern) => {
    const matchSearch =
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === '' || intern.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <>
      <SidebarCompany activeItem="CurrentInterns" />
      <Toolbar title="Current Interns" />
      <div className={styles.container}>
        <div className={styles.controlsRow}>
          <input
            type="text"
            placeholder="Search by name or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
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

        <div className={styles.internList}>
          {filteredInterns.map((intern) => (
            <div key={intern.id} className={styles.internCard}>
              <p><strong>Name:</strong> {intern.name}</p>
              <p><strong>Email:</strong> {intern.email}</p>
              <p><strong>Title:</strong> {intern.title}</p>
              <p><strong>Internship:</strong> {intern.internshipName}</p>
              <p><strong>Start Date:</strong> {intern.startDate}</p>
              <p><strong>Status:</strong> {intern.status}</p>

              <label>
                Set Status:{' '}
                <select
                  value={intern.status}
                  onChange={(e) => handleStatusChange(intern.id, e.target.value)}
                >
                  <option value="current">Current Intern</option>
                  <option value="complete">Internship Complete</option>
                </select>
              </label>

              {intern.status === 'complete' && (
                <button
                  className={styles.selectButton}
                  onClick={() => toggleSelectCompleted(intern.id)}
                >
                  {selectedCompletedId === intern.id ? 'Deselect Intern' : 'Select Completed Intern'}
                </button>
              )}

              {selectedCompletedId === intern.id && (
                <p className={styles.selectedMessage}>
                  ✅ This intern has been selected.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
