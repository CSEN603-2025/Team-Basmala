'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './NotificationListMediumSCAD.module.css';

const defaultNotifications = [
  {
    id: 1,
    app: 'Student',
    title: 'Appointment Accepted',
    message: 'John Doe has accepted the appointment.',
    datetime: '2025-05-16 09:15 AM',
  },
  {
    id: 2,
    app: 'Student',
    title: 'Appointment Accepted',
    message: 'Jane Smith has accepted the appointment.',
    datetime: '2025-05-15 02:45 PM',
  },
  {
    id: 3,
    app: 'Student',
    title: 'Appointment Accepted',
    message: 'Michael Lee has accepted the appointment.',
    datetime: '2025-05-14 11:30 AM',
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
