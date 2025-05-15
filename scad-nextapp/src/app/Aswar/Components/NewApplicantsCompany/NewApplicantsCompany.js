'use client';
import React from 'react';
import styles from './NewApplicantsCompany.module.css';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const applicants = [
  {
    name: 'Jermaine Kuhlman',
    position: 'Human Interactions Agent',
    image: '/avatars/avatar1.jpg',
  },
  {
    name: 'Sadie Yost',
    position: 'International Functionality Consultant',
    image: '/avatars/avatar2.jpg',
  },
  {
    name: 'Ben Langworth',
    position: 'Future Web Representative',
    image: '/avatars/avatar3.jpg',
  },
  {
    name: 'Raymond Raynor',
    position: 'Human Creative Designer',
    image: '/avatars/avatar4.jpg',
  },
  {
    name: 'Betty Buckridge',
    position: 'Direct Solutions Executive',
    image: '/avatars/avatar5.jpg',
  },
  {
    name: 'Raymond Raynor',
    position: 'Human Creative Designer',
    image: '/avatars/avatar4.jpg',
  },
];

export default function NewApplicantsCompany() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>New Applicants</h3>
        <button className={styles.seeAll}>See all</button>
      </div>

      <ul className={styles.applicantList}>
        {applicants.map((applicant, index) => (
          <li key={index} className={styles.applicant}>
            <img src={applicant.image} alt={applicant.name} className={styles.avatar} />
            <div className={styles.info}>
              <span className={styles.name}>{applicant.name}</span>
              <span className={styles.role}>{applicant.position}</span>
            </div>
            <div className={styles.actions}>
              <button><FaUser /></button>
              <button><FaEnvelope /></button>
              <button><FaPhone /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
