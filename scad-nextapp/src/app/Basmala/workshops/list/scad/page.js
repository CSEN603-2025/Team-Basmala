'use client';
import { useState, useEffect } from 'react';
import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import ToolbarSCAD from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarSCAD';
import WorkshopForm from '../../components/WorkshopForm';
import styles from './page.module.css';

const DUMMY_WORKSHOPS = [
  {
    id: 1,
    title: "Resume Writing Workshop",
    date: "2024-03-25",
    startTime: "14:00",
    endTime: "15:00",
    duration: "1 hour",
    capacity: 30,
    enrolled: 15,
    status: "upcoming",
    presenter: "Sarah Johnson",
    description: "Learn how to create an effective resume that stands out to employers.",
    speakerBio: "Dr. Sarah Johnson is a career development expert with over 10 years of experience.",
    agenda: "1. Introduction to Resume Writing\n2. Key Components\n3. Best Practices\n4. Q&A Session"
  }
];

export default function SCADWorkshopsPage() {
  const [workshops, setWorkshops] = useState(DUMMY_WORKSHOPS);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);

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
    setEditingWorkshop(null);
    setShowForm(true);
  };

  const handleEditWorkshop = (workshop) => {
    setEditingWorkshop(workshop);
    setShowForm(true);
  };

  const handleDeleteWorkshop = (workshopId) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      // In real implementation, this would call an API
      setWorkshops(workshops.filter(w => w.id !== workshopId));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingWorkshop) {
      // Update existing workshop
      setWorkshops(workshops.map(w => 
        w.id === editingWorkshop.id ? { ...formData, id: w.id } : w
      ));
    } else {
      // Add new workshop
      setWorkshops([...workshops, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingWorkshop(null);
  };

  return (
    <div className={styles.pageContainer}>
      <ToolbarSCAD />
      <div className={styles.contentWrapper}>
        <SidebarSCAD />
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
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className={styles.workshopGrid}>
              {workshops.map(workshop => (
                <div key={workshop.id} className={styles.workshopCard}>
                  <div className={styles.workshopHeader}>
                    <h2>{workshop.title}</h2>
                    <span className={`${styles.status} ${styles[workshop.status]}`}>
                      {workshop.status}
                    </span>
                  </div>
                  
                  <div className={styles.workshopDetails}>
                    <p className={styles.datetime}>
                      {formatDateTime(workshop.date, workshop.startTime)}
                    </p>
                    <p className={styles.duration}>Duration: {workshop.duration}</p>
                    <p className={styles.presenter}>Presenter: {workshop.presenter}</p>
                    <p className={styles.description}>{workshop.description}</p>
                    
                    <div className={styles.adminInfo}>
                      <p>Capacity: {workshop.enrolled}/{workshop.capacity}</p>
                      <div className={styles.adminActions}>
                        <button 
                          className={styles.editButton}
                          onClick={() => handleEditWorkshop(workshop)}
                        >
                          Edit
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDeleteWorkshop(workshop.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showForm && (
              <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                  <WorkshopForm
                    workshop={editingWorkshop}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingWorkshop(null);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 