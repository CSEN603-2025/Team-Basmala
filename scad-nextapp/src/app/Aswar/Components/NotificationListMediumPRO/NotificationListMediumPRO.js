'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './NotificationListMedium.module.css';

const defaultNotifications = [
  // PRO‐students get the same cycle + report + appointment + workshop + messages
  {
    id: 1,
    app: 'SCAD',
    title: 'New Cycle Started',
    message: 'The new internship cycle began today.',
    datetime: '2025-06-01 09:00 AM',
  },
  {
    id: 2,
    app: 'SCAD',
    title: 'Cycle Starting Soon',
    message: 'Your next internship cycle begins in 3 days.',
    datetime: '2025-05-28 08:00 AM',
  },
  {
    id: 3,
    app: 'SCAD',
    title: 'Report Reviewed',
    message: 'Your internship report status has been set to Reviewed.',
    datetime: '2025-05-14 02:15 PM',
  },
  {
    id: 4,
    app: 'SCAD',
    title: 'Appointment Confirmed',
    message: 'Your appointment has been accepted by the SCAD officer.',
    datetime: '2025-05-15 10:30 AM',
  },
  {
    id: 5,
    app: 'SCAD',
    title: 'Incoming Call',
    message: 'You have an incoming call from Jane Doe.',
    datetime: '2025-05-16 11:00 AM',
  },
  {
    id: 6,
    app: 'SCAD',
    title: 'Workshop Reminder',
    message: 'Your “Advanced UX” workshop starts tomorrow at 2:00 PM.',
    datetime: '2025-05-18 09:00 AM',
  },
  {
    id: 7,
    app: 'SCAD',
    title: 'New Message',
    message: 'An attendee sent you a message about the workshop.',
    datetime: '2025-05-14 04:45 PM',
  },
];

export default function NotificationListMediumPRO({
  notifications = defaultNotifications,
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notifications</h3>
        <button
          className={styles.seeAll}
          onClick={() => router.push('/Aswar/NotificationsPagePRO')}
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
