'use client';

import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Create a loading placeholder
function LoadingProStudentsEvaluations() {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh'
    }}>
      <h2>Loading Professional Students Evaluations...</h2>
      <p>Please wait while we load your evaluations dashboard.</p>
    </div>
  );
}

// Use dynamic import with no SSR to prevent hydration issues
const ProStudentsEvaluationsClient = dynamic(
  () => import('./ProStudentsEvaluations'),
  { 
    ssr: false,
    loading: () => <LoadingProStudentsEvaluations />
  }
);

export default function ProStudentsEvaluationsPage() {
  return <ProStudentsEvaluationsClient />;
}
