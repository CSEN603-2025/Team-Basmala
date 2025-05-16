'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import styles from './DashboardSCAD.module.css';
import InternshipPosts from '@/app/Aswar/Components/InternshipPosts/InternshipPosts';
import ApplicationStatusChart from '../Components/ApplicationStatusChart/ApplicationStatusChart';
import NotificationList from '../Components/NotificationListSmall/NotificationListSmall';
import DashboardQuickButtons from '../Components/DashboardQuickButtons/DashboardQuickButtons';
import NewApplicantsCompany from '../Components/NewApplicantsCompany/NewApplicantsCompany';
import NewApplicantsSCAD from '../Components/NewApplicantsSCAD/NewApplicantsSCAD';

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

      <div className={styles.mainContent}>
  <div className={styles.topRow}>
    <DashboardQuickButtons />
    <NotificationList />
  </div>

  <div className={styles.dashboardSpacing}>
    <div className={styles.dashboardContent}>
      <ApplicationStatusChart />
      <InternshipPosts internships={internships} />
      <NewApplicantsSCAD />
    </div>
  </div>
</div>

    </>
  );
}
