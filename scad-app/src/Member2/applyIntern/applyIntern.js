'use client';

import React, { useState } from 'react';
import styles from './applyIntern.module.css';
import { useRouter } from 'next/navigation';


export default function ApplyIntern() {
    const router = useRouter();
    const navigationToSubmission=()=> {
        router.push('/applicationSubmission');
    }
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    university: '',
    major: '',
    cv: null,
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
    console.log('Submitted form data:', formData);
    alert('Application submitted successfully!');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Internship Application Form</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>

        <label>
          University:
          <input type="text" name="university" value={formData.university} onChange={handleChange} required />
        </label>

        <label>
          Major:
          <input type="text" name="major" value={formData.major} onChange={handleChange} required />
        </label>

        <label>
          Attach CV:
          <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleChange} required />
        </label>

        <button type="submit"
        onClick={navigationToSubmission} className={styles.submitBtn}>Submit Application</button>
      </form>
    </div>
  );
}
