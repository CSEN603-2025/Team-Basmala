'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callData, setCallData] = useState({
    duration: 0,
    isMuted: true, // Default OFF
    isVideoOn: false, // Default OFF
    isSharing: false, // Default OFF
    callEnded: false,
    showSchedule: false,
    rescheduleSuccess: false,
    notes: '',
    studentName: 'Ahmed Mohamed',
    remoteVideoMuted: true, // Default OFF (shows profile picture)
    remoteParticipantLeft: false
  });

  // Refs for video elements
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenShareRef = useRef(null);
  
  // Stream references
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!callData.callEnded) {
        setCallData(prev => ({...prev, duration: prev.duration + 1}));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [callData.callEnded]);

  // Initialize media streams and dummy participant left simulation
  useEffect(() => {
    const initMedia = async () => {
      try {
        // Start with everything off
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = null;
        }
        
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
          remoteVideoRef.current.poster = '/default-profile.png';
        }

        // Request camera permission early but keep it off
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user'
            },
            audio: false
          });
          stream.getTracks().forEach(track => track.stop());
        } catch (e) {
          console.error("Error requesting initial camera permission:", e);
        }
      } catch (error) {
        console.error("Error initializing media:", error);
      }
    };

    initMedia();

    // =============================================
    // Dummy participant left simulation (DEV ONLY)
    // Remove this in production and replace with real WebSocket
    const dummyLeaveTimer = setTimeout(() => {
      setCallData(prev => ({
        ...prev,
        remoteVideoMuted: true,
        remoteParticipantLeft: true
      }));
    }, 30000); // Simulates participant leaving after 30s

    // For manual testing in development
    window.simulateParticipantLeave = () => {
      setCallData(prev => ({
        ...prev,
        remoteVideoMuted: true,
        remoteParticipantLeft: true
      }));
    };
    // =============================================

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      clearTimeout(dummyLeaveTimer);
      delete window.simulateParticipantLeave;
    };
  }, []);

  // Toggle microphone
  const toggleMute = async () => {
    if (!localStreamRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: callData.isVideoOn
      });
      localStreamRef.current = stream;
      if (callData.isVideoOn) {
        localVideoRef.current.srcObject = stream;
      }
    }

    localStreamRef.current.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setCallData(prev => ({...prev, isMuted: !prev.isMuted}));
  };

  // Toggle camera
  const toggleVideo = async () => {
    try {
      if (!callData.isVideoOn) {
        // Start video with specific constraints for front camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user', // This ensures we get the front camera
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: !callData.isMuted
        });

        // Store the stream
        localStreamRef.current = stream;

        // Display video
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          await localVideoRef.current.play().catch(e => {
            console.error("Error playing video:", e);
          });
        }

        setCallData(prev => ({...prev, isVideoOn: true}));
      } else {
        // Stop video
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach(track => track.stop());
        }

        // Clear video display
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = null;
        }

        setCallData(prev => ({...prev, isVideoOn: false}));
      }
    } catch (error) {
      console.error("Error toggling video:", error);
      setCallData(prev => ({...prev, isVideoOn: false}));
    }
  };

  // Screen sharing
  const toggleScreenShare = async () => {
    if (!callData.isSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        screenStreamRef.current = stream;
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = stream;
          screenShareRef.current.play().catch(e => console.error("Error playing screen share:", e));
        }
        
        stream.getVideoTracks()[0].onended = () => {
          setCallData(prev => ({...prev, isSharing: false}));
        };
        
        setCallData(prev => ({...prev, isSharing: true}));
      } catch (error) {
        console.error("Screen sharing failed:", error);
        setCallData(prev => ({...prev, isSharing: false}));
      }
    } else {
      screenStreamRef.current?.getTracks().forEach(track => track.stop());
      setCallData(prev => ({...prev, isSharing: false}));
    }
  };

  // Reschedule functions
  const handleReschedule = (time) => {
    setCallData(prev => ({
      ...prev,
      showSchedule: false,
      rescheduleSuccess: true
    }));
    setTimeout(() => {
      setCallData(prev => ({...prev, rescheduleSuccess: false}));
    }, 3000);
  };

  const endCall = () => {
    setCallData(prev => ({...prev, callEnded: true}));
    setTimeout(() => {
      router.push('/Basmala/DashboardSCAD');
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

      {/* Participant Left Notification */}
      {callData.remoteParticipantLeft && (
        <div className={styles.participantLeftAlert}>
          <div className={styles.alertContent}>
            <span>⚠️</span>
            <p>Participant has left the call</p>
            <button 
              onClick={() => setCallData(prev => ({...prev, remoteParticipantLeft: false}))}
              className={styles.alertClose}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Video Grid */}
        <div className={styles.videoGrid}>
          {/* Main Video - Shows either screen share or remote participant */}
          {callData.isSharing ? (
            <video
              ref={screenShareRef}
              className={styles.mainVideo}
              autoPlay
              playsInline
              muted={true}
            />
          ) : (
            <div className={styles.remoteVideoContainer}>
              <video
                ref={remoteVideoRef}
                className={styles.mainVideo}
                autoPlay
                playsInline
                muted={false}
              />
              {callData.remoteVideoMuted && (
                <div className={styles.remoteVideoPlaceholder}>
                  <img 
                    src="/default-profile.png" 
                    alt="Participant" 
                    className={styles.profileImage}
                  />
                </div>
              )}
            </div>
          )}

          {/* Local Video (PIP) */}
          <div className={styles.localVideoContainer}>
            <video
              ref={localVideoRef}
              className={styles.localVideo}
              autoPlay
              playsInline
              muted={true}
              style={{ transform: 'scaleX(-1)' }} // Mirror the selfie view
            />
            {!callData.isVideoOn && (
              <div className={styles.localVideoPlaceholder}>
                <img 
                  src="/default-profile.png" 
                  alt="You" 
                  className={styles.profileImage}
                />
              </div>
            )}
          </div>
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

        {/* Controls */}
        <div className={styles.controls}>
          <button 
            onClick={toggleMute}
            className={`${styles.controlButton} ${!callData.isMuted ? styles.active : ''}`}
          >
            {callData.isMuted ? '🎤 Unmute' : '🔊 Mute'}
          </button>
          
          <button 
            onClick={toggleVideo}
            className={`${styles.controlButton} ${callData.isVideoOn ? styles.active : ''}`}
          >
            {callData.isVideoOn ? '📹 Stop Video' : '📹 Start Video'}
          </button>
          
          <button 
            onClick={toggleScreenShare}
            className={`${styles.controlButton} ${callData.isSharing ? styles.active : ''}`}
          >
            {callData.isSharing ? '🖥️ Stop Sharing' : '🖥️ Share Screen'}
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

      {/* Reschedule Modal */}
      {callData.showSchedule && (
        <div className={styles.modalOverlay}>
          <div className={styles.scheduleModal}>
            <h3>Reschedule Session with {callData.studentName}</h3>
            <div className={styles.timeOptions}>
              {['Today 3:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 2:00 PM'].map(time => (
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

      {/* Development-only test button */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => window.simulateParticipantLeave()}
          className={styles.controlButton}
          style={{ background: '#ff9800' }}
        >
          🧪 Test Leave
        </button>
      )}
    </div>
  );
}
