'use client';
import React, { useState } from 'react';
import { FaTrashAlt, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import styles from './notificationsPage.module.css';
import SidebarStudent from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarStudent';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import BackButton from '@/app/sharedComponents-Aswar/backButton/backButton';

const defaultNotifications = [
  {
    id: 1,
    title: 'New Cycle Started',
    message: 'The new internship cycle began today.',
    datetime: '2025-05-01 09:00 AM',
    receivedFrom: 'SCAD System',
    read: false,
  },
  {
    id: 2,
    title: 'Cycle Starting Soon',
    message: 'Your next internship cycle starts in 3 days.',
    datetime: '2025-05-27 09:00 AM',
    receivedFrom: 'SCAD System',
    read: false,
  },
  {
    id: 3,
    title: 'Report Status Updated',
    message: 'Your internship report status has been set to Reviewed.',
    datetime: '2025-05-14 02:45 PM',
    receivedFrom: 'Internship Coordinator',
    read: false,
  },
  {
    id: 4,
    title: 'Appointment Confirmed',
    message: 'Your appointment has been accepted by the SCAD officer.',
    datetime: '2025-05-15 11:20 AM',
    receivedFrom: 'SCAD Officer',
    read: false,
  },
  {
    id: 5,
    title: 'Incoming Call',
    message: 'You have an incoming call from Jane Doe.',
    datetime: '2025-05-16 10:00 AM',
    receivedFrom: 'SCAD System',
    read: false,
  },
  {
    id: 6,
    title: 'Workshop Reminder',
    message: 'Your registered workshop “Career Planning” starts tomorrow at 3 PM.',
    datetime: '2025-05-17 08:00 AM',
    receivedFrom: 'Events',
    read: false,
  },
  {
    id: 7,
    title: 'New Message',
    message: 'An attendee has sent you a message regarding the workshop.',
    datetime: '2025-05-14 04:30 PM',
    receivedFrom: 'Workshop Attendee',
    read: false,
  },
];

export default function NotificationsPageStudent() {
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
      <SidebarStudent activeItem="Notifications" />
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
