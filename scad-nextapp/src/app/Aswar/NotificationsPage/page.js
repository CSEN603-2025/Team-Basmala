'use client';
import React, { useState } from 'react';
import { FaTrashAlt, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import styles from './notificationsPage.module.css';


const defaultNotifications = [
    {
      id: 1,
      title: 'PDF Ready',
      message: 'Your report “Monthly Internship Summary” is ready for download as a PDF.',
      datetime: '2025-05-16 11:20 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 2,
      title: 'Internship Completed',
      message: 'Jane Smith has successfully completed the Digital Marketing Assistant internship.',
      datetime: '2025-05-15 03:45 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 3,
      title: 'Post Deleted',
      message: 'Your internship posting “UI/UX Design Intern” has been removed.',
      datetime: '2025-05-14 09:10 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 4,
      title: 'Submission Received',
      message: 'Your company registration application has been submitted successfully and is pending review.',
      datetime: '2025-05-13 08:30 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 5,
      title: 'Application Withdrawn',
      message: 'An applicant has withdrawn their submission for “Backend Development Internship.”',
      datetime: '2025-05-12 05:00 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 6,
      title: 'Post Published',
      message: 'Your internship posting “Frontend Development Intern” has been published.',
      datetime: '2025-05-11 02:15 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 7,
      title: 'New Evaluation',
      message: 'An evaluation has been submitted for John Doe.',
      datetime: '2025-05-10 10:05 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 8,
      title: 'Approved',
      message: 'Congratulations! Your company registration on SCAD has been approved.',
      datetime: '2025-05-09 01:22 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 9,
      title: 'Pending Review',
      message: 'There are 6 new applications pending review for “Data Analysis Intern.”',
      datetime: '2025-05-08 11:50 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 10,
      title: 'Internship Started',
      message: 'John Doe has commenced the Frontend Development Internship.',
      datetime: '2025-05-07 09:00 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 11,
      title: 'Evaluation Finalized',
      message: 'Your evaluation for Jane Smith has been finalized.',
      datetime: '2025-05-06 04:30 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 12,
      title: 'Application Received',
      message: 'A new application has been received for your Microsoft Internship.',
      datetime: '2025-05-05 12:45 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 13,
      title: 'Rejected',
      message: 'We regret to inform you that your company registration on SCAD has been rejected.',
      datetime: '2025-05-04 08:15 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 14,
      title: 'Post Updated',
      message: 'Your internship posting “Data Science Intern” has been updated successfully.',
      datetime: '2025-05-03 03:05 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 15,
      title: 'Milestone Reached',
      message: 'Your “Digital Marketing Assistant” posting has now received 10 applications.',
      datetime: '2025-05-02 10:00 AM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 16,
      title: 'Accepted',
      message: 'You have marked John Doe’s application for “Frontend Development Internship” as Accepted.',
      datetime: '2025-05-01 02:30 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
    {
      id: 17,
      title: 'New Message',
      message: 'You have a new message from HR regarding your internship listings.',
      datetime: '2025-04-30 05:20 PM',
      receivedFrom: 'SCAD Notifications',
      read: false,
    },
  ];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(defaultNotifications);

  const markAllRead = () => {
    setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
  };

  const seeAll = () => {
    alert('Redirect to full notifications page');
  };

  const toggleRead = id => {
    setNotifications(notifs =>
      notifs.map(n =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  const deleteNotification = id => {
    setNotifications(notifs =>
      notifs.filter(n => n.id !== id)
    );
  };

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.notificationsHeader}>
        <h2 className={styles.notificationsTitle}>Notifications</h2>
        <div className={styles.notificationsActions}>
          <button className={styles.actionButton} onClick={markAllRead}>
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
        {notifications.map(n => (
          <div
            key={n.id}
            className={`${styles.notificationCard} ${n.read ? styles.read : styles.unread}`}
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
  );
}
