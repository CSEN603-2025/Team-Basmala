// src/app/Aswar/CallPage/page.js
'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './CallPage.module.css';

export default function CallPage() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [remoteLeft, setRemoteLeft] = useState(false);

  const localVideoRef = useRef(null);
  const streamRef = useRef(null);

  // 1) Acquire local media on mount
  useEffect(() => {
    let isMounted = true;
    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!isMounted) return;
        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Could not get user media', err);
      }
    }
    initMedia();

    // 2) Simulate remote participant leaving after 60s
    const leaveTimer = setTimeout(() => {
      if (isMounted) setRemoteLeft(true);
    }, 60000);

    return () => {
      isMounted = false;
      clearTimeout(leaveTimer);
      // stop all tracks
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const toggleVideo = () => {
    streamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = !videoEnabled;
    });
    setVideoEnabled((v) => !v);
  };

  const toggleMic = () => {
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !micEnabled;
    });
    setMicEnabled((m) => !m);
  };

  const leaveCall = () => {
    // stop all tracks immediately
    streamRef.current?.getTracks().forEach((t) => t.stop());
    console.log('Left the call');
    // you might want to navigate away here
  };

  // Replace this with the actual URL or import for the remote's avatar
  const remoteAvatar = '/applicant2.jpg';

  return (
    <div className={styles.callContainer}>
      <div className={styles.videoContainer}>
        {/* Remote “camera off” avatar */}
        <img
          src={remoteAvatar}
          alt="Remote participant"
          className={styles.remoteVideo}
        />

        {/* Local camera feed overlay */}
        <video
          ref={localVideoRef}
          className={styles.localVideo}
          autoPlay
          muted
          playsInline
        />
      </div>

      {remoteLeft && (
        <div className={styles.notification}>
          The other participant has left the call.
        </div>
      )}

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={toggleVideo}>
          {videoEnabled ? 'Stop Video' : 'Start Video'}
        </button>
        <button className={styles.controlBtn} onClick={toggleMic}>
          {micEnabled ? 'Mute Mic' : 'Unmute Mic'}
        </button>
        <button
          className={styles.controlBtn}
          onClick={() => alert('Screen share not implemented')}
        >
          Share Screen
        </button>
        <button className={styles.controlBtnLeave} onClick={leaveCall}>
          Leave Call
        </button>
      </div>
    </div>
  );
}
