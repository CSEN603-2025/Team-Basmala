"use client";

import ScadOfficeAppointments from './ScadOfficeAppointments';
import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import ToolbarSCAD from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarSCAD';

export default function ScadOfficeAppointmentsPage() {
  return (
    <>
      <SidebarSCAD activeItem="Appointments" />
      <ToolbarSCAD title="SCAD Office Appointments" />
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        <ScadOfficeAppointments />
      </div>
    </>
  );
}