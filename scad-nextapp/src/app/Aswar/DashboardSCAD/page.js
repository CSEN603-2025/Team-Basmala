'use client';
import React, { useState, useEffect } from 'react';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import ToolbarSCAD from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarSCAD';
import styles from './DashboardSCAD.module.css';
import InternshipPosts from '@/app/Aswar/Components/InternshipPosts/InternshipPosts';
import ApplicationStatusChart from '../Components/ApplicationStatusChart/ApplicationStatusChart';
import NotificationList from '../Components/NotificationListSmall/NotificationListSmall';
import DashboardQuickButtons from '../Components/DashboardQuickButtons/DashboardQuickButtons';
import NewApplicantsCompany from '../Components/NewApplicantsCompany/NewApplicantsCompany';
import NewApplicantsSCAD from '../Components/NewApplicantsSCAD/NewApplicantsSCAD';
import CallAlert from '../Components/CallAlert/page';
import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';

const internships = [
  { title: 'Frontend Development Internship', startDate: '2025-06-01', endDate: '2025-08-31', status: 'Accepted' },
  { title: 'Backend Development Internship', startDate: '2025-07-01', endDate: '2025-09-30', status: 'Pending' },
  { title: 'Data Science Internship', startDate: '2025-08-01', endDate: '2025-10-31', status: 'Rejected' },
  { title: 'UI/UX Design Internship', startDate: '2025-09-01', endDate: '2025-11-30', status: 'Accepted' },
];

export default function DashboardSCAD() {
  const [showCall, setShowCall] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCall(true);
    }, 6000); // 6 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SidebarSCAD activeItem="Dashboard" />
      <ToolbarSCAD title="Dashboard" />

      <div className={styles.mainContent}>
        <div className={styles.topRow}>
          <DashboardQuickButtons />
        </div>
        <div className={styles.dashboardSpacing}>
          <div className={styles.dashboardContent}>
            <ApplicationStatusChart />
            <InternshipPosts
              internships={[
                { title: 'Frontend Development Internship', startDate: '2025-06-01', endDate: '2025-08-31', status: 'Accepted' },
                { title: 'Backend Development Internship', startDate: '2025-07-01', endDate: '2025-09-30', status: 'Pending' },
                { title: 'Data Science Internship', startDate: '2025-08-01', endDate: '2025-10-31', status: 'Rejected' },
                { title: 'UI/UX Design Internship', startDate: '2025-09-01', endDate: '2025-11-30', status: 'Accepted' },
              ]}
            />
            <NewApplicantsSCAD />
          </div>
        </div>
        {showCall && (
          <div className={styles.callAlertWrapper}>
            <CallAlert
              student={{
                name: 'John Smith',
                avatar: '/applicant1.jpeg',
              }}
              onDecline={() => setShowCall(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}