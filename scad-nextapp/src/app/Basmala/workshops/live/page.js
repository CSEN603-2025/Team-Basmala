'use client';
import { useState } from 'react';
import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import ToolbarPro from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';
import styles from './page.module.css';
import { FaVideo, FaSave, FaDownload } from 'react-icons/fa';

const DUMMY_LIVE_WORKSHOPS = [
  {
    id: 1,
    title: "Career Planning Workshop",
    date: "2024-04-20",
    time: "14:00",
    duration: "90 minutes",
    presenter: "Dr. Sarah Johnson",
    description: "Join us for an interactive session on planning your career path.",
    meetingUrl: "https://meet.example.com/career-planning",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Networking Skills Workshop",
    date: "2024-04-22",
    time: "15:30",
    duration: "60 minutes",
    presenter: "Prof. Michael Brown",
    description: "Learn effective networking strategies for professional growth.",
    meetingUrl: "https://meet.example.com/networking",
    status: "upcoming"
  }
];

export default function LiveWorkshopsPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState({});

  const handleJoinWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setNotes(savedNotes[workshop.id] || '');
  };

  const handleSaveNotes = () => {
    if (selectedWorkshop) {
      setSavedNotes(prev => ({
        ...prev,
        [selectedWorkshop.id]: notes
      }));
      // Here you would typically save to a backend
      alert('Notes saved successfully!');
    }
  };

  const handleDownloadNotes = () => {
    if (!notes) return;

    const element = document.createElement('a');
    const file = new Blob([notes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedWorkshop.title}-notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDateTime = (date, time) => {
    return new Date(`${date}T${time}`).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className={styles.pageContainer}>
      <ToolbarPro />
      <div className={styles.contentWrapper}>
        <SidebarPRO activeItem="Workshops" />
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <h1 className={styles.title}>Live Workshops</h1>

            <div className={styles.workshopsLayout}>
              <div className={styles.workshopsList}>
                {DUMMY_LIVE_WORKSHOPS.map((workshop) => (
                  <div key={workshop.id} className={styles.workshopCard}>
                    <div className={styles.workshopInfo}>
                      <h2>{workshop.title}</h2>
                      <p className={styles.datetime}>
                        {formatDateTime(workshop.date, workshop.time)}
                      </p>
                      <p className={styles.presenter}>
                        Presenter: {workshop.presenter}
                      </p>
                      <p className={styles.duration}>
                        Duration: {workshop.duration}
                      </p>
                      <p className={styles.description}>
                        {workshop.description}
                      </p>
                    </div>
                    <button
                      className={styles.joinButton}
                      onClick={() => handleJoinWorkshop(workshop)}
                    >
                      <FaVideo />
                      Join Workshop
                    </button>
                  </div>
                ))}
              </div>

              {selectedWorkshop && (
                <div className={styles.notesSection}>
                  <div className={styles.notesHeader}>
                    <h2>{selectedWorkshop.title} - Notes</h2>
                    <div className={styles.notesActions}>
                      <button
                        className={styles.actionButton}
                        onClick={handleSaveNotes}
                        title="Save Notes"
                      >
                        <FaSave />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={handleDownloadNotes}
                        title="Download Notes"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                  <textarea
                    className={styles.notesTextarea}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take your notes here..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 