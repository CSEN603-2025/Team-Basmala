"use client";

import CompanyEvaluations from './CompanyEvaluations';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';

export default function CompanyEvaluationsPage() {
  return (
    <>
      <SidebarCompany activeItem="Reports" />
      <Toolbar title="Student Evaluations"/>
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        <CompanyEvaluations />
      </div>
    </>
  );
}