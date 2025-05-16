'use client'
import { useState, useEffect } from 'react';
import styles from './SCAD.module.css';
import jsPDF from "jspdf";

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
    // ...inside useEffect for mockReports...
const mockReports = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Ahmed Mohamed',
    major: 'CS',
    title: 'Internship at Google',
    status: 'pending',
    submissionDate: '2025-04-15',
    content: 'Detailed report about my experience...',
    company: 'Google',
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
    company: 'Microsoft',
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
    company: 'IBM',
    supervisor: 'Dr. Samir',
    evaluation: 'Needs Improvement',
    feedback: 'Should focus more on documentation.',
    attachment: 'report3.pdf',
    internshipStartDate: '2025-03-01',
    internshipEndDate: '2025-05-01'
  },
  {
    id: 4,
    studentId: 4,
    studentName: 'Layla Youssef',
    major: 'CS',
    title: 'Web App Internship',
    status: 'flagged',
    submissionDate: '2025-04-18',
    content: 'Worked on frontend and backend tasks...',
    company: 'Meta',
    supervisor: 'Eng. Mona',
    evaluation: 'Satisfactory',
    feedback: 'Needs to improve code quality.',
    attachment: 'report4.pdf',
    internshipStartDate: '2025-02-10',
    internshipEndDate: '2025-04-10'
  },
  {
    id: 5,
    studentId: 5,
    studentName: 'Hassan Nabil',
    major: 'IT',
    title: 'Network Internship',
    status: 'rejected',
    submissionDate: '2025-04-20',
    content: 'Assisted in network setup and troubleshooting...',
    company: 'Cisco',
    supervisor: 'Mr. Adel',
    evaluation: 'Poor',
    feedback: 'Report lacks sufficient detail.',
    attachment: 'report5.pdf',
    internshipStartDate: '2025-03-05',
    internshipEndDate: '2025-05-05'
  }
];
// ...existing code...
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

  const handleDownloadPDF = () => {
    if (!selectedReport) {
      alert("No report selected to download.");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(selectedReport.title || "Internship Report", 10, 15);
    doc.setFontSize(12);
    doc.text(`Student: ${selectedReport.studentName || ""}`, 10, 30);
    doc.text(`Major: ${selectedReport.major || ""}`, 10, 40);
    doc.text(`Company: ${selectedReport.company || ""}`, 10, 50);
    doc.text(`Supervisor: ${selectedReport.supervisor || ""}`, 10, 60);
    doc.text(`Internship Start: ${selectedReport.internshipStartDate || ""}`, 10, 70);
    doc.text(`Internship End: ${selectedReport.internshipEndDate || ""}`, 10, 80);
    doc.text(`Evaluation: ${selectedReport.evaluation || ""}`, 10, 90);
    doc.text(`Feedback: ${selectedReport.feedback || ""}`, 10, 100);
    doc.text(`Status: ${selectedReport.status || ""}`, 10, 110);
    doc.text(`Submission Date: ${selectedReport.submissionDate || ""}`, 10, 120);
    doc.text("Report Content:", 10, 135);
    doc.text(selectedReport.content || "", 10, 143, { maxWidth: 180 });
    doc.save(`${selectedReport.title || "internship-report"}.pdf`);
  };

  return (
    <div className={styles.scadContainer}>
      
      
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
    <label htmlFor="clarification" className={styles.clarificationLabel}>
      <strong>Clarification Comment:</strong>
    </label>
    <div className={styles.clarificationRow}>
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
    </div>
    {clarificationSubmitted && (
      <span className={styles.successMsg}>Clarification submitted!</span>
    )}
  </form>
)}
                          // ...existing code...
            <div className={styles.actionButtons}>
              <button
                className={`${styles.actionButton} ${styles.download}`}
                onClick={handleDownloadPDF}
                type="button"
              >
                          Download as PDF
                        </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            };

export default SCAD;