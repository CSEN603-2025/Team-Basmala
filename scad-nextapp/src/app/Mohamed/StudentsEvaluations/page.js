'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Create a loading placeholder
function LoadingStudentsEvaluations() {
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
      <h2>Loading Students Evaluations...</h2>
      <p>Please wait while we load your evaluations dashboard.</p>
    </div>
  );
}

// Use dynamic import with no SSR to prevent hydration issues
const StudentsEvaluationsClient = dynamic(
  () => import('./StudentsEvaluations'),
  { 
    ssr: false,
    loading: () => <LoadingStudentsEvaluations />
  }
);

export default function StudentsEvaluationsPage() {
  return <StudentsEvaluationsClient />;
}