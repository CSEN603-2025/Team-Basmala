"use client";

import CompanyEvaluations from './CompanyEvaluations';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import ToolbarCompany from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarCompany';

export default function CompanyEvaluationsPage() {
  return (
    <>
      <SidebarCompany activeItem="Reports" />
      <ToolbarCompany title="Student Evaluations"/>
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        <CompanyEvaluations />
      </div>
    </>
  );
}