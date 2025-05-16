'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import styles from './DashboardPRO.module.css';
import InternshipPostsStudent from '../Components/InternshipPostsStudent/InternshipPostsStudent';
import PROStudentInternshipProgress from '../Components/PROStudentInternshipProgress/PROStudentInternshipProgress';

import DashboardQuickButtons from '../Components/DashboardQuickButtons/DashboardQuickButtons';
import CompaniesViewedProfile from '../Components/CompaniesViewedProfile/CompaniesViewedProfile';
import CallAlert from '../Components/CallAlert/page';
import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationCardPRO from '../Components/NotificationCardPRO/NotificationCardPRO';
import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import ToolbarPro from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';
const internships = [
  { title: 'Frontend Development Internship', startDate: '2025-06-01', endDate: '2025-08-31', status: 'Accepted' },
  { title: 'Backend Development Internship',  startDate: '2025-07-01', endDate: '2025-09-30', status: 'Pending' },
  { title: 'Data Science Internship',         startDate: '2025-08-01', endDate: '2025-10-31', status: 'Rejected' },
  { title: 'UI/UX Design Internship',         startDate: '2025-09-01', endDate: '2025-11-30', status: 'Accepted' },
];

export default function DashboardPRO() {
    const [showCall, setShowCall] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowCall(true);
      }, 6000); // 6 seconds
      return () => clearTimeout(timer);
    }, []);
  
    return (
    <>
      <SidebarPRO activeItem="Dashboard" />
      <ToolbarPro title="Dashboard" />

      <div className={styles.mainContent}>
        <div className={styles.topRow}>
          <DashboardQuickButtons />
          <NotificationCardPRO />
        </div>

        <div className={styles.dashboardSpacing}>
          <div className={styles.dashboardContent}>
            <InternshipPostsStudent internships={internships} />

            {/* PRO Student Progress */}
            <PROStudentInternshipProgress
              daysCompleted={90}
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
                }
              ]}
            />

            {/* Companies that viewed your profile */}
            <CompaniesViewedProfile
              viewers={[
                {
                  name: 'Tesla',
                  logoUrl: 'https://logo.clearbit.com/tesla.com',
                  dateViewed: 'May 16, 2025 · 11:15 AM'
                },
                {
                  name: 'Netflix',
                  logoUrl: 'https://logo.clearbit.com/netflix.com',
                  dateViewed: 'May 15, 2025 · 09:30 AM'
                },
                {
                  name: 'Airbnb',
                  logoUrl: 'https://logo.clearbit.com/airbnb.com',
                  dateViewed: 'May 14, 2025 · 04:20 PM'
                }
              ]}
              onSeeAll={() => alert('Redirect to full viewers list')}
            />
          </div>
        </div>
        {showCall && (
          <div className={styles.callAlertWrapper}>
            <CallAlert
              student={{
                name: 'Ethan Parker - SCAD', 
                avatar: '/applicant4.avif',
              }}
              onDecline={() => setShowCall(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}
