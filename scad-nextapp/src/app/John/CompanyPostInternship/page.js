'use client';

import React, { useState, useEffect } from 'react';
import styles from './CompanyPostInternship.module.css';

export default function CompanyPostInternship() {
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    duration: '',
    paid: false,
    salary: '',
    skills: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch internships from the backend
  useEffect(() => {
    fetch('/api/internships')
      .then((res) => res.json())
      .then((data) => setInternships(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission for Create/Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update internship
      fetch(`/api/internships/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((updatedInternship) => {
          setInternships((prev) =>
            prev.map((internship) =>
              internship.id === editingId ? updatedInternship : internship
            )
          );
          setEditingId(null);
          setFormData({
            company: '',
            title: '',
            duration: '',
            paid: false,
            salary: '',
            skills: '',
            description: '',
          });
        });
    } else {
      // Create internship
      fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newInternship) => {
          setInternships((prev) => [...prev, newInternship]);
          setFormData({
            company: '',
            title: '',
            duration: '',
            paid: false,
            salary: '',
            skills: '',
            description: '',
          });
        });
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    fetch(`/api/internships/${id}`, { method: 'DELETE' })
      .then(() => {
        setInternships((prev) => prev.filter((internship) => internship.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Handle edit
  const handleEdit = (internship) => {
    setEditingId(internship.id);
    setFormData({
      company: internship.company,
      title: internship.title,
      duration: internship.duration,
      paid: internship.paid,
      salary: internship.salary,
      skills: internship.skills,
      description: internship.description,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Manage Internship Posts</h1>

      {/* Form for Create/Update */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 3 months)"
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
            type="text"
            name="salary"
            placeholder="Expected Salary"
            value={formData.salary}
            onChange={handleChange}
          />
        )}
        <input
          type="text"
          name="skills"
          placeholder="Skills Required (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{editingId ? 'Update' : 'Create'} Internship</button>
      </form>

      {/* List of Internships */}
      <div className={styles.internshipList}>
        {internships.map((internship) => (
          <div key={internship.id} className={styles.internshipCard}>
            <h3>{internship.company}</h3>
            <p><strong>Title:</strong> {internship.title}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Paid:</strong> {internship.paid ? 'Yes' : 'No'}</p>
            {internship.paid && <p><strong>Salary:</strong> {internship.salary}</p>}
            <p><strong>Skills:</strong> {internship.skills}</p>
            <p><strong>Description:</strong> {internship.description}</p>
            <button onClick={() => handleEdit(internship)}>Edit</button>
            <button onClick={() => handleDelete(internship.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}