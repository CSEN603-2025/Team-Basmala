'use client';
import { FaHome, FaTasks, FaListAlt, FaUser, FaChartBar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from './sidebar.module.css';

export default function SidebarSCAD({ activeItem }) {
  const router = useRouter();   // ← You must call this!

  const menuItems = [
    { name: 'Dashboard',        icon: <FaHome />,     label: 'Dashboard',        path: '/Aswar/DashboardSCAD' },
    { name: 'Internship Listings', icon: <FaListAlt />, label: 'Internships',     path: '/John/InternshipsSCAD' },
    { name: 'Applications',     icon: <FaTasks />,    label: 'Applications',     path: '/John/myApplications' },
    { name: 'Interns',          icon: <FaUser />,     label: 'Interns',          path: '/Mohamed/SCAD' },
    { name: 'Reports',          icon: <FaChartBar />, label: 'Reports',          path: '/Aswar/DashboardSCAD/reports' },
    { name: 'Workshops',          icon: <FaChartBar />, label: 'Workshops',          path: '/Basmala/workshops/list/scad' }
  ];

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>SCAD</h2>
      <div className={styles.iconList}>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`${styles.iconItem} ${activeItem === item.name ? styles.active : ''}`}
            onClick={() => handleClick(item.path)}
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
