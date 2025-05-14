'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import SidebarStudent from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarStudent';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function DashboardStudent() {
  return (
    <>
      <SidebarStudent activeItem="Dashboard" />
      <Toolbar title="Dashboard"/>
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        

        YOUR CONTENT GOES HERE -student-


      </div>
    </>
  );
}

