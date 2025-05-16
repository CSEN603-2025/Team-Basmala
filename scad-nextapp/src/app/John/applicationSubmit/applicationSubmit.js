'use client';

import React from 'react';
import styles from './applicationSubmit.module.css';

import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarStudent';

export default function ApplicationSubmitPage() {
  return (
    <div className={styles.pageLayout}>
      <SidebarSCAD activeItem="Application Submit" />

      <div className={styles.mainContent}>
        <Toolbar title="Application Submitted" />

        <div className={styles.container}>
          <h1 className={styles.title}>Thanks for Applying!</h1>
          <p className={styles.message}>
            We have received your application. Please wait for our email regarding the next steps.
          </p>
        </div>
      </div>
    </div>
  );
}