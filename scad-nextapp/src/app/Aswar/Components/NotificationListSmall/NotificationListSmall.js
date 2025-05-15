'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './NotificationListSmall.module.css';

const defaultNotifications = [
  {
    id: 1,
    app: 'SCAD',
    title: 'New Notification',
    message: 'Your application has been accepted successfully.',
    datetime: '2025-05-14 10:32 AM',
  }
];

export default function NotificationListSmall({
  notifications = defaultNotifications,
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notifications</h3>
        <button
          className={styles.seeAll}
          onClick={() => router.push('/Aswar/NotificationsPage')}
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
