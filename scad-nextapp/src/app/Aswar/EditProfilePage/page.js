'use client';
import React, { useState } from 'react';
import styles from './EditProfilePage.module.css';
import BackButton from '@/app/sharedComponents-Aswar/backButton/backButton';

const majorsList = [
  { name: 'Computer Science', semesters: 8 },
  { name: 'Business Administration', semesters: 8 },
  { name: 'Mechanical Engineering', semesters: 8 },
  { name: 'Psychology', semesters: 8 },
  { name: 'Biology', semesters: 8 },
  { name: 'Economics', semesters: 8 },
];

export default function EditProfilePage() {
  const [interests, setInterests] = useState('');
  const [activities, setActivities] = useState('');
  const [internships, setInternships] = useState([
    { company: '', duration: '', responsibilities: '' },
  ]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [semester, setSemester] = useState('');

  const handleInternshipChange = (index, field, value) => {
    const newList = internships.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setInternships(newList);
  };

  const addInternship = () => {
    setInternships([
      ...internships,
      { company: '', duration: '', responsibilities: '' },
    ]);
  };

  const removeInternship = (index) => {
    setInternships(internships.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      interests,
      activities,
      internships,
      major: selectedMajor,
      semester,
    };
    console.log('Profile submitted:', profile);
    // TODO: send to backend API
    alert('Profile saved!');
  };

  // Build semester options based on selected major
  const majorObj = majorsList.find((m) => m.name === selectedMajor);
  const semestersOptions = majorObj
    ? Array.from({ length: majorObj.semesters }, (_, i) => i + 1)
    : [];

  return (
    <div className={styles.container}>
      {/* Back button */}
      <div className={styles.backWrapper}>
        <BackButton />
      </div>

      <h2 className={styles.title}>Edit Profile</h2>

      {/* List of Majors */}
      <section className={styles.majorsSection}>
        <h3>Available Majors</h3>
        <ul className={styles.majorsList}>
          {majorsList.map((m) => (
            <li key={m.name}>
              {m.name} ({m.semesters} semesters)
            </li>
          ))}
        </ul>
      </section>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Major & Semester */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Select Major
            <select
              value={selectedMajor}
              onChange={(e) => {
                setSelectedMajor(e.target.value);
                setSemester('');
              }}
              required
              className={styles.select}
            >
              <option value="">-- Choose Major --</option>
              {majorsList.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Semester
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              disabled={!selectedMajor}
              className={styles.select}
            >
              <option value="">-- Semester --</option>
              {semestersOptions.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Job Interests */}
        <div className={styles.field}>
          <label className={styles.label}>
            Job Interests
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Describe your job interests..."
              className={styles.textarea}
            />
          </label>
        </div>

        {/* Internships / Part-time Jobs */}
        <div className={styles.field}>
          <label className={styles.label}>
            Previous Internships / Part-time Jobs
          </label>
          {internships.map((job, idx) => (
            <div key={idx} className={styles.jobEntry}>
              <input
                type="text"
                placeholder="Company Name"
                value={job.company}
                onChange={(e) =>
                  handleInternshipChange(idx, 'company', e.target.value)
                }
                className={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., Jun 2024 – Aug 2024)"
                value={job.duration}
                onChange={(e) =>
                  handleInternshipChange(idx, 'duration', e.target.value)
                }
                className={styles.input}
                required
              />
              <textarea
                placeholder="Responsibilities"
                value={job.responsibilities}
                onChange={(e) =>
                  handleInternshipChange(idx, 'responsibilities', e.target.value)
                }
                className={styles.textarea}
                required
              />
              {internships.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInternship(idx)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addInternship}
            className={styles.addBtn}
          >
            + Add Entry
          </button>
        </div>

        {/* College Activities */}
        <div className={styles.field}>
          <label className={styles.label}>
            College Activities
            <textarea
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="List activities you took part in..."
              className={styles.textarea}
            />
          </label>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Save Profile
        </button>
      </form>
    </div>
  );
}
