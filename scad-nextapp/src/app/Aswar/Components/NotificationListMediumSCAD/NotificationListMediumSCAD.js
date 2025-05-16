'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './NotificationListMedium.module.css';

const defaultNotifications = [
  {
    id: 1,
    app: 'SCAD',
    title: 'New Notification',
    message: 'Your application has been accepted successfully.',
    datetime: '2025-05-14 10:32 AM',
  },
  {
    id: 2,
    app: 'SCAD',
    title: 'Post Updated',
    message: 'Your internship posting ‘Data Science Intern’ has been updated successfully.',
    datetime: '2025-05-13 04:12 PM',
  },
  {
    id: 3,
    app: 'SCAD',
    title: 'Application Received',
    message: 'You have a new application for your Microsoft Internship opportunity.',
    datetime: '2025-05-15 02:15 PM',
  },
];

export default function NotificationListMediumSCAD({
  notifications = defaultNotifications,
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notifications</h3>
        <button
          className={styles.seeAll}
          onClick={() => router.push('/Aswar/NotificationsPageSCAD')}
        >
          See all
        </button>
      </div>

      {notifications.map(({ id, app, title, message, datetime }) => (
        <div key={id} className={styles.card}>
          <div className={styles.cardHeader}>
            <strong className={styles.cardTitle}>{title}</strong>
            <span className={styles.cardDatetime}>{datetime}</span>
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardApp}>{app}</span>
            <p className={styles.cardMessage}>{message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
