"use client";

import ProStudentAppointments from './ProStudentAppointments';
import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import ToolbarPro from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';

export default function ProStudentAppointmentsPage() {
  return (
    <>
      <SidebarPRO activeItem="Appointments" />
      <ToolbarPro title="PRO Student Appointments" />
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        <ProStudentAppointments />
      </div>
    </>
  );
}