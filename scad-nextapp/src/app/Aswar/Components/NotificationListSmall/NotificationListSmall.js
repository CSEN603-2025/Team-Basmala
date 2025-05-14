import React from 'react';
import styles from './NotificationListSmall.module.css';

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
    title: 'New Message',
    message: 'You have a new message from HR.',
    datetime: '2025-05-13 04:12 PM',
  },
  {
    id: 3,
    app: 'SCAD',
    title: 'Reminder',
    message: 'Don’t forget your interview tomorrow at 2:00 PM.',
    datetime: '2025-05-12 09:00 AM',
  },
];

export default function NotificationList({
  notifications = defaultNotifications,
  onSeeAll = () => alert('See all clicked'),
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notifications</h3>
        <button className={styles.seeAll} onClick={onSeeAll}>
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
