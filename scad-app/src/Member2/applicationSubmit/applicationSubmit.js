'use client';

import React from 'react';
import styles from './applicationSubmit.module.css';

export default function ApplicationSubmit() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thanks for Applying!</h1>
      <p className={styles.message}>We have received your application. Please wait for our email regarding the next steps.</p>
    </div>
  );
}
