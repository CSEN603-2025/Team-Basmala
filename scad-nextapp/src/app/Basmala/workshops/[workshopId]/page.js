'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import styles from './page.module.css';

export default function WorkshopDetails() {
  const { workshopId } = useParams();
  const [workshop, setWorkshop] = useState({
    id: workshopId,
    title: 'Resume Writing Workshop',
    date: '2024-04-15',
    time: '14:00',
    duration: '60', // in minutes
    instructor: 'Dr. Sarah Johnson',
    capacity: 30,
    registeredCount: 18,
    description: 'Learn how to create a professional resume that stands out. This workshop covers formatting, content organization, and best practices for different industries.',
    topics: [
      'Resume formats and templates',
      'Writing effective summary statements',
      'Highlighting achievements',
      'Common resume mistakes to avoid',
      'Tailoring your resume for specific jobs'
    ],
    requirements: [
      'Laptop with internet connection',
      'Current version of your resume (if available)',
      'Note-taking materials'
    ],
    status: 'upcoming', // upcoming, ongoing, completed
    type: 'live', // live or pre-recorded
  });

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    major: '',
    year: '',
    expectations: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setShowRegistrationModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to register the student
    console.log('Registration submitted:', {
      workshopId: workshop.id,
      ...registrationForm
    });

    // Show success message and close modal after delay
    setRegistrationSuccess(true);
    setIsRegistered(true);
    
    setTimeout(() => {
      setShowRegistrationModal(false);
      setRegistrationSuccess(false);
      setRegistrationForm({
        name: '',
        email: '',
        phone: '',
        major: '',
        year: '',
        expectations: ''
      });
    }, 2000);
  };

  return (
    <div className={styles.pageContainer}>
      <Toolbar />
      <div className={styles.contentWrapper}>
        <SidebarCompany />
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>{workshop.title}</h1>
              <div className={styles.status}>
                <span className={`${styles.badge} ${styles[workshop.status]}`}>
                  {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                </span>
                <span className={`${styles.badge} ${styles[workshop.type]}`}>
                  {workshop.type === 'live' ? 'Live Session' : 'Pre-recorded'}
                </span>
              </div>
            </div>

            <div className={styles.mainContent}>
              <div className={styles.infoSection}>
                <div className={styles.basicInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Date:</span>
                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Time:</span>
                    <span>{workshop.time}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Duration:</span>
                    <span>{workshop.duration} minutes</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Instructor:</span>
                    <span>{workshop.instructor}</span>
                  </div>
                </div>

                <div className={styles.capacity}>
                  <div className={styles.capacityInfo}>
                    <span className={styles.label}>Available Spots:</span>
                    <span>{workshop.capacity - workshop.registeredCount} of {workshop.capacity}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progress}
                      style={{ width: `${(workshop.registeredCount / workshop.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.description}>
                <h2>Workshop Description</h2>
                <p>{workshop.description}</p>
              </div>

              <div className={styles.topics}>
                <h2>Topics Covered</h2>
                <ul>
                  {workshop.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.requirements}>
                <h2>Requirements</h2>
                <ul>
                  {workshop.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.actions}>
                {!isRegistered ? (
                  <button 
                    onClick={handleRegister}
                    className={styles.registerButton}
                    disabled={workshop.registeredCount >= workshop.capacity}
                  >
                    {workshop.registeredCount >= workshop.capacity 
                      ? 'Workshop Full' 
                      : 'Register for Workshop'}
                  </button>
                ) : (
                  <div className={styles.registeredMessage}>
                    ✓ You are registered for this workshop
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Registration Modal */}
          {showRegistrationModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                {registrationSuccess ? (
                  <div className={styles.successMessage}>
                    <span className={styles.successIcon}>✓</span>
                    <h3>Registration Successful!</h3>
                    <p>You have been registered for {workshop.title}</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.modalHeader}>
                      <h3>Register for {workshop.title}</h3>
                      <button 
                        className={styles.closeButton}
                        onClick={() => setShowRegistrationModal(false)}
                      >
                        ×
                      </button>
                    </div>
                    <form onSubmit={handleSubmitRegistration} className={styles.registrationForm}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={registrationForm.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={registrationForm.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={registrationForm.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="major">Major *</label>
                          <input
                            type="text"
                            id="major"
                            name="major"
                            value={registrationForm.major}
                            onChange={handleInputChange}
                            required
                            placeholder="Your major"
                          />
                        </div>
                        
                        <div className={styles.formGroup}>
                          <label htmlFor="year">Year *</label>
                          <select
                            id="year"
                            name="year"
                            value={registrationForm.year}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select year</option>
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year</option>
                            <option value="5">Fifth Year</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="expectations">What do you expect to learn? *</label>
                        <textarea
                          id="expectations"
                          name="expectations"
                          value={registrationForm.expectations}
                          onChange={handleInputChange}
                          required
                          placeholder="Share your expectations for this workshop"
                          rows="3"
                        />
                      </div>
                      
                      <button type="submit" className={styles.submitButton}>
                        Submit Registration
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
