'use client';
import React from 'react';
import styles from './PROStudentInternshipProgress.module.css';

export default function PROStudentInternshipProgress({
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

      {/* Progress Bar Row */}
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

      {/* PRO message when complete */}
      {percent === 100 && (
        <div className={styles.proMessage}>
          🎉 Congratulations! You are now a PRO student.
        </div>
      )}

      {/* Completed Internships */}
      <h4 className={styles.listTitle}>Completed Internships</h4>
      <ul className={styles.internshipList}>
        {completedInternships.map(({ name, logoUrl, position }, idx) => (
          <li key={idx} className={styles.internshipItem}>
            <img src={logoUrl} alt={name} className={styles.logoImg} />
            <div className={styles.internshipInfo}>
              <span className={styles.companyName}>{name}</span>
              <span className={styles.position}>{position}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
