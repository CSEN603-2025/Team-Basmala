'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './backButton.module.css'; // Create a CSS file for styling

export default function BackButton() {
  const router = useRouter();

  return (
    <button className={styles.backButton} onClick={() => router.back()}>
      ← Back
    </button>
  );
}