'use client';
import React from 'react';
import styles from './StudentInternshipProgress.module.css';

export default function StudentInternshipProgress({
  daysCompleted = 0,
  maxDays = 90,
  completedInternships = []
}) {
  const percent = Math.min(
    100,
    Math.round((daysCompleted / maxDays) * 100)
  );

  return (
    <div className={styles.card}>
      {/* Title */}
      <h3 className={styles.cardTitle}>3-Months Internship Progress</h3>

      {/* Row 1: Progress Bar */}
      <div className={styles.progressRow}>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {daysCompleted} / {maxDays} days
        </div>
      </div>

      {/* Completed Internships Section */}
      <h4 className={styles.listTitle}>Completed Internships</h4>
      <div className={styles.listRow}>
        <ul className={styles.internshipList}>
          {completedInternships.map(({ name, logoUrl }, idx) => (
            <li key={idx} className={styles.internshipItem}>
              <img
                src={logoUrl}
                alt={name}
                className={styles.logoImg}
              />
              <span className={styles.companyName}>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
