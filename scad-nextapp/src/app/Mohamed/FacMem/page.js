"use client";

import FacMem from './FacMem';
import SidebarFacultyMem from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarFacultyMem';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function FacMemPage() {
  return (
    <>
      <SidebarFacultyMem activeItem="Faculty Member" />
      <Toolbar title="Faculty Member Portal" />
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        <FacMem />
      </div>
    </>
  );
}