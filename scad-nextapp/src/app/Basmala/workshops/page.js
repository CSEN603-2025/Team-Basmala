'use client';
import { useRouter } from 'next/navigation';
import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import ToolbarPro from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';
import styles from './page.module.css';
import { FaListAlt, FaVideo, FaChalkboardTeacher } from 'react-icons/fa';

export default function WorkshopsPage() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.pageContainer}>
      <ToolbarPro />
      <div className={styles.contentWrapper}>
        <SidebarPRO activeItem="Workshops" />
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <h1 className={styles.title}>Career Development Workshops</h1>
            <div className={styles.buttonGrid}>
              <button 
                className={styles.workshopButton}
                onClick={() => handleNavigation('/Basmala/workshops/list/student')}
              >
                <div className={styles.buttonIcon}>
                  <FaListAlt />
                </div>
                <h2>Available Workshops</h2>
                <p>Browse and register for upcoming career workshops</p>
              </button>

              <button 
                className={styles.workshopButton}
                onClick={() => handleNavigation('/Basmala/workshops/recorded')}
              >
                <div className={styles.buttonIcon}>
                  <FaVideo />
                </div>
                <h2>Pre-recorded Workshops</h2>
                <p>Watch career development videos at your own pace</p>
              </button>

              <button 
                className={styles.workshopButton}
                onClick={() => handleNavigation('/Basmala/workshops/live')}
              >
                <div className={styles.buttonIcon}>
                  <FaChalkboardTeacher />
                </div>
                <h2>Live Workshop Notes</h2>
                <p>Take notes during live workshop sessions</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 