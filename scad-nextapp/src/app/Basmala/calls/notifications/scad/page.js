'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Page() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [callStatus, setCallStatus] = useState('pending'); // 'pending' | 'accepted' | 'rejected'

  const timeSlots = [
    'Today 3:00 PM',
    'Tomorrow 10:00 AM',
    'Tomorrow 2:00 PM'
  ];

  const handleAccept = () => {
    setCallStatus('accepted');
    router.push(`/Basmala/calls/${Date.now()}?role=scad`);
  };

  const handleReschedule = (time) => {
    setSelectedTime(time);
    setCallStatus('rejected');
    // Mock API call would go here
    setTimeout(() => {
      setShowModal(false);
      console.log(`Rescheduled to ${time}`);
    }, 1000);
  };

  if (callStatus === 'rejected') return (
    <div className={styles.popup}>
      <p>Call rescheduled to <strong>{selectedTime || 'a later time'}</strong></p>
    </div>
  );

  return (
    <div className={styles.popup}>
      <h3>Incoming Call Request</h3>
      <p>From: <strong>PRO Student</strong></p>
      
      <div className={styles.buttons}>
        <button 
          onClick={handleAccept}
          className={styles.accept}
        >
          Accept Now
        </button>
        
        <button 
          onClick={() => setShowModal(true)}
          className={styles.reject}
        >
          Reschedule
        </button>
      </div>

      {/* Reschedule Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.scheduleModal}>
            <h3>Select New Time</h3>
            <div className={styles.timeOptions}>
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleReschedule(time)}
                  className={selectedTime === time ? styles.activeTimeSlot : ''}
                >
                  {time}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className={styles.closeButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}