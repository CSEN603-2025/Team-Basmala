'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import styles from './DashboardStudent.module.css';
import InternshipPostsStudent from '../Components/InternshipPostsStudent/InternshipPostsStudent';
import ApplicationStatusChart from '../Components/ApplicationStatusChart/ApplicationStatusChart';
import NotificationList from '../Components/NotificationListSmall/NotificationListSmall';
import DashboardQuickButtons from '../Components/DashboardQuickButtons/DashboardQuickButtons';
import NewApplicantsCompany from '../Components/NewApplicantsCompany/NewApplicantsCompany';
import StudentInternshipProgress from '../Components/StudentInternshipProgress/StudentInternshipProgress'
import NotificationCardStudent from '../Components/NotificationCardStudent/NotificationCardStudent';
import SidebarStudent from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarStudent';

const internships = [
  { title: 'Frontend Development Internship', startDate: '2025-06-01', endDate: '2025-08-31', status: 'Accepted' },
  { title: 'Backend Development Internship', startDate: '2025-07-01', endDate: '2025-09-30', status: 'Pending' },
  { title: 'Data Science Internship', startDate: '2025-08-01', endDate: '2025-10-31', status: 'Rejected' },
  { title: 'UI/UX Design Internship', startDate: '2025-09-01', endDate: '2025-11-30', status: 'Accepted' },
];

export default function DashboardStudent() {
  return (
    <>
      <SidebarStudent activeItem="Dashboard" />
      <Toolbar title="Dashboard" />

      <div className={styles.mainContent}>
  <div className={styles.topRow}>
    <DashboardQuickButtons />
    <NotificationCardStudent />

  </div>

  <div className={styles.dashboardSpacing}>
    <div className={styles.dashboardContent}>
     
      <InternshipPostsStudent internships={internships} />
      <StudentInternshipProgress
  daysCompleted={45}
  completedInternships={[
    { 
      name: 'Google', 
      logoUrl: 'https://logo.clearbit.com/google.com', 
      position: 'Frontend Developer'
    },
    { 
      name: 'Amazon', 
      logoUrl: 'https://logo.clearbit.com/amazon.com', 
      position: 'Data Analyst'
    },
    { 
      name: 'Microsoft', 
      logoUrl: 'https://logo.clearbit.com/microsoft.com', 
      position: 'UX Designer'
    },
  ]}
/>

    </div>
  </div>
</div>

    </>
  );
}
