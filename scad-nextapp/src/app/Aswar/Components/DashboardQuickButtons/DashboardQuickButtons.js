'use client';

import React from 'react';
import { FaPlus, FaCalendarAlt, FaClipboardCheck } from 'react-icons/fa';
import styles from './DashboardQuickButtons.module.css';

export default function DashboardQuickButtons({
  onNewPost = () => {},
  onSchedule = () => {},
  onEvaluate = () => {},
}) {
  return (
    <div className={styles.actionsRow}>
      <button className={styles.roundButton} onClick={onNewPost}>
        <FaPlus className={styles.icon} />
        New Internship Post
      </button>
      <button className={styles.roundButton} onClick={onSchedule}>
        <FaCalendarAlt className={styles.icon} />
        Schedule An Appointment
      </button>
      <button className={styles.roundButton} onClick={onEvaluate}>
        <FaClipboardCheck className={styles.icon} />
        New Student Evaluation
      </button>
    </div>
  );
}
