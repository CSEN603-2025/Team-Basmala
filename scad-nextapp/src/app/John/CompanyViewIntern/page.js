'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './viewPostedIntern.module.css';

export default function CompanyViewIntern() {
  const router = useRouter();

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

  const COMPANY_NAME = 'TechNova Solutions';

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
      },
      {
        id: 3,
        company: COMPANY_NAME,
        title: 'Backend Development Intern',
        duration: '4 months',
        paid: true,
        salary: '5000 EGP/month',
        skills: 'Node.js, Express.js, MongoDB, REST APIs',
        description: 'Build scalable APIs with backend team.',
      },
      {
        id: 4,
        company: COMPANY_NAME,
        title: 'Civil Engineering Intern',
        duration: '3 months',
        paid: false,
        salary: '',
        skills: 'AutoCAD, Site Management, Safety Protocols',
        description: 'Support site engineers in layout and inspection.',
      },
      {
        id: 5,
        company: COMPANY_NAME,
        title: 'Digital Marketing Intern',
        duration: '1 month',
        paid: true,
        salary: '2000 EGP/month',
        skills: 'SEO, Social Media, Canva, Google Analytics',
        description: 'Manage content and performance reports.',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      // Update internship
      setInternships((prev) =>
        prev.map((internship) =>
          internship.id === editingId
            ? { ...formData, id: editingId, company: COMPANY_NAME }
            : internship
        )
      );
      setEditingId(null);
    } else {
      // Create internship
      const newInternship = {
        ...formData,
        id: Date.now(),
        company: COMPANY_NAME,
      };
      setInternships((prev) => [...prev, newInternship]);
    }

    setFormData({
      title: '',
      duration: '',
      paid: false,
      salary: '',
      skills: '',
      description: '',
    });
  };

  const handleDelete = (id) => {
    setInternships((prev) => prev.filter((internship) => internship.id !== id));
  };

  const handleEdit = (internship) => {
    if (editingId === internship.id) {
      setEditingId(null); // toggle off
    } else {
      setEditingId(internship.id);
      setFormData({
        title: internship.title,
        duration: internship.duration,
        paid: internship.paid,
        salary: internship.salary,
        skills: internship.skills,
        description: internship.description,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>My Internship Posts</h1>
        <button
          className={styles.postButton}
          onClick={() => router.push('/John/CompanyPostInternship')}
        >
          Go to Post Page
        </button>
      </div>

      {/* Internship Cards */}
      <div className={styles.internshipList}>
        {internships.length > 0 ? (
          internships.map((internship) => (
            <div key={internship.id} className={styles.internshipCard}>
              <h3>{internship.title}</h3>
              <p><strong>Company:</strong> {COMPANY_NAME}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Paid:</strong> {internship.paid ? 'Yes' : 'No'}</p>
              {internship.paid && (
                <p><strong>Salary:</strong> {internship.salary}</p>
              )}
              <p><strong>Skills:</strong> {internship.skills}</p>
              <p><strong>Description:</strong> {internship.description}</p>

              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => handleEdit(internship)}>Edit</button>
                <button onClick={() => handleDelete(internship.id)}>Delete</button>
              </div>

              {/* Inline Edit Form */}
              {editingId === internship.id && (
                <form onSubmit={handleSubmit} className={styles.editForm}>
                  <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="duration"
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                  <label>
                    <input
                      type="checkbox"
                      name="paid"
                      checked={formData.paid}
                      onChange={handleChange}
                    />
                    Paid
                  </label>
                  {formData.paid && (
                    <input
                      name="salary"
                      placeholder="Salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  )}
                  <input
                    name="skills"
                    placeholder="Skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          ))
        ) : (
          <p>No internships posted yet.</p>
        )}
      </div>
    </div>
  );
}
