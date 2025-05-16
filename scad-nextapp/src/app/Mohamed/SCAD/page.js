"use client";

import SCAD from './SCAD';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function SCADPage() {
  return (
    <>
      <SidebarCompany activeItem="SCAD Office" />
      <Toolbar title="SCAD Office Portal" />
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        <SCAD />
      </div>
    </>
  );
}