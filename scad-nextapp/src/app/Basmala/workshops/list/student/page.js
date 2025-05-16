'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarCompany from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import Toolbar from '@/app/sharedComponents-Aswar/ToolbarComponents/Toolbar';
import styles from './page.module.css';

const DUMMY_WORKSHOPS = [
  {
    id: 1,
    title: "Resume Writing Workshop",
    date: "2024-03-25",
    time: "14:00",
    duration: "1 hour",
    presenter: "Sarah Johnson",
    description: "Learn how to create an effective resume that stands out to employers."
  },
  {
    id: 2,
    title: "Interview Skills Masterclass",
    date: "2024-03-28",
    time: "15:30",
    duration: "1.5 hours",
    presenter: "Michael Brown",
    description: "Master the art of interviewing with practical tips and mock interviews."
  }
];

export default function StudentWorkshopsPage() {
  const [workshops, setWorkshops] = useState(DUMMY_WORKSHOPS);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    major: '',
    year: '',
    expectations: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredWorkshops, setRegisteredWorkshops] = useState(new Set());

  // This will be replaced with actual API call
  useEffect(() => {
    // Fetch workshops from API
    // setWorkshops(data);
  }, []);

  const formatDateTime = (date, time) => {
    const formattedDate = new Date(date + 'T' + time).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedDate;
  };

  const handleRegisterClick = (workshop) => {
    setSelectedWorkshop(workshop);
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
      workshopId: selectedWorkshop.id,
      ...registrationForm
    });

    // Show success message and close modal after delay
    setRegistrationSuccess(true);
    setRegisteredWorkshops(prev => new Set([...prev, selectedWorkshop.id]));
    
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
            <h1 className={styles.title}>Upcoming Career Workshops</h1>
            
            <div className={styles.workshopGrid}>
              {workshops.map(workshop => (
                <div key={workshop.id} className={styles.workshopCard}>
                  <div className={styles.workshopHeader}>
                    <h2>{workshop.title}</h2>
                    <span className={styles.status}>Upcoming</span>
                  </div>
                  
                  <div className={styles.workshopDetails}>
                    <p className={styles.datetime}>
                      {formatDateTime(workshop.date, workshop.time)}
                    </p>
                    <p className={styles.duration}>Duration: {workshop.duration}</p>
                    <p className={styles.presenter}>Presenter: {workshop.presenter}</p>
                    <p className={styles.description}>{workshop.description}</p>
                    
                    <div className={styles.buttonGroup}>
                      {registeredWorkshops.has(workshop.id) ? (
                        <div className={styles.registeredBadge}>
                          ✓ Registered
                        </div>
                      ) : (
                        <button 
                          className={styles.registerButton}
                          onClick={() => handleRegisterClick(workshop)}
                        >
                          Register Now
                        </button>
                      )}
                      <Link 
                        href={`/Basmala/workshops/${workshop.id}`}
                        className={styles.detailsButton}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
                    <p>You have been registered for {selectedWorkshop.title}</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.modalHeader}>
                      <h3>Register for {selectedWorkshop.title}</h3>
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