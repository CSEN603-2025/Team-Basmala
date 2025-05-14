'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import styles from './DashboardCompany.module.css';
import InternshipPosts from '@/app/Aswar/Components/InternshipPosts/InternshipPosts';

const internships = [
  { title: 'Frontend Development Internship', startDate: '2025-06-01', endDate: '2025-08-31', status: 'Accepted' },
  { title: 'Backend Development Internship', startDate: '2025-07-01', endDate: '2025-09-30', status: 'Pending' },
  { title: 'Data Science Internship', startDate: '2025-08-01', endDate: '2025-10-31', status: 'Rejected' },
  { title: 'UI/UX Design Internship', startDate: '2025-09-01', endDate: '2025-11-30', status: 'Accepted' },
];

export default function DashboardCompany() {
  return (
    <>
      <SidebarCompany activeItem="Dashboard" />
      <Toolbar title="Dashboard" />
      <InternshipPosts internships={internships} />
      <div style={{ marginLeft: '100px', marginTop: '90px', padding: '10px' }}>
        <button className={styles.actionButton}>New Internship Post</button>
        <button className={styles.actionButton}>Schedule An Appointment</button>
        <button className={styles.actionButton}>New Student Evaluation</button>
        {/* Application Status Chart */}
        <div className={styles.statusChartWrapper}>
          <div className={styles.chartBackground}></div>
          <div className={styles.barRejected}></div>
          <div className={styles.barPending}></div>
          <div className={styles.barAccepted}></div>
          <div className={styles.labelRejected}>Rejected</div>
          <div className={styles.labelPending}>Pending</div>
          <div className={styles.labelAccepted}>Accepted</div>
          <div className={styles.countRejected}>10</div>
          <div className={styles.countPending}>6</div>
          <div className={styles.countAccepted}>17</div>
          <div className={styles.chartTitle}>Application Status</div>
        </div>
      </div>
    </>
  );
}
