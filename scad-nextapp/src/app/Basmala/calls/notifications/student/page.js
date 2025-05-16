'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Page() {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState('pending'); // 'pending' | 'accepted' | 'rejected'

 const handleAccept = () => {
  router.push(`/Basmala/calls/${Date.now()}?role=student`);
};

  const handleReject = () => {
    setCallStatus('rejected');
    // Simulate sending rejection notification
    setTimeout(() => setCallStatus('pending'), 5000); // Reset after 5 sec
  };

  if (callStatus === 'rejected') return (
    <div className={styles.popup}>
      <p>Call declined. Your availability has been sent.</p>
    </div>
  );

  return callStatus === 'pending' ? (
    <div className={styles.popup}>
      <h3>Incoming Video Call</h3>
      <p>From: <strong>SCAD Career Advisor</strong></p>
      <div className={styles.buttons}>
        <button onClick={handleAccept} className={styles.accept}>
          Accept
        </button>
        <button onClick={handleReject} className={styles.reject}>
          Send Availability
        </button>
      </div>
    </div>
  ) : null;
}