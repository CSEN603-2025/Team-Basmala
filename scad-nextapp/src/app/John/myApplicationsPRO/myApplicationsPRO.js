'use client';

import React from 'react';
import styles from './myApplicationsPRO.module.css';

import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';
import BackButton from '@/app/sharedComponents-Aswar/backButton/backButton';

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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarSCAD activeItem="My Applications" />
      <div style={{ flex: 1 }}>
        <Toolbar title="My Applications" />
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>My Applications</h1>
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
        {/* Back button at the bottom left */}
        <div className={styles.backButtonContainer}>
          <BackButton />
        </div>
      </div>
    </div>
  );
}