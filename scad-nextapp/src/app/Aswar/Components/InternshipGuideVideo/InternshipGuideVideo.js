'use client';
import React from 'react';
import styles from './InternshipGuideVideo.module.css';

const videoMap = {
  'Computer Science': '/videos/cs-internships.mp4',
  'Business Administration': '/videos/ba-internships.mp4',
  'Mechanical Engineering': '/videos/me-internships.mp4',
  'Psychology': '/videos/psych-internships.mp4',
  'Biology': '/videos/bio-internships.mp4',
  'Economics': '/videos/econ-internships.mp4',
  default: '/videos/general-internships.mp4',
};

export default function InternshipGuideVideo({ major }) {
  const src = videoMap[major] || videoMap.default;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        Internships That Count for {major || 'Your Major'}
      </h3>
      <video className={styles.video} controls>
        <source src={src} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
