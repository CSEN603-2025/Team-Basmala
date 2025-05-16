'use client';
import { FaHome, FaTasks, FaListAlt, FaUser, FaChartBar } from 'react-icons/fa'; // Import icons from react-icons
import styles from './sidebar.module.css';

export default function SidebarPRO({ activeItem }) {
  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, label: 'Dashboard' },
    { name: 'Internship Listings', icon: <FaListAlt />, label: 'Internships' },
    { name: 'Applications', icon: <FaTasks />, label: 'Applications' },
    { name: 'Interns', icon: <FaUser />, label: 'Interns' },
    { name: 'Reports', icon: <FaChartBar />, label: 'Reports' }
  ];

  const handleClick = (name) => {
    if (name === 'Dashboard') {
      router.push('/Aswar/DashboardStudent');
    }
    else if (name === 'Internship Listings') {
      router.push('/John/internships');
    } 
    else if (name === 'Applications') {
      router.push('/John/myApplications');
    } else {
      alert(`Clicked on ${name}`);
    }
  };
  
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>SCAD</h2>
      <h2 className={styles.PRO}> PRO</h2>
      <div className={styles.iconList}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.iconItem} ${activeItem === item.name ? styles.active : ''}`}
            onClick={() => handleClick(item.name)}
          >
            <div className={styles.iconContainer}>
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.label}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
