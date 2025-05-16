'use client'
import { useState, useEffect } from 'react';
import styles from './SCAD.module.css';

const SCAD = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('cycle');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [students, setStudents] = useState([]);
  const [reports, setReports] = useState([]);
  const [filterMajor, setFilterMajor] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  // Clarification state
  const [clarification, setClarification] = useState('');
  const [clarificationSubmitted, setClarificationSubmitted] = useState(false);

  // Fetch students (mock data for now)
  useEffect(() => {
    const mockStudents = [
      { id: 1, name: 'Ahmed Mohamed', major: 'CS', email: 'ahmed@example.com' },
      { id: 2, name: 'Sara Ali', major: 'IT', email: 'sara@example.com' },
      { id: 3, name: 'Omar Hassan', major: 'DS', email: 'omar@example.com' },
    ];
    setStudents(mockStudents);
  }, []);

  // Fetch reports (mock data for now)
  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        studentId: 1,
        studentName: 'Ahmed Mohamed',
        major: 'CS',
        title: 'Internship at Tech Co',
        status: 'pending',
        submissionDate: '2025-04-15',
        content: 'Detailed report about my experience...',
        company: 'Tech Co',
        supervisor: 'Mr. Khaled',
        evaluation: 'Excellent',
        feedback: 'Great performance and teamwork.',
        attachment: 'report1.pdf',
        internshipStartDate: '2025-02-01',
        internshipEndDate: '2025-04-01'
      },
      {
        id: 2,
        studentId: 2,
        studentName: 'Sara Ali',
        major: 'IT',
        title: 'Summer Internship',
        status: 'accepted',
        submissionDate: '2025-04-10',
        content: 'Working on database management systems...',
        company: 'Data Solutions',
        supervisor: 'Ms. Fatma',
        evaluation: 'Very Good',
        feedback: 'Strong technical skills.',
        attachment: 'report2.pdf',
        internshipStartDate: '2025-01-15',
        internshipEndDate: '2025-03-15'
      },
      {
        id: 3,
        studentId: 3,
        studentName: 'Omar Hassan',
        major: 'DS',
        title: 'Data Analysis Internship',
        status: 'flagged',
        submissionDate: '2025-04-12',
        content: 'Applied machine learning techniques...',
        company: 'Analytics Hub',
        supervisor: 'Dr. Samir',
        evaluation: 'Needs Improvement',
        feedback: 'Should focus more on documentation.',
        attachment: 'report3.pdf',
        internshipStartDate: '2025-03-01',
        internshipEndDate: '2025-05-01'
      },
    ];
    setReports(mockReports);
  }, []);

  // Save internship cycle dates
  const saveInternshipCycle = (e) => {
    e.preventDefault();
    alert(`Internship cycle set: ${startDate} to ${endDate}`);
  };

  // Filter reports based on selected filters
  const filteredReports = reports.filter(report => {
    return (filterMajor === 'all' || report.major === filterMajor) && 
           (filterStatus === 'all' || report.status === filterStatus);
  });

  // View report details
  const viewReportDetails = (report) => {
    setSelectedReport(report);
    setClarification('');
    setClarificationSubmitted(false);
  };

  // Close report details modal
  const closeReportDetails = () => {
    setSelectedReport(null);
    setClarification('');
    setClarificationSubmitted(false);
  };

  // Submit clarification handler
  const handleClarificationSubmit = (e) => {
    e.preventDefault();
    // Here you would send the clarification to your backend
    setClarificationSubmitted(true);
    setTimeout(() => setClarificationSubmitted(false), 2000);
    setClarification('');
  };

  return (
    <div className={styles.scadContainer}>
      <h1 className={styles.title}>SCAD Office Portal</h1>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'cycle' ? styles.active : ''}`}
          onClick={() => setActiveTab('cycle')}
        >
          Internship Cycle
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'students' ? styles.active : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'reports' ? styles.active : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      <div className={styles.tabContent}>
        {/* Internship Cycle Management */}
        {activeTab === 'cycle' && (
          <div className={styles.cycleSection}>
            <h2>Set Internship Cycle</h2>
            <form onSubmit={saveInternshipCycle} className={styles.cycleForm}>
              <div className={styles.formGroup}>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>Save Cycle Dates</button>
            </form>
            
            {startDate && endDate && (
              <div className={styles.currentCycle}>
                <h3>Current Internship Cycle:</h3>
                <p>Start: {new Date(startDate).toLocaleDateString()}</p>
                <p>End: {new Date(endDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        )}

        {/* Students List */}
        {activeTab === 'students' && (
          <div className={styles.studentsSection}>
            <h2>All Students</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Major</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.major}</td>
                      <td>{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Management */}
        {activeTab === 'reports' && (
          <div className={styles.reportsSection}>
            <h2>Internship Reports</h2>
            
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <label htmlFor="majorFilter">Filter by Major:</label>
                <select 
                  id="majorFilter" 
                  value={filterMajor} 
                  onChange={(e) => setFilterMajor(e.target.value)}
                >
                  <option value="all">All Majors</option>
                  <option value="CS">Computer Science</option>
                  <option value="IT">Information Technology</option>
                  <option value="DS">Data Science</option>
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select 
                  id="statusFilter" 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Major</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Submission Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map(report => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.studentName}</td>
                      <td>{report.major}</td>
                      <td>{report.title}</td>
                      <td>
                        <span className={`${styles.status} ${styles[report.status]}`}>
                          {report.status}
                        </span>
                      </td>
                      <td>{new Date(report.submissionDate).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className={styles.viewButton}
                          onClick={() => viewReportDetails(report)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{selectedReport.title}</h2>
              <button className={styles.closeButton} onClick={closeReportDetails}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.reportInfo}>
                <p><strong>Student:</strong> {selectedReport.studentName}</p>
                <p><strong>Major:</strong> {selectedReport.major}</p>
                <p><strong>Company:</strong> {selectedReport.company}</p>
                <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                <p><strong>Internship Start Date:</strong> {selectedReport.internshipStartDate ? new Date(selectedReport.internshipStartDate).toLocaleDateString() : '-'}</p>
                <p><strong>Internship End Date:</strong> {selectedReport.internshipEndDate ? new Date(selectedReport.internshipEndDate).toLocaleDateString() : '-'}</p>
                <p><strong>Evaluation:</strong> {selectedReport.evaluation}</p>
                <p><strong>Feedback:</strong> {selectedReport.feedback}</p>
                <p>
                  <strong>Attachment:</strong>{' '}
                  <a
                    href={`/${selectedReport.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedReport.attachment}
                  </a>
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`${styles.status} ${styles[selectedReport.status]}`}>
                    {selectedReport.status}
                  </span>
                </p>
                <p><strong>Submission Date:</strong> {new Date(selectedReport.submissionDate).toLocaleDateString()}</p>
              </div>
              <div className={styles.reportContent}>
                <h3>Report Content:</h3>
                <p>{selectedReport.content}</p>
              </div>
              {/* Clarification form for flagged or rejected */}
              {(selectedReport.status === 'flagged' || selectedReport.status === 'rejected') && (
                <form onSubmit={handleClarificationSubmit} className={styles.clarificationForm}>
                  <label htmlFor="clarification"><strong>Clarification Comment:</strong></label>
                  <textarea
                    id="clarification"
                    value={clarification}
                    onChange={(e) => setClarification(e.target.value)}
                    rows={3}
                    placeholder="Enter your clarification here..."
                    required
                    className={styles.clarificationTextarea}
                  />
                  <button type="submit" className={styles.submitButton}>Submit Clarification</button>
                  {clarificationSubmitted && (
                    <span className={styles.successMsg}>Clarification submitted!</span>
                  )}
                </form>
              )}
              <div className={styles.actionButtons}>
                <button className={`${styles.actionButton} ${styles.accept}`}>Accept</button>
                <button className={`${styles.actionButton} ${styles.reject}`}>Reject</button>
                <button className={`${styles.actionButton} ${styles.flag}`}>Flag</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCAD;