'use client';
import React from 'react';
import styles from './ApplicationStatusChart.module.css';

export default function ApplicationStatusChart() {
  return (
    <div className={styles.statusChartWrapper}>
      <div className={styles.chartTitle}>Application Status</div>

      <div className={styles.barsContainer}>
        <div className={`${styles.bar} ${styles.barRejected}`}>
          <div className={styles.count}>10</div>
        </div>
        <div className={`${styles.bar} ${styles.barPending}`}>
          <div className={styles.count}>6</div>
        </div>
        <div className={`${styles.bar} ${styles.barAccepted}`}>
          <div className={styles.count}>17</div>
        </div>
      </div>

      <div className={styles.labelsContainer}>
        <span>Rejected</span>
        <span>Pending</span>
        <span>Accepted</span>
      </div>
    </div>
  );
}
