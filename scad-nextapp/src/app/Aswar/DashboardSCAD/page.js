'use client';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function DashboardSCAD() {
  return (
    <>
      <SidebarSCAD activeItem="Dashboard" />
      <Toolbar title="Dashboard"/>
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        

        YOUR CONTENT GOES HERE -scad-


      </div>
    </>
  );
}

