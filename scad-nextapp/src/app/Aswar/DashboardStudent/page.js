'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import SidebarStudent from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarStudent';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import ToolbarStudent from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarStudent';

export default function DashboardStudent() {
  return (
    <>
      <SidebarStudent activeItem="Dashboard" />
      <ToolbarStudent title="Dashboard"/>
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        

        YOUR CONTENT GOES HERE -student-


      </div>
    </>
  );
}

