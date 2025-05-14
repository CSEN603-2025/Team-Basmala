'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function DashboardPRO() {
  return (
    <>
      <SidebarPRO activeItem="Dashboard" />
      <Toolbar title="Dashboard"/>
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        

        YOUR CONTENT GOES HERE -pro student-


      </div>
    </>
  );
}

