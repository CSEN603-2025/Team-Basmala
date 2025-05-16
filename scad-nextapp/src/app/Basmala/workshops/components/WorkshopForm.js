'use client';
import { useState, useEffect } from 'react';
import styles from './WorkshopForm.module.css';

export default function WorkshopForm({ workshop, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    capacity: '',
    presenter: '',
    description: '',
    agenda: '',
    speakerBio: '',
    meetingUrl: '',
    status: 'upcoming',
    ...workshop
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Workshop Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter workshop title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date*</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">Time*</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="duration">Duration*</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="e.g., 1 hour"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="capacity">Capacity*</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="presenter">Presenter Name*</label>
          <input
            type="text"
            id="presenter"
            name="presenter"
            value={formData.presenter}
            onChange={handleChange}
            required
            placeholder="Enter presenter name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="meetingUrl">Meeting URL</label>
          <input
            type="url"
            id="meetingUrl"
            name="meetingUrl"
            value={formData.meetingUrl}
            onChange={handleChange}
            placeholder="Enter meeting URL"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status*</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Workshop Description*</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter workshop description"
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="speakerBio">Speaker Bio*</label>
        <textarea
          id="speakerBio"
          name="speakerBio"
          value={formData.speakerBio}
          onChange={handleChange}
          required
          placeholder="Enter speaker biography"
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="agenda">Workshop Agenda*</label>
        <textarea
          id="agenda"
          name="agenda"
          value={formData.agenda}
          onChange={handleChange}
          required
          placeholder="Enter workshop agenda"
          rows={4}
        />
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {workshop ? 'Update Workshop' : 'Create Workshop'}
        </button>
      </div>
    </form>
  );
} 