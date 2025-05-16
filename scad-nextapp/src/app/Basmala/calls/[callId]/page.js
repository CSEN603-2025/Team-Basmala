'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callData, setCallData] = useState({
    duration: 0,
    isMuted: false,
    isVideoOn: true,
    callEnded: false,
    showSchedule: false,
    rescheduleSuccess: false,
    notes: '',
    studentName: 'Ahmed Mohamed'
  });

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!callData.callEnded) {
        setCallData(prev => ({...prev, duration: prev.duration + 1}));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [callData.callEnded]);

  // Available time slots
  const timeSlots = [
    'Today 3:00 PM',
    'Tomorrow 10:00 AM',
    'Tomorrow 2:00 PM',
    'Tomorrow 4:30 PM'
  ];

  const handleReschedule = (time) => {
    setCallData(prev => ({
      ...prev,
      showSchedule: false,
      rescheduleSuccess: true
    }));
    
    // Mock API call
    console.log(`Rescheduling to ${time} for ${callData.studentName}`);
    
    setTimeout(() => {
      setCallData(prev => ({...prev, rescheduleSuccess: false}));
    }, 3000);
  };

  const endCall = () => {
    setCallData(prev => ({...prev, callEnded: true}));
    setTimeout(() => {
      router.push('/Basmala/scad-dashboard');
    }, 2000);
  };

  if (callData.callEnded) {
    return (
      <div className={`${styles.container} ${styles.scadTheme}`}>
        <div className={styles.callEnded}>
          <h2>Session Concluded</h2>
          <p>Duration: {callData.duration} seconds</p>
          {callData.notes && (
            <div className={styles.savedNotes}>
              <h4>Saved Notes:</h4>
              <p>{callData.notes}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.scadTheme}`}>
      {/* Success Banner */}
      {callData.rescheduleSuccess && (
        <div className={styles.successBanner}>
          ✓ Rescheduled successfully! Notification sent to student.
        </div>
      )}

      {/* Video Grid */}
      <div className={styles.videoGrid}>
        {/* Student Video (Main) */}
        <video 
          className={styles.mainVideo}
          src="/mock-student-video.mp4"
          autoPlay 
          muted={false}
        />
        
        {/* SCAD Officer Video (PIP) */}
        {callData.isVideoOn && (
          <video
            className={styles.localVideo}
            src="/mock-scad-video.mp4"
            autoPlay
            muted={callData.isMuted}
          />
        )}
      </div>

      {/* Notes Panel */}
      <div className={styles.notesPanel}>
        <h4>Meeting Notes</h4>
        <textarea
          value={callData.notes}
          onChange={(e) => setCallData(prev => ({...prev, notes: e.target.value}))}
          placeholder="Record observations about this session..."
        />
      </div>

      {/* Reschedule Modal */}
      {callData.showSchedule && (
        <div className={styles.modalOverlay}>
          <div className={styles.scheduleModal}>
            <h3>Reschedule Session with {callData.studentName}</h3>
            <div className={styles.timeOptions}>
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleReschedule(time)}
                  className={styles.timeSlot}
                >
                  {time}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCallData(prev => ({...prev, showSchedule: false}))}
              className={styles.closeButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div className={styles.controls}>
        <button 
          onClick={() => setCallData(prev => ({...prev, isMuted: !prev.isMuted}))}
          className={`${styles.controlButton} ${callData.isMuted ? styles.active : ''}`}
        >
          {callData.isMuted ? '🔇 Unmute' : '🎤 Mute'}
        </button>
        
        <button 
          onClick={() => setCallData(prev => ({...prev, isVideoOn: !prev.isVideoOn}))}
          className={`${styles.controlButton} ${!callData.isVideoOn ? styles.active : ''}`}
        >
          {callData.isVideoOn ? '📹 Stop Video' : '📹 Start Video'}
        </button>
        
        <button 
          onClick={() => setCallData(prev => ({...prev, showSchedule: true}))}
          className={`${styles.controlButton} ${styles.scheduleButton}`}
        >
          🕒 Reschedule
        </button>
        
        <button 
          className={`${styles.controlButton} ${styles.recordButton}`}
        >
          ● Record
        </button>
        
        <button 
          onClick={endCall}
          className={`${styles.controlButton} ${styles.endCall}`}
        >
          📞 End Session
        </button>
        
        <div className={styles.callTimer}>
          {Math.floor(callData.duration / 60)}:
          {(callData.duration % 60).toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}