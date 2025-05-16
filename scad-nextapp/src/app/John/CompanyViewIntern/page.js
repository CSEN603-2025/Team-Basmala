'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './viewPostedIntern.module.css';

import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarCompany';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarCompany';
import BackButton from '@/app/sharedComponents-Aswar/backButton/backButton';


export default function CompanyViewIntern() {
  const router = useRouter();
  const COMPANY_NAME = 'TechNova Solutions';

  const [viewMode, setViewMode] = useState('posts');
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    paid: false,
    salary: '',
    skills: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [skillFilter, setSkillFilter] = useState('');
  const [paidOnly, setPaidOnly] = useState(false);
  const [durationFilters, setDurationFilters] = useState([]);

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDurationFilters((prev) =>
      prev.includes(value)
        ? prev.filter((d) => d !== value)
        : [...prev, value]
    );
  };

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      internshipTitle: 'Frontend Web Development Intern',
      status: 'pending',
      cvLink: 'https://example.com/cv/john'
    },
    {
      id: 2,
      name: 'Sara Ibrahim',
      email: 'sara@sample.com',
      internshipTitle: 'Data Analysis Intern',
      status: 'pending',
      cvLink: 'https://example.com/cv/sara'
    }
  ]);

  useEffect(() => {
    setInternships([
      {
        id: 1,
        company: COMPANY_NAME,
        title: 'Frontend Web Development Intern',
        duration: '3 months',
        paid: true,
        salary: '4000 EGP/month',
        skills: 'React, HTML, CSS, JavaScript, Git',
        description: 'Work on UI components and build user-friendly interfaces.',
        applicants: 12,
      },
      {
        id: 2,
        company: COMPANY_NAME,
        title: 'Data Analysis Intern',
        duration: '2 months',
        paid: false,
        salary: '',
        skills: 'Python, Pandas, Excel, SQL',
        description: 'Clean and analyze datasets, create data reports.',
        applicants: 7,
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEdit = (internship) => {
    setEditingId(internship.id);
    setFormData({
      title: internship.title,
      duration: internship.duration,
      paid: internship.paid,
      salary: internship.salary,
      skills: internship.skills,
      description: internship.description,
    });
  };

  const handleDelete = (id) => {
    setInternships((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setInternships((prev) =>
        prev.map((i) => (i.id === editingId ? { ...formData, id: editingId, company: COMPANY_NAME } : i))
      );
      setEditingId(null);
    } else {
      const newInternship = { ...formData, id: Date.now(), company: COMPANY_NAME };
      setInternships((prev) => [...prev, newInternship]);
    }
    setFormData({ title: '', duration: '', paid: false, salary: '', skills: '', description: '' });
  };

  const filteredInternships = internships.filter((internship) => {
    if (paidOnly && !internship.paid) return false;
    if (
      skillFilter &&
      !internship.skills
        .toLowerCase()
        .split(',')
        .map((s) => s.trim())
        .includes(skillFilter.toLowerCase())
    ) return false;
    if (durationFilters.length > 0 && !durationFilters.includes(internship.duration)) return false;
    const term = searchTerm.toLowerCase();
    return (
      internship.title.toLowerCase().includes(term) ||
      internship.skills.toLowerCase().includes(term) ||
      internship.description.toLowerCase().includes(term)
    );
  });

  const filteredApplications = applications.filter((app) => {
    const term = searchTerm.toLowerCase();
    return (
      app.name.toLowerCase().includes(term) ||
      app.email.toLowerCase().includes(term) ||
      app.internshipTitle.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <SidebarCompany activeItem="ViewInterns" />
      <Toolbar title="Manage Internships" />
      <div className={styles.container}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'posts' ? styles.active : ''}`}
            onClick={() => setViewMode('posts')}
          >
            Posted Internships
          </button>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'applications' ? styles.active : ''}`}
            onClick={() => setViewMode('applications')}
          >
            All Applicants
          </button>
        </div>

        {viewMode === 'posts' && (
          <>
            <div className={styles.header}>
              <h1 className={styles.heading}>My Internship Posts</h1>
              <button
                className={styles.postButton}
                onClick={() => router.push('/John/CompanyPostInternship')}
              >
                Post Internship
              </button>
            </div>

            <div className={styles.topControls}>
              <input
                type="text"
                placeholder="Search title, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button
                className={styles.postButton}
                onClick={() => setShowFilters((prev) => !prev)}
              >
                {showFilters ? 'Hide Filters' : 'Filter'}
              </button>
            </div>

            {showFilters && (
              <div className={styles.filterBox}>
                <input
                  type="text"
                  placeholder="Exact skill (e.g. React)"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                />
                <div className={styles.durationCheckboxes}>
                  <label><strong>Duration:</strong></label>
                  <div className={styles.checkboxGrid}>
                    {['1 month', '2 months', '3 months', '4 months'].map((label) => (
                      <label key={label}>
                        <input
                          type="checkbox"
                          value={label}
                          checked={durationFilters.includes(label)}
                          onChange={handleDurationChange}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <label>
                  <input
                    type="checkbox"
                    checked={paidOnly}
                    onChange={() => setPaidOnly(!paidOnly)}
                  />
                  Paid only
                </label>
              </div>
            )}

            <div className={styles.internshipList}>
              {filteredInternships.map((internship) => (
                <div key={internship.id} className={styles.internshipCard}>
                  <div className={styles.titleRow}>
                    <h3>{internship.title}</h3>
                    <span className={styles.applicants}>{internship.applicants} applicants</span>
                  </div>
                  <p><strong>Company:</strong> {COMPANY_NAME}</p>
                  <p><strong>Duration:</strong> {internship.duration}</p>
                  <p><strong>Paid:</strong> {internship.paid ? 'Yes' : 'No'}</p>
                  {internship.paid && <p><strong>Salary:</strong> {internship.salary}</p>}
                  <p><strong>Skills:</strong> {internship.skills}</p>
                  <p><strong>Description:</strong> {internship.description}</p>
                  <div style={{ marginTop: '0.5rem' }}>
                    <button className={styles.editDeleteBtn} onClick={() => handleEdit(internship)}>Edit</button>
                    <button className={styles.editDeleteBtn} onClick={() => handleDelete(internship.id)}>Delete</button>
                  </div>
                  {editingId === internship.id && (
                    <form onSubmit={handleSubmit} className={styles.editForm}>
                      <input name="title" value={formData.title} onChange={handleChange} required />
                      <input name="duration" value={formData.duration} onChange={handleChange} required />
                      <label>
                        <input type="checkbox" name="paid" checked={formData.paid} onChange={handleChange} /> Paid
                      </label>
                      {formData.paid && (
                        <input name="salary" value={formData.salary} onChange={handleChange} />
                      )}
                      <input name="skills" value={formData.skills} onChange={handleChange} required />
                      <textarea name="description" value={formData.description} onChange={handleChange} required />
                      <div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {viewMode === 'applications' && (
          <div className={styles.applicationsPanel}>
            <h1 className={styles.heading}>All Applicants</h1>

            <div className={styles.topControls}>
              <input
                type="text"
                placeholder="Search name, email, or internship title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button
                className={styles.postButton}
                onClick={() => setShowFilters((prev) => !prev)}
              >
                {showFilters ? 'Hide Filters' : 'Filter'}
              </button>
            </div>

            <div className={styles.applicantCardsWrapper}>
              {filteredApplications.map((app) => (
                <div key={app.id} className={styles.applicationCard}>
                  <p><strong>Name:</strong> {app.name}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Internship Title:</strong> {app.internshipTitle}</p>
                  <p><strong>CV:</strong> <a href={app.cvLink} target="_blank">View CV</a></p>
                  <p><strong>Status:</strong> {app.status}</p>
                  <label>
                    Set Status:{' '}
                    <select
                      value={app.status}
                      onChange={(e) =>
                        setApplications((prev) =>
                          prev.map((a) =>
                            a.id === app.id ? { ...a, status: e.target.value } : a
                          )
                        )
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="finalized">Finalized</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="current intern">Current intern</option>
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
      <div className={styles.backButtonContainer}>
          <BackButton />
        </div>
    </>
  );
}
