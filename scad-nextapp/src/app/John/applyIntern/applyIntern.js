'use client';

import React, { useState } from 'react';
import styles from './applyIntern.module.css';
import { useRouter } from 'next/navigation';

import SidebarSCAD from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarSCAD';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import BackButton from '@/app/sharedComponents-Aswar/backButton/backButton';

export default function ApplyIntern() {
  const router = useRouter();
  const navigationToSubmission = () => {
    router.push('/John/applicationSubmit');
  };

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    university: '',
    major: '',
    cv: null,
    certificates: null, // New field for certificates/cover letter
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !formData.name ||
      !formData.address ||
      !formData.university ||
      !formData.major ||
      !formData.cv
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Submitted form data:', formData);
    navigationToSubmission();
  };

  return (
    <div className={styles.pageLayout}>
      <SidebarSCAD activeItem="Apply Intern" />

      <div className={styles.mainContent}>
        <Toolbar title="Internship Application" />

        <div className={styles.container}>
          <h1 className={styles.title}>Internship Application Form</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              University:
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Major:
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Attach CV:
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Attach Certificates (or Cover Letter):
              <input
                type="file"
                name="certificates"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              className={styles.submitBtn}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
      <div className={styles.backButtonContainer}>
      <BackButton />
    </div>
    </div>
  );
}