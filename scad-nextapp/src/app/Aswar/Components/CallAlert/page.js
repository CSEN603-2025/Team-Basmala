'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CallAlert.module.css';

export default function CallAlert({
  student = { name: 'Jane Doe', avatar: '/Applicant2.jpeg' },
  onDecline = () => {},
}) {
  const router = useRouter();
  const ringRef = useRef(null);
  const toneRef = useRef(null);

  useEffect(() => {
    // start ringing once the node is mounted
    if (ringRef.current) {
      ringRef.current.loop = true;
      ringRef.current.play().catch(() => {
        /* autoplay may be blocked until user interaction */
      });
    }

    return () => {
      // cleanup: only if the node still exists
      if (ringRef.current) {
        ringRef.current.pause();
        ringRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleAccept = () => {
    if (ringRef.current) {
      ringRef.current.pause();
    }
    if (toneRef.current) {
      toneRef.current.play().catch(() => {});
    }
    setTimeout(() => router.push('/Basmala/calls/[callId]'), 300);
  };

  const handleDecline = () => {
    if (ringRef.current) {
      ringRef.current.pause();
    }
    if (toneRef.current) {
      toneRef.current.play().catch(() => {});
    }
    onDecline();
  };

  return (
    <div className={styles.container}>
      {/* Audio elements */}
      <audio ref={ringRef} src="/ringtone1.mp3" />
      <audio ref={toneRef} src="/accept.mp3" />

      <img
        src={student.avatar}
        alt={student.name}
        className={styles.avatar}
      />
      <div className={styles.info}>
        <span className={styles.name}>{student.name}</span>
        <span className={styles.prompt}>wants to start a call</span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.acceptBtn}
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className={styles.declineBtn}
          onClick={handleDecline}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
