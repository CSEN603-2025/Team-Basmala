'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import SidebarFacultyMem from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarFacultyMem';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function DashboardFacultyMem() {
  return (
    <>
      <SidebarFacultyMem activeItem="Dashboard" />
      <Toolbar title="Dashboard"/>
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        

        Welcome to the Faculty Member Dashboard!


      </div>
    </>
  );
}

