'use client';

import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import ToolbarPro from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';
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
  return (
    <>
      <SidebarPRO />
      <ToolbarPro />
      <div style={{ marginLeft: '150px', marginTop: '90px', padding: '20px' }}>
        <ProStudentsEvaluationsClient />
      </div>
    </>
  );
}
