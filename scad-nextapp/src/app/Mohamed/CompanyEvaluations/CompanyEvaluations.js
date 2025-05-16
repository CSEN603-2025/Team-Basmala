"use client";

import React, { useState, useEffect } from "react";
import styles from "./CompanyEvaluations.module.css";
import jsPDF from "jspdf";

import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Rating, 
  Grid, 
  Paper, 
  Box, 
  Tabs, 
  Tab, 
  Chip, 
  Alert, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  FormControlLabel, 
  Checkbox, 
  FormGroup,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Avatar
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import FlagIcon from '@mui/icons-material/Flag';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ReplyIcon from '@mui/icons-material/Reply';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

function CompanyEvaluations() {
  // Tab management
  const [tabValue, setTabValue] = useState(0);
  
  // Student evaluation states
  const [studentEvaluations, setStudentEvaluations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    rating: 3,
    performanceReview: "",
    skillsAcquired: "",
    areasOfImprovement: "",
    recommendForHire: "no",
  });
  
  // Report state
  const [selectedReport, setSelectedReport] = useState(null);
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportData, setReportData] = useState({
    title: "",
    introduction: "",
    body: "",
    selectedSkills: [],
    projectDifficulty: "moderate"
  });
  const [reports, setReports] = useState([]);
  
  // Mock data for completed internship students
  const completedInternshipStudents = [
    {
      id: 1,
      studentName: "Ahmed Hassan",
      university: "German University in Cairo",
      major: "Computer Science & Engineering",
      position: "Software Engineering Intern",
      duration: "3 months",
      completedOn: "March 15, 2025",
      photo: "/John.jpg"
    },
    {
      id: 2,
      studentName: "Sara Mohamed",
      university: "Cairo University",
      major: "Digital Media Engineering",
      position: "Frontend Developer Intern",
      duration: "6 months",
      completedOn: "April 30, 2025",
      photo: "/John.jpg"
    },
    {
      id: 3,
      studentName: "Omar Ibrahim",
      university: "Ain Shams University",
      major: "Computer Engineering",
      position: "Backend Developer Intern",
      duration: "4 months",
      completedOn: "May 10, 2025",
      photo: "/John.jpg"
    }
  ];
  
  // Available skills for selection
  const availableSkills = [
    { id: 1, name: "React.js" },
    { id: 2, name: "Node.js" },
    { id: 3, name: "Angular" },
    { id: 4, name: "Express" },
    { id: 5, name: "MongoDB" },
    { id: 6, name: "SQL" },
    { id: 7, name: "Python" },
    { id: 8, name: "Java" },
    { id: 9, name: "Project Management" },
    { id: 10, name: "Problem Solving" },
    { id: 11, name: "Communication" },
    { id: 12, name: "Teamwork" }
  ];
  
  const projectDifficulties = [
    { value: "easy", label: "Easy" },
    { value: "moderate", label: "Moderate" },
    { value: "challenging", label: "Challenging" },
    { value: "complex", label: "Complex" }
  ];
  
  // Sample existing reports
  const sampleReports = [
    {
      id: 1,
      studentId: 1,
      title: "Final Evaluation for Ahmed's Internship Project",
      introduction: "Ahmed worked on our customer management system during his internship.",
      body: "Throughout his internship, Ahmed demonstrated exceptional problem-solving skills and technical expertise. He successfully implemented several key features in our customer management system that have since improved our workflow efficiency by approximately 30%.",
      submissionDate: "April 2, 2025",
      selectedSkills: [1, 2, 5, 10],
      projectDifficulty: "challenging"
    }
  ];
  
  // Add a loading state to handle initial render
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data on component mount
  useEffect(() => {
    // Simulate fetching data from localStorage or an API
    if (typeof window !== 'undefined') {
      const savedEvaluations = localStorage.getItem("companyStudentEvaluations")
        ? JSON.parse(localStorage.getItem("companyStudentEvaluations"))
        : [];
      
      const savedReports = localStorage.getItem("companyStudentReports")
        ? JSON.parse(localStorage.getItem("companyStudentReports"))
        : sampleReports;
  
      setStudentEvaluations(savedEvaluations);
      setReports(savedReports);
      setIsLoading(false);
    }
  }, []);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // ===== STUDENT EVALUATION HANDLERS =====
  
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    
    // Check if student already has an evaluation
    const existingEvaluation = studentEvaluations.find(
      evaluation => evaluation.studentId === student.id
    );
    
    if (existingEvaluation) {
      // If editing an existing evaluation, load its data
      setFormData({
        studentName: existingEvaluation.studentName,
        rating: existingEvaluation.rating,
        performanceReview: existingEvaluation.performanceReview,
        skillsAcquired: existingEvaluation.skillsAcquired,
        areasOfImprovement: existingEvaluation.areasOfImprovement,
        recommendForHire: existingEvaluation.recommendForHire,
      });
    } else {
      // For new evaluation, just set the student name
      setFormData({
        ...formData,
        studentName: student.studentName,
      });
    }
    
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEvaluation = {
      id: Date.now(),
      ...formData,
      studentId: selectedStudent.id,
      timestamp: new Date().toISOString(),
    };

    // Update evaluations array
    const updatedEvaluations = [...studentEvaluations];
    const existingIndex = updatedEvaluations.findIndex(
      evaluation => evaluation.studentId === selectedStudent.id
    );
    
    if (existingIndex >= 0) {
      // Update existing evaluation
      updatedEvaluations[existingIndex] = newEvaluation;
    } else {
      // Add new evaluation
      updatedEvaluations.push(newEvaluation);
    }

    // Save to local storage
    localStorage.setItem("companyStudentEvaluations", JSON.stringify(updatedEvaluations));
    
    setStudentEvaluations(updatedEvaluations);
    setIsEditing(false);
    setSelectedStudent(null);
    
    // Reset form
    setFormData({
      studentName: "",
      rating: 3,
      performanceReview: "",
      skillsAcquired: "",
      areasOfImprovement: "",
      recommendForHire: "no",
    });

    alert("Student evaluation has been submitted!");
  };

  const handleViewEvaluation = (student) => {
    // Set the selected student
    setSelectedStudent(student);
    
    // Do NOT set isEditing to true, so the view stays read-only
  };

  const handleEditEvaluation = (student) => {
    // Set the selected student
    setSelectedStudent(student);
    
    // Find the evaluation for this student
    const evaluation = studentEvaluations.find(
      evaluation => evaluation.studentId === student.id
    );
    
    if (evaluation) {
      setFormData({
        studentName: evaluation.studentName,
        rating: evaluation.rating,
        performanceReview: evaluation.performanceReview,
        skillsAcquired: evaluation.skillsAcquired,
        areasOfImprovement: evaluation.areasOfImprovement,
        recommendForHire: evaluation.recommendForHire,
      });
      setIsEditing(true);
    }
  };

  const handleDeleteEvaluation = (studentId) => {
    if (window.confirm("Are you sure you want to delete this evaluation?")) {
      const updatedEvaluations = studentEvaluations.filter(
        evaluation => evaluation.studentId !== studentId
      );
      
      localStorage.setItem("companyStudentEvaluations", JSON.stringify(updatedEvaluations));
      setStudentEvaluations(updatedEvaluations);
    }
  };

  const handleCancelEvaluation = () => {
    setIsEditing(false);
    setSelectedStudent(null);
  };

  const isStudentEvaluated = (studentId) => {
    return studentEvaluations.some(evaluation => evaluation.studentId === studentId);
  };
  
  const getStudentEvaluation = (studentId) => {
    return studentEvaluations.find(evaluation => evaluation.studentId === studentId);
  };
  
  // ===== REPORT HANDLERS =====
  
  const handleCreateReport = (student) => {
    setSelectedStudent(student);
    setReportData({
      title: "",
      introduction: "",
      body: "",
      selectedSkills: [],
      projectDifficulty: "moderate"
    });
    setIsEditingReport(true);
    setSelectedReport(null);
    setReportDialogOpen(true);
  };
  
  const handleEditReport = (report) => {
    const student = completedInternshipStudents.find(s => s.id === report.studentId);
    setSelectedStudent(student);
    setReportData({
      title: report.title,
      introduction: report.introduction,
      body: report.body,
      selectedSkills: report.selectedSkills || [],
      projectDifficulty: report.projectDifficulty || "moderate"
    });
    setSelectedReport(report);
    setIsEditingReport(true);
    setReportDialogOpen(true);
  };
  
  const handleReportInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };
  
  const handleSkillSelection = (skillId) => {
    setReportData(prev => {
      const selectedSkills = [...prev.selectedSkills];
      if (selectedSkills.includes(skillId)) {
        return {
          ...prev,
          selectedSkills: selectedSkills.filter(id => id !== skillId)
        };
      } else {
        return {
          ...prev,
          selectedSkills: [...selectedSkills, skillId]
        };
      }
    });
  };
  
  const handleSaveReport = () => {
    // Prevent saving if no student is selected
    if (!selectedStudent) {
      alert("Please select a student before creating a report.");
      return;
    }

    // Form validation - check if required fields are filled
    if (!reportData.title.trim()) {
      alert("Please enter a report title");
      return;
    }
    
    if (!reportData.introduction.trim()) {
      alert("Please enter an introduction");
      return;
    }
    
    if (!reportData.body.trim()) {
      alert("Please enter a detailed description");
      return;
    }
    
    const now = new Date().toISOString().split('T')[0];
    
    let updatedReports = [];
    
    if (selectedReport) {
      // Edit existing report
      const updatedReport = {
        ...selectedReport,
        title: reportData.title,
        introduction: reportData.introduction,
        body: reportData.body,
        selectedSkills: reportData.selectedSkills,
        projectDifficulty: reportData.projectDifficulty,
        lastUpdated: now
      };
      
      updatedReports = reports.map(report => 
        report.id === selectedReport.id ? updatedReport : report
      );
    } else {
      // Create new report
      const newReport = {
        id: Date.now(),
        studentId: selectedStudent.id,
        studentName: selectedStudent.studentName,
        ...reportData,
        submissionDate: now,
        lastUpdated: now
      };
      
      updatedReports = [...reports, newReport];
    }
    
    // Save to localStorage
    localStorage.setItem("companyStudentReports", JSON.stringify(updatedReports));
    
    // Update state
    setReports(updatedReports);
    setIsEditingReport(false);
    setSelectedReport(null);
    setSelectedStudent(null);
    
    // Close the dialog after saving
    setReportDialogOpen(false);
    
    alert(selectedReport ? "Report updated successfully!" : "Report created successfully!");
  };
  
  const handleViewReport = (report) => {
    const student = completedInternshipStudents.find(s => s.id === report.studentId);
    setSelectedStudent(student);
    setSelectedReport(report);
    setReportDialogOpen(true);
  };
  
  const handleDeleteReport = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter(report => report.id !== reportId);
      localStorage.setItem("companyStudentReports", JSON.stringify(updatedReports));
      setReports(updatedReports);
    }
  };
  
  const handleDownloadPDF = () => {
    if (!selectedReport) {
      alert("No report selected to download.");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(selectedReport.title || "Student Performance Report", 10, 15);
    doc.setFontSize(12);
    doc.text(`Student: ${selectedReport.studentName || ""}`, 10, 30);
    doc.text(`Introduction:`, 10, 40);
    doc.text(selectedReport.introduction || "", 10, 48, { maxWidth: 180 });
    doc.text(`Details:`, 10, 65);
    doc.text(selectedReport.body || "", 10, 73, { maxWidth: 180 });
    doc.text(`Skills Demonstrated:`, 10, 90);
    if (selectedReport.selectedSkills && selectedReport.selectedSkills.length > 0) {
      const skills = selectedReport.selectedSkills.map(id => {
        const skill = availableSkills.find(s => s.id === id);
        return skill ? skill.name : "";
      }).join(", ");
      doc.text(skills, 10, 98, { maxWidth: 180 });
    }
    doc.text(`Project Difficulty: ${selectedReport.projectDifficulty || ""}`, 10, 115);
    doc.text(`Submission Date: ${selectedReport.submissionDate || ""}`, 10, 125);
    doc.save(`${selectedReport.title || "student-report"}.pdf`);
  };
  
  // ===== RENDER FUNCTIONS =====
  
  const renderStudentEvaluationsTab = () => {
    if (!selectedStudent && !isEditing) {
      return (
        <div className={styles.studentsList}>
          <Typography variant="h6" gutterBottom>
            Completed Internship Students
          </Typography>
          <Typography variant="body2" gutterBottom className={styles.instructions}>
            Select a student to provide your evaluation for their internship performance.
          </Typography>
          
          {completedInternshipStudents.map(student => (
            <Paper key={student.id} elevation={2} className={styles.studentCard} sx={{ mb: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <div style={{ height: 56, width: 56, background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: 700, fontSize: 24 }}>
                    {student.studentName[0]}
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6">{student.studentName}</Typography>
                  <Typography><strong>University:</strong> {student.university}</Typography>
                  <Typography><strong>Major:</strong> {student.major}</Typography>
                  <Typography><strong>Position:</strong> {student.position}</Typography>
                  <Typography><strong>Duration:</strong> {student.duration}</Typography>
                  <Typography><strong>Completed on:</strong> {student.completedOn}</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {isStudentEvaluated(student.id) ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, width: '100%' }}>
                      <Chip 
                        label="Evaluated" 
                        color="success" 
                        icon={<ThumbUpIcon />} 
                        sx={{ mb: 1, width: '100%', justifyContent: 'flex-start' }} 
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteEvaluation(student.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditEvaluation(student)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewEvaluation(student)}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', alignItems: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSelectStudent(student)}
                        fullWidth
                      >
                        Evaluate Student
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleCreateReport(student)}
                        fullWidth
                        startIcon={<AssignmentIcon />}
                      >
                        Create Report
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      );
    } else if (selectedStudent && !isEditing) {
      const evaluation = getStudentEvaluation(selectedStudent.id);
      
      if (!evaluation) {
        // This should not normally happen, but just in case
        return (
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" color="error">Evaluation not found</Typography>
            <Button 
              variant="outlined" 
              onClick={() => setSelectedStudent(null)}
              sx={{ mt: 2 }}
            >
              Back to List
            </Button>
          </Paper>
        );
      }
      
      return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar src={selectedStudent.photo} alt={evaluation.studentName} sx={{ width: 64, height: 64, mr: 2 }} />
            <Typography variant="h5" gutterBottom>
              Evaluation for {evaluation.studentName}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Overall Performance:</Typography>
            <Rating value={parseInt(evaluation.rating)} readOnly size="large" />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {evaluation.rating === '5' ? 'Outstanding' : 
               evaluation.rating === '4' ? 'Excellent' : 
               evaluation.rating === '3' ? 'Good' : 
               evaluation.rating === '2' ? 'Fair' : 'Needs Improvement'}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Performance Review:</Typography>
            <Typography variant="body1" paragraph>{evaluation.performanceReview}</Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Skills Acquired:</Typography>
            <Typography variant="body1" paragraph>{evaluation.skillsAcquired}</Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Areas for Improvement:</Typography>
            <Typography variant="body1" paragraph>{evaluation.areasOfImprovement}</Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Would recommend for hire: {evaluation.recommendForHire === "yes" ? "Yes" : "No"}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<ReplyIcon />}
              onClick={() => setSelectedStudent(null)}
            >
              Back to List
            </Button>
            <Button 
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => handleEditEvaluation(selectedStudent)}
            >
              Edit Evaluation
            </Button>
          </Box>
        </Paper>
      );
    } else {
      // Editing form
      const isEditingExisting = studentEvaluations.some(evaluation => evaluation.studentId === selectedStudent?.id);
      
      return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {isEditingExisting ? "Update Evaluation" : "New Student Evaluation"}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: 2 }}
                />
                
                <Typography id="rating-label" gutterBottom>
                  Overall Performance (1-5)
                </Typography>
                <Rating
                  name="rating"
                  value={parseInt(formData.rating)}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      rating: newValue.toString(),
                    });
                  }}
                  size="large"
                  sx={{ mb: 3 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Performance Review"
                  name="performanceReview"
                  value={formData.performanceReview}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                  helperText="Provide a detailed review of the student's performance during the internship"
                  sx={{ mb: 3 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Skills Acquired"
                  name="skillsAcquired"
                  value={formData.skillsAcquired}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  fullWidth
                  required
                  helperText="List the skills the student has acquired or improved during the internship"
                  sx={{ mb: 3 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Areas for Improvement"
                  name="areasOfImprovement"
                  value={formData.areasOfImprovement}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  fullWidth
                  required
                  helperText="Suggest areas where the student could improve their skills or knowledge"
                  sx={{ mb: 3 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Would you recommend this student for hire in the future?
                </Typography>
                <FormGroup row sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.recommendForHire === "no"}
                        onChange={() => setFormData({...formData, recommendForHire: "no"})}
                      />
                    }
                    label="No"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.recommendForHire === "yes"}
                        onChange={() => setFormData({...formData, recommendForHire: "yes"})}
                      />
                    }
                    label="Yes"
                  />
                </FormGroup>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancelEvaluation}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    {isEditingExisting ? "Update Evaluation" : "Submit Evaluation"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      );
    }
  };

  const renderReportsTab = () => {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Student Performance Reports
        </Typography>
        <Typography variant="body2" gutterBottom className={styles.instructions}>
          Create and manage detailed reports on students' internship performance and projects. These reports can be shared with universities and the SCAD administration.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Reports List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedStudent(null);
              setSelectedReport(null);
              setIsEditingReport(true);
              setReportDialogOpen(true);
            }}
          >
            + NEW REPORT
          </Button>
        </Box>
        
        {reports.length === 0 ? (
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1" gutterBottom>
              You haven't created any student performance reports yet.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Select a student from the Evaluations tab to create a detailed report.
            </Typography>
          </Paper>
        ) : (
          reports.map(report => {
            const student = completedInternshipStudents.find(s => s.id === report.studentId);
            return (
              <Paper key={report.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {student && <Avatar src={student.photo} alt={report.studentName || "Student"} />}
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h6">{report.title}</Typography>
                    <Typography variant="subtitle1" color="primary">
                      {report.studentName || "Unknown Student"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {report.introduction?.substring(0, 100)}...
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {report.selectedSkills?.map(skillId => {
                        const skill = availableSkills.find(s => s.id === skillId);
                        return skill ? (
                          <Chip 
                            key={skillId} 
                            label={skill.name} 
                            size="small" 
                            sx={{ mr: 0.5, mb: 0.5 }} 
                          />
                        ) : null;
                      })}
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Submitted:</strong> {report.submissionDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditReport(report)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewReport(report)}
                    >
                      View
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        )}
        
        {reportDialogOpen && (
          <Dialog
            open={reportDialogOpen}
            onClose={() => setReportDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedReport ? "View Report" : "Create New Student Report"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {selectedReport 
                  ? "Review the details of your student performance report below."
                  : "Fill out the form below to create a detailed report for this student's internship performance."}
              </DialogContentText>
              {/* Student selection dropdown for new report */}
              {!selectedReport && isEditingReport && (
                <TextField
                  select
                  label="Select Student"
                  value={selectedStudent ? selectedStudent.id : ''}
                  onChange={e => {
                    const student = completedInternshipStudents.find(s => s.id === Number(e.target.value));
                    setSelectedStudent(student);
                  }}
                  fullWidth
                  sx={{ mb: 3, mt: 2 }}
                >
                  <MenuItem value="">-- Select Student --</MenuItem>
                  {completedInternshipStudents.map(student => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.studentName}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              {/* Student details at the top */}
              {selectedStudent && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 2 }}>
                  <Avatar src={selectedStudent.photo} alt={selectedStudent.studentName} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">{selectedStudent.studentName}</Typography>
                    <Typography variant="body2" color="textSecondary">{selectedStudent.university} | {selectedStudent.major}</Typography>
                  </Box>
                </Box>
              )}
              
              {/* Report form or details view */}
              {selectedReport && !isEditingReport ? (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {selectedReport.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedReport.introduction}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedReport.body}
                  </Typography>
                  
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Skills Demonstrated:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedReport.selectedSkills?.map(skillId => {
                        const skill = availableSkills.find(s => s.id === skillId);
                        return skill ? (
                          <Chip key={skillId} label={skill.name} />
                        ) : null;
                      })}
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Project Difficulty:
                    </Typography>
                    <Typography variant="body1">
                      {projectDifficulties.find(d => d.value === selectedReport.projectDifficulty)?.label || 'Not specified'}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <TextField
                    label="Report Title"
                    name="title"
                    value={reportData.title}
                    onChange={handleReportInputChange}
                    fullWidth
                    required
                    sx={{ mb: 3, mt: 2 }}
                  />
                  <TextField
                    label="Introduction"
                    name="introduction"
                    value={reportData.introduction}
                    onChange={handleReportInputChange}
                    fullWidth
                    multiline
                    rows={2}
                    required
                    helperText="Briefly introduce the student's internship project and role"
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    label="Detailed Report"
                    name="body"
                    value={reportData.body}
                    onChange={handleReportInputChange}
                    fullWidth
                    multiline
                    rows={6}
                    required
                    helperText="Provide a comprehensive assessment of the student's performance, achievements, and growth during the internship"
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Skills Demonstrated:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {availableSkills.map(skill => (
                      <Chip
                        key={skill.id}
                        label={skill.name}
                        onClick={() => handleSkillSelection(skill.id)}
                        color={reportData.selectedSkills.includes(skill.id) ? "primary" : "default"}
                        variant={reportData.selectedSkills.includes(skill.id) ? "filled" : "outlined"}
                      />
                    ))}
                  </Box>
                  
                  <TextField
                    select
                    label="Project Difficulty"
                    name="projectDifficulty"
                    value={reportData.projectDifficulty}
                    onChange={handleReportInputChange}
                    fullWidth
                    helperText="Rate the difficulty level of the projects assigned to the student"
                    sx={{ mb: 2 }}
                  >
                    {projectDifficulties.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => {
                  setReportDialogOpen(false);
                  setSelectedReport(null);
                  setIsEditingReport(false);
                  setSelectedStudent(null);
                }} 
                color="primary"
              >
                Close
              </Button>
              {selectedReport && !isEditingReport ? (
                <>
                  <Button 
                    onClick={handleDownloadPDF} 
                    color="primary"
                    startIcon={<DownloadIcon />}
                  >
                    Download PDF
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsEditingReport(true);
                    }} 
                    color="secondary"
                    startIcon={<EditIcon />}
                  >
                    Edit Report
                  </Button>
                </>
              ) : isEditingReport ? (
                <Button 
                  onClick={handleSaveReport} 
                  color="primary"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  {selectedReport ? "Update Report" : "Save Report"}
                </Button>
              ) : null}
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  };
  
  const renderSummaryTab = () => {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Evaluation Summary
        </Typography>
        <Typography variant="body2" gutterBottom className={styles.instructions}>
          Overview of all student internship evaluations and their performance metrics.
        </Typography>
        
        {studentEvaluations.length === 0 ? (
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1" gutterBottom>
              You haven't submitted any student evaluations yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setTabValue(0)}
            >
              Go to Evaluations
            </Button>
          </Paper>
        ) : (
          <Box>
            {/* Performance distribution chart - simulated with a simple UI */}
            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Performance Distribution</Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 100, mb: 1 }}>
                {[1, 2, 3, 4, 5].map(rating => {
                  const count = studentEvaluations.filter(e => parseInt(e.rating) === rating).length;
                  const height = count > 0 ? (count / studentEvaluations.length) * 100 : 10;
                  return (
                    <Box 
                      key={rating} 
                      sx={{ 
                        height: `${height}px`, 
                        width: '18%', 
                        backgroundColor: rating >= 4 ? '#4caf50' : rating === 3 ? '#ff9800' : '#f44336',
                        mx: '1%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        p: 1,
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {count}
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                {[1, 2, 3, 4, 5].map(rating => (
                  <Typography key={rating} variant="body2" sx={{ width: '20%', textAlign: 'center' }}>
                    {rating} ⭐
                  </Typography>
                ))}
              </Box>
            </Paper>

            {/* Student evaluations summary */}
            {studentEvaluations.map(evaluation => {
              const student = completedInternshipStudents.find(s => s.id === evaluation.studentId);
              if (!student) return null;
              
              return (
                <Paper key={evaluation.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <Avatar src={student.photo} alt={evaluation.studentName} />
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="subtitle1">{evaluation.studentName}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>Rating:</Typography>
                        <Rating value={parseInt(evaluation.rating)} readOnly size="small" />
                      </Box>
                      <Typography variant="body2">
                        Recommend for hire: {evaluation.recommendForHire === "yes" ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => {
                          setSelectedStudent(student);
                          setTabValue(0);
                        }}
                      >
                        View Full Evaluation
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          </Box>
        )}
      </div>
    );
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Performance Evaluations
        </Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Student Evaluations" />
          <Tab label="Performance Reports" />
          <Tab label="Evaluation Summary" />
        </Tabs>
        
        {tabValue === 0 && renderStudentEvaluationsTab()}
        {tabValue === 1 && renderReportsTab()}
        {tabValue === 2 && renderSummaryTab()}
      </Paper>
    </Container>
  );
}

export default CompanyEvaluations;