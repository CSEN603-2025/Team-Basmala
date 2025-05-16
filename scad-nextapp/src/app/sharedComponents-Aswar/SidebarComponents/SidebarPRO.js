'use client';
import { useRouter } from 'next/navigation';
import { FaHome, FaTasks, FaListAlt, FaUser, FaChartBar } from 'react-icons/fa';
import styles from './sidebar.module.css';

export default function SidebarPRO({ activeItem }) {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, label: 'Dashboard' },
    { name: 'My Internships', icon: <FaListAlt />, label: 'My Internships' },
    { name: 'Available Internships', icon: <FaListAlt />, label: 'Available Internships' },
    { name: 'Applications', icon: <FaTasks />, label: 'Applications' },
    { name: 'Interns', icon: <FaUser />, label: 'Interns' },
    { name: 'Evaluate', icon: <FaChartBar />, label: 'Evaluate' },
    { name: 'Workshops',  icon: <FaChartBar />, label: 'Workshops',  path: '/Basmala/workshops/list/scad' }
  ];

  const handleClick = (name) => {
    if (name === 'Dashboard') {
      router.push('/Aswar/DashboardPRO');
    }  else if (name === 'Available Internships') {
      router.push('/John/internships');
    } 
    else if (name === 'My Internships') {
      router.push('/John/studentInternships');
    } 
    else if (name === 'Applications') {
      router.push('/John/myApplications')}
    else if (name === 'Evaluate') {
      router.push('/Mohamed/ProStudentsEvaluations');
  }else {
      alert(`Clicked on ${name}`);
    }
  };
  
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>SCAD</h2>
      <div className={styles.proBadge}>PRO</div>
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
