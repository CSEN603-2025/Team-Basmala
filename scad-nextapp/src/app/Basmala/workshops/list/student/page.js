'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

const DUMMY_WORKSHOPS = [
  {
    id: 1,
    title: "Resume Writing Workshop",
    date: "2024-03-25",
    time: "14:00",
    duration: "1 hour",
    presenter: "Sarah Johnson",
    description: "Learn how to create an effective resume that stands out to employers."
  },
  {
    id: 2,
    title: "Interview Skills Masterclass",
    date: "2024-03-28",
    time: "15:30",
    duration: "1.5 hours",
    presenter: "Michael Brown",
    description: "Master the art of interviewing with practical tips and mock interviews."
  }
];

export default function StudentWorkshopsPage() {
  const [workshops, setWorkshops] = useState(DUMMY_WORKSHOPS);

  // This will be replaced with actual API call
  useEffect(() => {
    // Fetch workshops from API
    // setWorkshops(data);
  }, []);

  const formatDateTime = (date, time) => {
    const formattedDate = new Date(date + 'T' + time).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedDate;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upcoming Career Workshops</h1>
      
      <div className={styles.workshopGrid}>
        {workshops.map(workshop => (
          <div key={workshop.id} className={styles.workshopCard}>
            <div className={styles.workshopHeader}>
              <h2>{workshop.title}</h2>
              <span className={styles.status}>Upcoming</span>
            </div>
            
            <div className={styles.workshopDetails}>
              <p className={styles.datetime}>
                {formatDateTime(workshop.date, workshop.time)}
              </p>
              <p className={styles.duration}>Duration: {workshop.duration}</p>
              <p className={styles.presenter}>Presenter: {workshop.presenter}</p>
              <p className={styles.description}>{workshop.description}</p>
              
              <button className={styles.registerButton}>
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 