'use client';
import { useState } from 'react';
import styles from './WorkshopCompletion.module.css';
import { FaCertificate, FaStar } from 'react-icons/fa';

export default function WorkshopCompletion({ workshop, onClose }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGenerateCertificate = () => {
    // In a real implementation, this would call an API to generate and download the certificate
    const certificateContent = `
      Certificate of Attendance

      This is to certify that

      [Student Name]

      has successfully attended the workshop

      "${workshop.title}"

      conducted on ${new Date(workshop.date + 'T' + workshop.time).toLocaleDateString()}
      Duration: ${workshop.duration}
      Presenter: ${workshop.presenter}

      SCAD Office
    `;

    const element = document.createElement('a');
    const file = new Blob([certificateContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${workshop.title}-Certificate.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // In a real implementation, this would send the feedback to an API
    console.log({
      workshopId: workshop.id,
      rating,
      feedback,
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.thankYouMessage}>
          <h3>Thank You!</h3>
          <p>Your feedback has been submitted successfully.</p>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.certificateSection}>
        <h3>Workshop Certificate</h3>
        <p>Download your certificate of attendance for this workshop.</p>
        <button
          className={styles.certificateButton}
          onClick={handleGenerateCertificate}
        >
          <FaCertificate />
          Download Certificate
        </button>
      </div>

      <div className={styles.feedbackSection}>
        <h3>Workshop Feedback</h3>
        <form onSubmit={handleSubmitFeedback}>
          <div className={styles.ratingContainer}>
            <p>Rate this workshop:</p>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`${styles.star} ${
                    star <= (hoveredStar || rating) ? styles.active : ''
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                />
              ))}
            </div>
          </div>

          <div className={styles.feedbackContainer}>
            <label htmlFor="feedback">Additional feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about the workshop..."
              className={styles.feedbackInput}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!rating}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
} 