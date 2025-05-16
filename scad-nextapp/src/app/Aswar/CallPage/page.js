'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './CallPage.module.css';

export default function CallPage() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [remoteLeft, setRemoteLeft] = useState(false);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  // on mount: get camera & mic
  useEffect(() => {
    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Could not get user media', err);
      }
    }
    initMedia();

    // simulate remote leaving after 60s
    const timer = setTimeout(() => setRemoteLeft(true), 60000);
    return () => {
      clearTimeout(timer);
      // stop all tracks on unmount
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // toggle video track
  const toggleVideo = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !videoEnabled;
    });
    setVideoEnabled((v) => !v);
  };

  // toggle audio track
  const toggleMic = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !micEnabled;
    });
    setMicEnabled((m) => !m);
  };

  const leaveCall = () => {
    // stop and navigate away or whatever
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    console.log('Call left');
  };

  return (
    <div className={styles.callContainer}>
      <div className={styles.videoContainer}>
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
        {/* Screen-share stub */}
        <button className={styles.controlBtn}>Share Screen</button>
        <button className={styles.controlBtnLeave} onClick={leaveCall}>
          Leave Call
        </button>
      </div>
    </div>
  );
}
