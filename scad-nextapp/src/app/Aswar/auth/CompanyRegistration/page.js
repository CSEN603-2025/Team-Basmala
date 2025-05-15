'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CompanyRegistration.module.css';

export default function CompanyRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    email: '',
    logo: null,
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: send to backend API...
    // After success:
    router.push('/Aswar/DashboardCompany');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Company Registration</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.formLabel}>
            Company Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="industry" className={styles.formLabel}>
            Industry
          </label>
          <input
            id="industry"
            name="industry"
            type="text"
            className={styles.inputField}
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="size" className={styles.formLabel}>
            Company Size
          </label>
          <select
            id="size"
            name="size"
            className={styles.selectField}
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Select size</option>
            <option value="Small">Small (≤50 employees)</option>
            <option value="Medium">Medium (51–100 employees)</option>
            <option value="Large">Large (101–500 employees)</option>
            <option value="Corporate">Corporate (&gt;500 employees)</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.formLabel}>
            Official Company Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="logo" className={styles.formLabel}>
            Company Logo
          </label>
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="documents" className={styles.formLabel}>
            Legitimacy Documents (e.g. Tax Certificate)
          </label>
          <input
            id="documents"
            name="documents"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className={styles.fileInput}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Register Company
        </button>
      </form>
    </div>
  );
}
