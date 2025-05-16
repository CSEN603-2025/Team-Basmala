'use client';
import React, { useState } from 'react';
import { FaTrashAlt, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import styles from './notificationsPage.module.css';
import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

const defaultNotifications = [
  {
    id: 1,
    title: 'Appointment Confirmed',
    message: 'John Doe has confirmed the appointment.',
    datetime: '2025-05-16 09:00 AM',
    receivedFrom: 'Student',
    read: false,
  },
  {
    id: 2,
    title: 'Appointment Confirmed',
    message: 'Jane Smith has confirmed the appointment.',
    datetime: '2025-05-15 02:30 PM',
    receivedFrom: 'Student',
    read: false,
  },
];

export default function NotificationsPageSCAD() {
  const [notifications, setNotifications] = useState(defaultNotifications);
  const markAllRead = () =>
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  const toggleRead = (id) =>
    setNotifications((n) =>
      n.map((x) => (x.id === id ? { ...x, read: !x.read } : x))
    );
  const deleteNotification = (id) =>
    setNotifications((n) => n.filter((x) => x.id !== id));
  const seeAll = () => window.alert('Redirect to full notifications page');

  return (
    <>
      <SidebarSCAD activeItem="Notifications" />
      <Toolbar title="Notifications" />
      
      <div className={styles.notificationsPage}>
        <div className={styles.notificationsHeader}>
          <h2 className={styles.notificationsTitle}>Notifications</h2>
          <div className={styles.notificationsActions}>
            <button
              className={styles.actionButton}
              onClick={markAllRead}
            >
              Mark all as read
            </button>
            <button
              className={`${styles.actionButton} ${styles.seeAll}`}
              onClick={seeAll}
            >
              See all
            </button>
          </div>
        </div>

        <div className={styles.notificationsList}>
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`${styles.notificationCard} ${
                n.read ? styles.read : styles.unread
              }`}
            >
              <div className={styles.cardHeader}>
                <strong className={styles.cardTitle}>{n.title}</strong>
                <span className={styles.cardDatetime}>{n.datetime}</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardMessage}>{n.message}</p>
                <span className={styles.cardReceivedFrom}>
                  Received from: {n.receivedFrom}
                </span>
                <div className={styles.notificationOptions}>
                  <button
                    className={styles.optionButton}
                    onClick={() => toggleRead(n.id)}
                    title={n.read ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {n.read ? <FaEnvelope /> : <FaEnvelopeOpen />}
                  </button>
                  <button
                    className={styles.optionButton}
                    onClick={() => deleteNotification(n.id)}
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
