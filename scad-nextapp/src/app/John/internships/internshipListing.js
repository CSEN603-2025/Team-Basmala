'use client';

import React from 'react';
import Link from 'next/link';
import styles from './internshipListing.module.css';
import { useRouter } from 'next/navigation';


const dummyInternships = [
  {
    id: 1,
    company: 'TechCorp',
    title: 'Frontend Developer Intern',
    duration: '3 months',
    industry: 'Technology',
    paid: true,
    salary: '$1000/month',
    skills: ['React', 'JavaScript', 'CSS'],
    description: 'Work on cutting-edge frontend projects involving modern frameworks and design systems.',
    address: '123 Tech Street, Silicon Valley, CA',
    website: 'https://techcorp.com',
  },
  {
    id: 2,
    company: 'HealthPlus',
    title: 'Data Analyst Intern',
    duration: '6 months',
    industry: 'Healthcare',
    paid: false,
    salary: '',
    skills: ['SQL', 'Python', 'Statistics'],
    description: 'Assist with healthcare data analysis to improve patient outcomes and operational efficiency.',
    address: '456 Health Blvd, New York, NY',
    website: 'https://healthplus.org',
  },
];

export default function InternshipListing() {
  const router=useRouter();
      const navigateToApplyIntern = () => {
          router.push('/applyIntern');
      }
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState({
    industry: '',
    duration: '',
    paid: ''
  });
  const [openDetailsIds, setOpenDetailsIds] = React.useState([]);

  const toggleDetails = (id) => {
    setOpenDetailsIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(openId => openId !== id)
        : [...prevIds, id]
    );
  };

  const filteredInternships = dummyInternships.filter(internship => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (filters.industry === '' || internship.industry === filters.industry) &&
      (filters.duration === '' || internship.duration.includes(filters.duration)) &&
      (filters.paid === '' ||
        (filters.paid === 'paid' && internship.paid) ||
        (filters.paid === 'unpaid' && !internship.paid));

    return matchesSearch && matchesFilters;
  });

  return (
    <div className={styles.container}>
      <div className={styles.glassWrapper}>
        <h1 className={styles.title}>Available Internships</h1>

        <div className={styles.searchFilterContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.filters}>
            <select
              className={styles.filterSelect}
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
            </select>

            <select
              className={styles.filterSelect}
              value={filters.duration}
              onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
            >
              <option value="">All Durations</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>

            <select
              className={styles.filterSelect}
              value={filters.paid}
              onChange={(e) => setFilters({ ...filters, paid: e.target.value })}
            >
              <option value="">Paid & Unpaid</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className={styles.internshipList}>
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <div key={internship.id} className={styles.internshipCard}>
                <h3 className={styles.company}>{internship.company}</h3>
                <p><strong>{internship.title}</strong></p>
                <p className={styles.duration}>{internship.duration}</p>
                <p className={styles.paidStatus}>
                  {internship.paid ? `Paid: ${internship.salary}` : 'Unpaid'}
                </p>
                <button
                  className={styles.viewDetailsBtn}
                  onClick={() => toggleDetails(internship.id)}
                >
                  {openDetailsIds.includes(internship.id) ? 'Hide Details' : 'View Details'}
                </button>

                {openDetailsIds.includes(internship.id) && (
                  <div className={styles.detailsPanel}>
                    <p><strong>Description:</strong> {internship.description}</p>
                    <p><strong>Address:</strong> {internship.address}</p>
                    <p><strong>Website:</strong> <a href={internship.website} target="_blank" rel="noopener noreferrer">{internship.website}</a></p>

                    <button 
                    onClick= {navigateToApplyIntern} className={styles.applyLink}>
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No internships found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
