'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import ToolbarPro from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';
import styles from './page.module.css';

const DUMMY_ASSESSMENTS = [
  {
    id: 1,
    title: "Career Readiness Assessment",
    description: "Select and complete an online assessment to evaluate your career preparation and job readiness skills",
    duration: "30 minutes",
    questions: 25,
    category: "Career Development",
    status: "available"
  },
  {
    id: 2,
    title: "Professional Skills Assessment",
    description: "View my online assessment score for professional and soft skills evaluation",
    duration: "45 minutes",
    questions: 35,
    category: "Professional Skills",
    status: "completed",
    score: 85
  },
  {
    id: 3,
    title: "Interview Preparation Assessment",
    description: "Choose to post my online assessment score on my profile to showcase interview readiness",
    duration: "40 minutes",
    questions: 30,
    category: "Interview Skills",
    status: "completed",
    score: 92,
    postedToProfile: true
  }
];

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState(DUMMY_ASSESSMENTS);
  const [completedAssessments, setCompletedAssessments] = useState([]);

  useEffect(() => {
    // In a real implementation, fetch completed assessments from API
    const savedCompletedAssessments = localStorage.getItem('completedAssessments');
    if (savedCompletedAssessments) {
      setCompletedAssessments(JSON.parse(savedCompletedAssessments));
    }
  }, []);

  const handlePostToProfile = (assessmentId) => {
    setAssessments(assessments.map(assessment => {
      if (assessment.id === assessmentId) {
        return { ...assessment, postedToProfile: true };
      }
      return assessment;
    }));
    // In a real implementation, this would make an API call to update the user's profile
  };

  return (
    <div className={styles.pageContainer}>
      <ToolbarPro />
      <div className={styles.contentWrapper}>
        <SidebarPRO activeItem="Assessments" />
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <h1 className={styles.title}>Career Assessments</h1>
            
            <div className={styles.assessmentGrid}>
              {assessments.map(assessment => (
                <div key={assessment.id} className={styles.assessmentCard}>
                  <div className={styles.cardHeader}>
                    <h2>{assessment.title}</h2>
                    <span className={`${styles.category} ${styles[assessment.status]}`}>
                      {assessment.status}
                    </span>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <p className={styles.description}>{assessment.description}</p>
                    
                    <div className={styles.assessmentInfo}>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Duration:</span>
                        <span>{assessment.duration}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Questions:</span>
                        <span>{assessment.questions}</span>
                      </div>
                    </div>

                    {assessment.status === 'completed' ? (
                      <div className={styles.completedSection}>
                        <div className={styles.score}>
                          Score: {assessment.score}%
                        </div>
                        <div className={styles.actionButtons}>
                          <Link
                            href={`/Basmala/assessments/${assessment.id}/results`}
                            className={styles.viewResultsButton}
                          >
                            View Results
                          </Link>
                          {!assessment.postedToProfile && (
                            <button
                              onClick={() => handlePostToProfile(assessment.id)}
                              className={styles.postToProfileButton}
                            >
                              Post to Profile
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/Basmala/assessments/${assessment.id}`}
                        className={styles.startButton}
                      >
                        Start Assessment
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 