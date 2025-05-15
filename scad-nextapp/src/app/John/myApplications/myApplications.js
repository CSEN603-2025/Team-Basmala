'use client';

import React from 'react';
import styles from './myApplications.module.css';

const dummyApplications = [
  {
    id: 1,
    company: 'TechCorp',
    title: 'Frontend Developer Intern',
    status: 'Pending',
  },
  {
    id: 2,
    company: 'PwC',
    title: 'Audit Intern',
    status: 'Accepted',
  },
  {
    id: 3,
    company: 'HealthPlus',
    title: 'Data Analyst Intern',
    status: 'Rejected',
  },
  {
    id: 4,
    company: 'GreenTech',
    title: 'Sustainability Intern',
    status: 'Finalized',
  },
];

export default function MyApplications() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Applications</h1>
      <p className={styles.subtitle}>Here are the internships you've applied for:</p>

      <div className={styles.applicationsList}>
        {dummyApplications.map((application) => (
          <div key={application.id} className={styles.applicationCard}>
            <h3 className={styles.company}>{application.company}</h3>
            <p className={styles.title}>{application.title}</p>
            <p className={`${styles.status} ${styles[application.status.toLowerCase()]}`}>
              Status: {application.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}