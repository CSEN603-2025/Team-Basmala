'use client';
import React from 'react';
import styles from './InternshipPosts.module.css';

const posts = [
  { title: 'Frontend Development', startDate: '2025-06-01' },
  { title: 'Digital Marketing', startDate: '2025-07-15' },
  { title: 'Data Analysis Intern', startDate: '2025-05-20' },
  { title: 'UI/UX Design Intern', startDate: '2025-04-10' },
];

const InternshipPosts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h3 className={styles.header}>Your Internship Posts</h3>
        <button className={styles.seeAllBtn}>See all</button>
      </div>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.head}`}>
          <span>Title</span>
          <span>Start Date</span>
          <span>Duration</span>
          <span>Applicants</span>
          <span>Status</span>
        </div>

        {posts.map((post, index) => (
          <div className={styles.row} key={index}>
            <span>{post.title}</span>
            <span>{post.startDate}</span>
            <span>8 weeks</span>
            <span>{Math.floor(Math.random() * 10 + 1)}</span>
            <span>Pending</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipPosts;
