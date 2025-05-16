'use client';
import React from 'react';
import styles from './CompaniesViewedProfile.module.css';

const defaultViewers = [
  {
    name: 'Google',
    logoUrl: 'https://logo.clearbit.com/google.com',
    dateViewed: 'May 15, 2025 · 2:30 PM',
  },
  {
    name: 'Amazon',
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    dateViewed: 'May 14, 2025 · 10:20 AM',
  },
  {
    name: 'Microsoft',
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    dateViewed: 'May 13, 2025 · 4:45 PM',
  },
];

export default function CompaniesViewedProfile({
  viewers = defaultViewers,
  onSeeAll = () => alert('See all clicked'),
}) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Companies Who Viewed Your Profile</h3>
        <button className={styles.seeAll} onClick={onSeeAll}>
          See all
        </button>
      </div>
      <ul className={styles.list}>
        {viewers.map(({ name, logoUrl, dateViewed }, idx) => (
          <li key={idx} className={styles.item}>
            <img src={logoUrl} alt={name} className={styles.logo} />
            <div className={styles.info}>
              <span className={styles.companyName}>{name}</span>
              <span className={styles.date}>{dateViewed}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
