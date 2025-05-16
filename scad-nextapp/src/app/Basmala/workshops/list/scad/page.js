'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import ToolbarSCAD from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarSCAD';
import styles from './page.module.css';

const DUMMY_WORKSHOPS = [
  {
    id: 1,
    title: "Resume Writing Workshop",
    date: "2024-03-25",
    time: "14:00",
    duration: "1 hour",
    capacity: 30,
    enrolled: 15,
    status: "upcoming",
    presenter: "Sarah Johnson",
    description: "Learn how to create an effective resume that stands out to employers."
  },
  {
    id: 2,
    title: "Interview Skills Masterclass",
    date: "2024-03-28",
    time: "15:30",
    duration: "1.5 hours",
    capacity: 25,
    enrolled: 20,
    status: "upcoming",
    presenter: "Michael Brown",
    description: "Master the art of interviewing with practical tips and mock interviews."
  }
];

export default function SCADWorkshopsPage() {
  const [workshops, setWorkshops] = useState(DUMMY_WORKSHOPS);
  const [filter, setFilter] = useState('all');

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    // In real implementation, this would filter workshops based on status
  };

  const handleAddWorkshop = () => {
    // Implementation for adding new workshop
    console.log('Add new workshop');
  };

  const handleEditWorkshop = (workshopId) => {
    // Implementation for editing workshop
    console.log('Edit workshop:', workshopId);
  };

  const handleCancelWorkshop = (workshopId) => {
    // Implementation for canceling workshop
    console.log('Cancel workshop:', workshopId);
  };

  return (
    <div className={styles.pageContainer}>
      <ToolbarSCAD />
      <div className={styles.contentWrapper}>
        <SidebarCompany />
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <h1 className={styles.title}>Manage Career Workshops</h1>
            
            <div className={styles.adminControls}>
              <button 
                className={styles.addButton}
                onClick={handleAddWorkshop}
              >
                + Add New Workshop
              </button>
              <div className={styles.filterControls}>
                <select 
                  className={styles.filterSelect}
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Workshops</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
            </div>

            <div className={styles.workshopGrid}>
              {workshops.map(workshop => (
                <div key={workshop.id} className={styles.workshopCard}>
                  <div className={styles.workshopHeader}>
                    <h2>{workshop.title}</h2>
                    <span className={styles.status}>{workshop.status}</span>
                  </div>
                  
                  <div className={styles.workshopDetails}>
                    <p className={styles.datetime}>
                      {formatDateTime(workshop.date, workshop.time)}
                    </p>
                    <p className={styles.duration}>Duration: {workshop.duration}</p>
                    <p className={styles.presenter}>Presenter: {workshop.presenter}</p>
                    <p className={styles.description}>{workshop.description}</p>
                    
                    <div className={styles.adminInfo}>
                      <p>Capacity: {workshop.enrolled}/{workshop.capacity}</p>
                      <div className={styles.adminActions}>
                        <button 
                          className={styles.editButton}
                          onClick={() => handleEditWorkshop(workshop.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleCancelWorkshop(workshop.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 