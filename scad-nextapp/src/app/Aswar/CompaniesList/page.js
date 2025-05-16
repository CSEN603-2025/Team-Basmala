'use client';
import React, { useState } from 'react';
import styles from './CompaniesList.module.css';

const defaultCompanies = [
  {
    id: 1,
    name: 'Google',
    industry: 'Technology',
    size: 'Large (100k+ employees)',
    logo: 'https://logo.clearbit.com/google.com',
    email: 'contact@google.com',
    documentUrl: '/google-tax-certificate.pdf',
  },
  {
    id: 2,
    name: 'Apple',
    industry: 'Technology',
    size: 'Large (100k+ employees)',
    logo: 'https://logo.clearbit.com/apple.com',
    email: 'contact@apple.com',
    documentUrl: '/apple-tax-certificate.pdf',
  },
  {
    id: 3,
    name: 'Amazon',
    industry: 'E-commerce',
    size: 'Large (300k+ employees)',
    logo: 'https://logo.clearbit.com/amazon.com',
    email: 'contact@amazon.com',
    documentUrl: '/amazon-tax-certificate.pdf',
  },
  {
    id: 4,
    name: 'Microsoft',
    industry: 'Software',
    size: 'Large (180k+ employees)',
    logo: 'https://logo.clearbit.com/microsoft.com',
    email: 'contact@microsoft.com',
    documentUrl: '/microsoft-tax-certificate.pdf',
  },
  {
    id: 5,
    name: 'Tesla',
    industry: 'Automotive',
    size: 'Medium (100k+ employees)',
    logo: 'https://logo.clearbit.com/tesla.com',
    email: 'contact@tesla.com',
    documentUrl: '/tesla-tax-certificate.pdf',
  },
  {
    id: 6,
    name: 'Meta',
    industry: 'Social Media',
    size: 'Large (70k+ employees)',
    logo: 'https://logo.clearbit.com/meta.com',
    email: 'contact@meta.com',
    documentUrl: '/meta-tax-certificate.pdf',
  },
];

export default function CompaniesListPage() {
  const [companies, setCompanies] = useState(defaultCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const industries = Array.from(new Set(defaultCompanies.map((c) => c.industry)));

  const filtered = companies.filter((c) => {
    const byName = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const byIndustry = !industryFilter || c.industry === industryFilter;
    return byName && byIndustry;
  });

  const handleAccept = (id) => {
    setCompanies((cs) => cs.filter((c) => c.id !== id));
  };

  const handleReject = (id) => {
    setCompanies((cs) => cs.filter((c) => c.id !== id));
  };

  const toggleDetails = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Companies Applying to SCAD</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className={styles.select}
        >
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.list}>
        {filtered.length === 0 && <li className={styles.empty}>No companies found.</li>}

        {filtered.map((c) => (
          <li key={c.id} className={styles.item}>
            <div className={styles.rowHeader} onClick={() => toggleDetails(c.id)}>
              <div className={styles.info}>
                <img src={c.logo} alt={c.name} className={styles.logo} />
                <div>
                  <strong className={styles.name}>{c.name}</strong>
                  <div className={styles.industry}>{c.industry}</div>
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.acceptBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccept(c.id);
                  }}
                >
                  Accept
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(c.id);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>

            {expandedId === c.id && (
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Industry:</span> {c.industry}
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Company Size:</span> {c.size}
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Email:</span>{' '}
                  <a href={`mailto:${c.email}`} className={styles.detailLink}>
                    {c.email}
                  </a>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Document:</span>{' '}
                  <a
                    href={c.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.documentLink}
                  >
                    View PDF
                  </a>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
