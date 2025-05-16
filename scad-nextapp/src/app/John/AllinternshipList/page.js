
// ✅ InternshipListing.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './allinternshipList.module.css';

import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarCompany';
import BackButton from '@/app/sharedComponents-Aswar/backButton/backButton';

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
    image: '/images/techcorp.png',
  },
  {
    id: 2,
    company: 'PwC',
    title: 'Audit Intern',
    duration: '6 months',
    industry: 'Finance',
    paid: true,
    salary: '$1500/month',
    skills: ['Accounting', 'Auditing', 'Excel', 'Communication'],
    description: 'Assist in auditing financial statements and performing risk assessments for clients in various industries.',
    address: '123 Finance Avenue, New York, NY',
    website: 'https://www.pwc.com',
    image: '/images/pwc.png',
  },
];

export default function InternshipListing() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    paid: '',
  });
  const [openDetailsIds, setOpenDetailsIds] = useState([]);
  const [brokenImages, setBrokenImages] = useState({});

  const toggleDetails = (id) => {
    setOpenDetailsIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const navigateToApplyIntern = () => {
    router.push('/John/applyIntern');
  };

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const filteredInternships = dummyInternships.filter((internship) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      filters.industry === '' || internship.industry === filters.industry;

    const matchesDuration =
      filters.duration === '' || internship.duration === filters.duration;

    const matchesPaid =
      filters.paid === '' ||
      (filters.paid === 'paid' && internship.paid) ||
      (filters.paid === 'unpaid' && !internship.paid);

    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  return (
    <div className={styles.pageLayout}>
      <SidebarSCAD activeItem="Internships" />

      <div className={styles.mainContent}>
        <Toolbar title="Available Internships" />

        {/* Search + Filters Row */}
        <div className={styles.searchAndFiltersRow}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className={styles.filterSelect}
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
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

        {/* Internship List */}
        <div className={styles.internshipList}>
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <div key={internship.id} className={styles.internshipCard}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardText}>
                    <h3 className={styles.company}>{internship.company}</h3>
                    <p><strong>{internship.title}</strong></p>
                    <p className={styles.duration}>{internship.duration}</p>
                    <p className={styles.paidStatus}>
                      {internship.paid ? `Paid: ${internship.salary}` : 'Unpaid'}
                    </p>
                  </div>

                  <Image
                    src={
                      brokenImages[internship.id]
                        ? '/images/default-logo.png'
                        : internship.image
                    }
                    alt={`${internship.company} logo`}
                    width={80}
                    height={80}
                    className={styles.companyLogo}
                    onError={() => handleImageError(internship.id)}
                  />
                </div>

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
                    <p><strong>Skills Required:</strong></p>
                    <ul>
                      {internship.skills.map((skill, idx) => (
                        <li key={`${internship.id}-skill-${idx}`}>{skill}</li>
                      ))}
                    </ul>
                    <p><strong>Additional Information:</strong> This internship offers a great opportunity to gain hands-on experience in the {internship.industry} industry. You'll work closely with experienced professionals and contribute to meaningful projects.</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No internships found.</p>
          )}
        </div>
      </div>

      <div className={styles.backButtonContainer}>
        <BackButton />
      </div>
    </div>
  );
}

