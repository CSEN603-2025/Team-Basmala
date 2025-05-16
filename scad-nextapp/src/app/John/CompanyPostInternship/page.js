'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CompanyPostInternship.module.css';
import BackButton from '@/app/sharedComponents-Aswar/backButton/backButton';


export default function CompanyPostInternship() {
  const router = useRouter();

  // ✅ Named navigation function
  const navigateToPostIntern = () => {
    router.push('/John/PostInternCongrat');
  };

  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    company: 'TechNova Solutions',
    title: '',
    duration: '',
    paid: false,
    salary: '',
    skills: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

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
      // Update
      setInternships((prev) =>
        prev.map((internship) =>
          internship.id === editingId
            ? { ...formData, id: editingId }
            : internship
        )
      );
      setEditingId(null);
    } else {
      // Create
      const newInternship = {
        ...formData,
        id: Date.now(),
      };
      setInternships((prev) => [...prev, newInternship]);
      navigateToPostIntern(); // ✅ navigation triggered here
    }

    setFormData({
      company: 'TechNova Solutions',
      title: '',
      duration: '',
      paid: false,
      salary: '',
      skills: '',
      description: '',
    });
  };

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

  const handleDelete = (id) => {
    setInternships((prev) => prev.filter((internship) => internship.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Manage Internship Posts</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
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
        <button type="submit">{editingId ? 'Update' : 'Post'} Internship</button>
      </form>

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
      <div className={styles.backButtonContainer}>
          <BackButton />
        </div>
    </div>
    
  );
}
