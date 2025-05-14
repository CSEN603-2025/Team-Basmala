'use client';

import React from 'react';
import styles from './myApplications.module.css';

export default function MyApplications() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Applications</h1>
      <p className={styles.subtitle}>Here are the internships you've applied for. (This is a placeholder for now.)</p>

      {/* Later: You can dynamically list the applications from storage or backend here */}
    </div>
  );
}
