'use client';

import { useRouter } from 'next/navigation';
import { FaHome, FaTasks, FaListAlt, FaUser, FaChartBar } from 'react-icons/fa';
import styles from './sidebar.module.css';

export default function SidebarCompany({ activeItem }) {
  const router = useRouter();  // ← initialize router

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, label: 'Dashboard' },
    { name: 'Internship Listings', icon: <FaListAlt />, label: ' My Internships' },
    { name: 'All Internship Listings', icon: <FaListAlt />, label: 'All Internships' },
    { name: 'Applications', icon: <FaTasks />, label: 'Applications' },
    { name: 'Interns', icon: <FaUser />, label: 'Interns' },
    { name: 'Reports', icon: <FaChartBar />, label: 'Reports' }
  ];

  const handleClick = (name) => {
    if (name === 'Dashboard') {
      router.push('/Aswar/DashboardStudent');
    } else if (name === 'Internship Listings') {
      router.push('/John/CompanyViewIntern');
    } else if (name === 'Applications') {
      router.push('/John/myApplications');
    }else if (name === 'Interns') {
      router.push('/John/CompanyCurrentInterns');
    }
     else {
      alert(`Clicked on ${name}`);
    }
    
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>SCAD</h2>
      <div className={styles.iconList}>
        {menuItems.map((item, index) => (
          <div
            key={item.name}  // use a stable key
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
