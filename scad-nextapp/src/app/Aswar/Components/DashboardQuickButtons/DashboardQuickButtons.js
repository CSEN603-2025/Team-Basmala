'use client';

import React from 'react';
import styles from './DashboardQuickButtons.module.css';

export default function DashboardQuickButtons({
  onNewPost = () => {},
  onSchedule = () => {},
  onEvaluate = () => {},
}) {
  return (
    <div className={styles.actionsRow}>
      <button className={styles.roundButton} onClick={onNewPost}>
        New Internship Post
      </button>
      <button className={styles.roundButton} onClick={onSchedule}>
        Schedule An Appointment
      </button>
      <button className={styles.roundButton} onClick={onEvaluate}>
        New Student Evaluation
      </button>
    </div>
  );
}
