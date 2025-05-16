"use client";

import React, { useState, useEffect } from "react";
import styles from "./StudentsEvaluations.module.css";
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
  FormControl,
  InputLabel,
  Select
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

function StudentsEvaluations() {
  // Tab management
  const [tabValue, setTabValue] = useState(0);
  
  // Company evaluation states - Changed to support multiple evaluations
  const [userEvaluations, setUserEvaluations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    rating: 3,
    feedback: "",
    recommend: "yes",
  });
  
  // Report state
  const [selectedReport, setSelectedReport] = useState(null);
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [appealDialogOpen, setAppealDialogOpen] = useState(false);
  const [appealMessage, setAppealMessage] = useState('');
  const [reportData, setReportData] = useState({
    title: "",
    introduction: "",
    body: "",
    selectedCourses: [],
    selectedMajor: "all" // Default to showing all courses
  });
  const [reports, setReports] = useState([]);
  
  // State to manage course visibility
  const [showCourses, setShowCourses] = useState(false);
  
  // Mock data
  const completedInternships = [
    {
      id: 1,
      companyName: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      position: "Software Engineering Intern",
      duration: "3 months",
      completedOn: "March 15, 2025",
      evaluated: false
    },
    {
      id: 2,
      companyName: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      position: "Frontend Developer Intern",
      duration: "6 months",
      completedOn: "April 30, 2025",
      evaluated: false
    },
    {
      id: 3,
      companyName: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      position: "Data Analyst Intern",
      duration: "4 months",
      completedOn: "May 10, 2025",
      evaluated: false
    }
  ];
  
  // Available majors for course filtering
  const availableMajors = [
    { id: "csen", name: "Computer Science & Engineering" },
    { id: "dmet", name: "Digital Media Engineering & Technology" },
    { id: "comm", name: "Communications & Networks Engineering" },
    { id: "mct", name: "Management & Technology" }
  ];
  
  // Courses organized by major
  const coursesByMajor = {
    csen: [
      { id: 1, code: "CSEN 401", name: "Computer Programming Lab" },
      { id: 2, code: "CSEN 402", name: "Computer Programming" },
      { id: 3, code: "CSEN 403", name: "Digital Design" },
      { id: 4, code: "CSEN 501", name: "Database Systems" },
      { id: 5, code: "CSEN 601", name: "Software Engineering" },
      { id: 7, code: "CSEN 602", name: "Computer Architecture" },
      { id: 8, code: "CSEN 603", name: "Algorithms and Data Structures" }
    ],
    dmet: [
      { id: 6, code: "DMET 501", name: "Introduction to Media Engineering" },
      { id: 9, code: "DMET 502", name: "Computer Graphics" },
      { id: 10, code: "DMET 503", name: "Game Development" },
      { id: 11, code: "DMET 601", name: "Interactive Media Design" }
    ],
    comm: [
      { id: 12, code: "COMM 401", name: "Introduction to Computer Networks" },
      { id: 13, code: "COMM 501", name: "Wireless Communications" },
      { id: 14, code: "COMM 502", name: "Network Security" }
    ],
    mct: [
      { id: 15, code: "MCT 301", name: "Project Management" },
      { id: 16, code: "MCT 401", name: "Technology Entrepreneurship" },
      { id: 17, code: "MCT 501", name: "Innovation Management" }
    ]
  };
  
  // Helper function to get all courses (flattened)
  const getAllCourses = () => {
    return Object.values(coursesByMajor).flat();
  };
  
  const availableCourses = getAllCourses();
  
  const userReports = [
  {
    id: 1,
    title: "Software Engineering Internship at Google",
    introduction: "During Summer 2025, I had the opportunity to work at Google as a Software Engineering Intern...",
    body: "Throughout my internship, I gained hands-on experience with React, Node.js, and cloud technologies...",
    submissionDate: "March 20, 2025",
    status: "Approved",
    companyName: "Google",
    selectedCourses: [1, 4, 5],
    comments: [
      {
        id: 1,
        author: "Dr. Ahmed Hassan",
        date: "March 25, 2025",
        text: "Great report! Your technical details are well-documented.",
        type: "faculty"
      }
    ]
  },
  {
    id: 2,
    title: "Frontend Development Internship at Microsoft",
    introduction: "During Spring 2025, I worked at Microsoft as a Frontend Developer Intern...",
    body: "I contributed to building scalable UI components using React and TypeScript...",
    submissionDate: "April 15, 2025",
    status: "Pending",
    companyName: "Microsoft",
    selectedCourses: [2, 3, 6],
    comments: []
  },
  {
    id: 3,
    title: "Data Analysis Internship at IBM",
    introduction: "In early 2025, I joined IBM as a Data Analyst Intern...",
    body: "I worked on analyzing large datasets using Python and SQL, and created insightful dashboards...",
    submissionDate: "May 5, 2025",
    status: "Flagged",
    companyName: "IBM",
    selectedCourses: [7, 8, 9],
    comments: [
      {
        id: 2,
        author: "Dr. Sarah Ali",
        date: "May 10, 2025",
        text: "Your report is missing details about the tools you used for data visualization.",
        type: "faculty"
      }
    ]
  }
];
  
  // Add a loading state to handle initial render
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data on component mount
  useEffect(() => {
    try {
      // Simulate fetching data from localStorage or an API
      const savedEvaluations = localStorage.getItem("userEvaluations")
        ? JSON.parse(localStorage.getItem("userEvaluations"))
        : [];

      const savedReports = localStorage.getItem("userReports")
        ? JSON.parse(localStorage.getItem("userReports"))
        : userReports;

      // Validate the structure of savedEvaluations
      if (!Array.isArray(savedEvaluations)) {
        console.error("Invalid data format for userEvaluations. Resetting to default.");
        localStorage.removeItem("userEvaluations");
        setUserEvaluations([]);
      } else {
        setUserEvaluations(savedEvaluations);
      }

      // Validate the structure of savedReports
      if (!Array.isArray(savedReports)) {
        console.error("Invalid data format for userReports. Resetting to default.");
        localStorage.removeItem("userReports");
        setReports(userReports);
      } else {
        setReports(savedReports);
      }

      // Display alert for flagged reports on component mount
      const hasFlaggedReports = savedReports.some(
        (report) => report.status === "Flagged" || report.status === "Rejected"
      );

      if (hasFlaggedReports) {
        console.warn("You have flagged or rejected reports that need attention.");
      }

      // Mark loading as complete
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data: ", error);
      setUserEvaluations([]);
      setReports(userReports);
      setIsLoading(false);
    }
  }, []);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // ===== COMPANY EVALUATION HANDLERS =====
  
  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    
    // Check if company already has an evaluation
    const existingEvaluation = userEvaluations.find(
      evaluation => evaluation.companyId === company.id
    );
    
    if (existingEvaluation) {
      // If editing an existing evaluation, load its data
      setFormData({
        companyName: existingEvaluation.companyName,
        rating: existingEvaluation.rating,
        feedback: existingEvaluation.feedback,
        recommend: existingEvaluation.recommend,
      });
    } else {
      // For new evaluation, just set the company name
      setFormData({
        ...formData,
        companyName: company.companyName,
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
      companyId: selectedCompany.id,
      timestamp: new Date().toISOString(),
    };

    // Update evaluations array instead of replacing single evaluation
    const updatedEvaluations = [...userEvaluations];
    const existingIndex = updatedEvaluations.findIndex(
      evaluation => evaluation.companyId === selectedCompany.id
    );
    
    if (existingIndex >= 0) {
      // Update existing evaluation
      updatedEvaluations[existingIndex] = newEvaluation;
    } else {
      // Add new evaluation
      updatedEvaluations.push(newEvaluation);
    }

    // Save to local storage
    localStorage.setItem("userEvaluations", JSON.stringify(updatedEvaluations));
    
    setUserEvaluations(updatedEvaluations);
    setIsEditing(false);
    setSelectedCompany(null);
    
    // Reset form
    setFormData({
      companyName: "",
      rating: 3,
      feedback: "",
      recommend: "yes",
    });

    alert("Your evaluation has been submitted!");
  };

  const handleViewEvaluation = (company) => {
    // Set the selected company
    setSelectedCompany(company);

    // Ensure the tab switches to the Company Evaluations tab for viewing
    setTabValue(0);
  };

  const handleEditEvaluation = (company) => {
    // Set the selected company
    setSelectedCompany(company);
    
    // Find the evaluation for this company
    const evaluation = userEvaluations.find(
      evaluation => evaluation.companyId === company.id
    );
    
    if (evaluation) {
      setFormData({
        companyName: evaluation.companyName,
        rating: evaluation.rating,
        feedback: evaluation.feedback,
        recommend: evaluation.recommend,
      });
      setIsEditing(true);
    }
  };

  const handleDeleteEvaluation = (companyId) => {
    if (window.confirm("Are you sure you want to delete your evaluation?")) {
      const updatedEvaluations = userEvaluations.filter(
        evaluation => evaluation.companyId !== companyId
      );
      
      localStorage.setItem("userEvaluations", JSON.stringify(updatedEvaluations));
      setUserEvaluations(updatedEvaluations);
    }
  };

  const handleCancelEvaluation = () => {
    setIsEditing(false);
    setSelectedCompany(null);
  };

  const isCompanyEvaluated = (companyId) => {
    return userEvaluations.some(evaluation => evaluation.companyId === companyId);
  };
  
  const getCompanyEvaluation = (companyId) => {
    return userEvaluations.find(evaluation => evaluation.companyId === companyId);
  };
  
  // ===== REPORT HANDLERS =====
  
  const handleCreateReport = () => {
    setReportDialogOpen(true); // Open the dialog to create a new report
  };
  
  const handleEditReport = (report) => {
    setReportData({
      title: report.title,
      introduction: report.introduction,
      body: report.body,
      selectedCourses: report.selectedCourses || [],
      selectedMajor: report.selectedMajor || "all"
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
  
  const handleCourseSelection = (courseId) => {
    setReportData(prev => {
      const selectedCourses = [...prev.selectedCourses];
      if (selectedCourses.includes(courseId)) {
        return {
          ...prev,
          selectedCourses: selectedCourses.filter(id => id !== courseId)
        };
      } else {
        return {
          ...prev,
          selectedCourses: [...selectedCourses, courseId]
        };
      }
    });
  };
  
  // Handler for major selection change
  const handleMajorChange = (event) => {
    setReportData({
      ...reportData,
      selectedMajor: event.target.value
    });
  };
  
  const handleSaveReport = (finalize = false) => {
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
    
    if (reportData.selectedCourses.length === 0) {
      alert("Please select at least one course");
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
        selectedCourses: reportData.selectedCourses,
        selectedMajor: reportData.selectedMajor,
        status: finalize ? "Pending" : selectedReport.status === "Draft" ? "Draft" : selectedReport.status,
        lastUpdated: now
      };
      
      updatedReports = reports.map(report => 
        report.id === selectedReport.id ? updatedReport : report
      );
    } else {
      // Create new report
      const newReport = {
        id: Date.now(),
        ...reportData,
        submissionDate: now,
        lastUpdated: now,
        status: finalize ? "Pending" : "Draft",
        companyName: completedInternships[0].companyName,
        comments: []
      };
      
      updatedReports = [...reports, newReport];
    }
    
    // Save to localStorage
    localStorage.setItem("userReports", JSON.stringify(updatedReports));
    
    // Update state
    setReports(updatedReports);
    setIsEditingReport(false);
    setSelectedReport(null);
    
    // Close the dialog after saving
    setReportDialogOpen(false);
    
    if (finalize) {
      alert(selectedReport ? "Report updated and submitted for review!" : "Report created and submitted for review!");
    } else {
      alert(selectedReport ? "Report saved as draft!" : "Report created and saved!");
    }
  };
  
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsEditingReport(false); // Ensure view-only mode
    setReportDialogOpen(true);
  };
  
  const handleDeleteReport = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter(report => report.id !== reportId);
      localStorage.setItem("userReports", JSON.stringify(updatedReports));
      setReports(updatedReports);
    }
  };
  
  const handleDownloadPDF = (report) => {
    // In a real app, this would generate and download a PDF
    alert("Downloading report as PDF...");
    // You would use a library like jsPDF or make an API call to generate the PDF
  };
  
  const handleAppealReport = () => {
    const updatedReport = {
      ...selectedReport,
      status: "Under Appeal",
      appeal: appealMessage
    };
    
    const updatedReports = reports.map(report => 
      report.id === selectedReport.id ? updatedReport : report
    );
    
    localStorage.setItem("userReports", JSON.stringify(updatedReports));
    setReports(updatedReports);
    setAppealDialogOpen(false);
    setAppealMessage('');
    setReportDialogOpen(false);
    alert("Your appeal has been submitted. The report is now under review.");
  };
  
  const openAppealDialog = () => {
    setAppealDialogOpen(true);
  };
  
  // Render functions
  const renderCompanyEvaluationTab = () => {
    if (isLoading) {
      return <Typography>Loading...</Typography>;
    }

    if (!completedInternships || completedInternships.length === 0) {
      return (
        <Typography variant="body1" color="error">
          No completed internships found.
        </Typography>
      );
    }

    if (!selectedCompany && !isEditing) {
      return (
        <div className={styles.internshipList}>
          <Typography variant="h6" gutterBottom>
            Your Completed Internships
          </Typography>
          <Typography variant="body2" gutterBottom className={styles.instructions}>
            Select a company to provide your evaluation. Remember, you can evaluate a company only once.
          </Typography>
          
          {completedInternships.map((internship) => (
            <Paper key={internship.id} elevation={2} className={styles.internshipCard} sx={{ mb: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {internship.logo && (
                    <img
                      src={internship.logo}
                      alt={`${internship.companyName} logo`}
                      style={{ height: 32, width: 'auto', marginRight: 12 }}
                    />
                  )}
                  <Box>
                    <Typography variant="h6">{internship.companyName}</Typography>
                    <Typography><strong>Position:</strong> {internship.position}</Typography>
                    <Typography><strong>Duration:</strong> {internship.duration}</Typography>
                    <Typography><strong>Completed on:</strong> {internship.completedOn}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {isCompanyEvaluated(internship.id) ? (
                    <Box>
                      <Chip 
                        label="Evaluated" 
                        color="success" 
                        icon={<ThumbUpIcon />} 
                        sx={{ mb: 1, width: '100%' }} 
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteEvaluation(internship.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditEvaluation(internship)}
                        >
                          Update
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectCompany(internship)}
                    >
                      Evaluate
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      ); 
    } else if (selectedCompany && !isEditing) {
      const evaluation = getCompanyEvaluation(selectedCompany.id);

      if (!evaluation) {
        return (
          <Typography variant="body1" color="error">
            Unable to load evaluation details. Please try again.
          </Typography>
        );
      }

      return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Evaluation for {evaluation.companyName}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Rating:</Typography>
            <Rating value={parseInt(evaluation.rating)} readOnly />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Feedback:</Typography>
            <Typography variant="body1" paragraph>{evaluation.feedback}</Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">
              Recommend to other students: {evaluation.recommend === "yes" ? "Yes" : "No"}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<ReplyIcon />}
              onClick={() => setSelectedCompany(null)}
            >
              Back
            </Button>
          </Box>
        </Paper>
      );
    } else {
      const isEditingExisting = userEvaluations.some(evaluation => evaluation.companyId === selectedCompany?.id);

      return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {isEditingExisting ? "Update Evaluation" : "New Company Evaluation"}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography id="rating-label" gutterBottom>
                  Rating (1-5)
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
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Your Feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Do you recommend this company to other students?
                </Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.recommend === "no"}
                        onChange={() => setFormData({...formData, recommend: "no"})}
                      />
                    }
                    label="No"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.recommend === "yes"}
                        onChange={() => setFormData({...formData, recommend: "yes"})}
                      />
                    }
                    label="Yes"
                  />
                </FormGroup>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
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
    if (isLoading) {
      return <Typography>Loading...</Typography>;
    }

    if (!reports || reports.length === 0) {
      return (
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            You have not created any reports yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateReport}
          >
            Create Your First Report
          </Button>
        </Paper>
      );
    }

    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Your Reports
        </Typography>
        <Typography variant="body2" gutterBottom className={styles.instructions}>
          Here you can view, create, and manage your internship reports. Reports are visible to faculty for evaluation.
        </Typography>

        {reports.map((report) => (
          <Paper key={report.id} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="h6">{report.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {report.introduction}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Courses:</strong> {report.selectedCourses.length > 0 ? 
                    report.selectedCourses.map((courseId) => {
                      const course = availableCourses.find((c) => c.id === courseId);
                      return course ? course.code : courseId;
                    }).join(', ') : "All courses"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Major:</strong> {
                    availableMajors.find((m) => m.id === report.selectedMajor)?.name || "All Majors"
                  }
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
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewReport(report)}
                >
                  View
                </Button>
              </Grid>
            </Grid>
            <IconButton
              color="primary"
              sx={{ position: 'absolute', bottom: 8, right: 8 }}
              onClick={() => handleEditReport(report)}
            >
              <EditIcon />
            </IconButton>
          </Paper>
        ))}
      </div>
    );
  };
  
  // Create new function to render the evaluations summary tab
  const renderEvaluationsSummaryTab = () => {
    if (isLoading) {
      return <Typography>Loading...</Typography>;
    }

    if (!userEvaluations || userEvaluations.length === 0) {
      return (
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            You have not submitted any evaluations yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setTabValue(0)}
          >
            Go to Evaluations
          </Button>
        </Paper>
      );
    }

    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Your Evaluations Summary
        </Typography>
        <Typography variant="body2" gutterBottom className={styles.instructions}>
          Here is a summary of all your internship evaluations.
        </Typography>
        
        {userEvaluations.map((evaluation) => {
          const company = completedInternships.find((c) => c.id === evaluation.companyId);
          if (!company) {
            return null; // Skip if company data is missing
          }

          return (
            <Paper key={evaluation.id} elevation={2} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt={`${company.companyName} logo`}
                      style={{ height: 32, width: 'auto', marginRight: 12 }}
                    />
                  )}
                  <Box>
                    <Typography variant="subtitle1">{evaluation.companyName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>Rating:</Typography>
                      <Rating value={parseInt(evaluation.rating)} readOnly size="small" />
                    </Box>
                    <Typography variant="body2">
                      Recommend: {evaluation.recommend === "yes" ? "Yes" : "No"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      if (evaluation && evaluation.companyId) {
                        handleDeleteEvaluation(evaluation.companyId);
                      } else {
                        alert("Unable to delete. Evaluation details are missing.");
                      }
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                  size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => {
                      if (evaluation && evaluation.companyId) {
                        setSelectedCompany(completedInternships.find(c => c.id === evaluation.companyId));
                        setTabValue(0); // Switch to Company Evaluations tab for viewing
                      } else {
                        alert("Unable to view. Evaluation details are missing.");
                      }
                    }}
                  >
                  View
                </Button>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </div>
    );
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Evaluations & Reports
        </Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Company Evaluations" />
          <Tab label="Internship Reports" />
          <Tab label="Evaluations Summary" />
        </Tabs>
        {tabValue === 0 && renderCompanyEvaluationTab()}
        {tabValue === 1 && renderReportsTab()}
        {tabValue === 2 && renderEvaluationsSummaryTab()}
      </Paper>
      {/* Dialog for creating/editing reports - always present, not duplicated */}
      <Dialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditingReport ? (selectedReport ? "Edit Report" : "Create New Report") : "View Report"}
        </DialogTitle>
        <DialogContent>
          {isEditingReport ? (
            <>
              <DialogContentText>
                {selectedReport ? "Update the details of your report." : "Fill out the form below to create a new report."}
              </DialogContentText>
              <TextField
                label="Report Title"
                name="title"
                value={reportData.title}
                onChange={handleReportInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Introduction"
                name="introduction"
                value={reportData.introduction}
                onChange={handleReportInputChange}
                fullWidth
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Detailed Description"
                name="body"
                value={reportData.body}
                onChange={handleReportInputChange}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle1" gutterBottom>
                Select Courses
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {availableCourses.map((course) => (
                  <Grid item xs={6} sm={4} md={3} key={course.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={reportData.selectedCourses.includes(course.id)}
                          onChange={() => handleCourseSelection(course.id)}
                        />
                      }
                      label={course.name}
                    />
                  </Grid>
                ))}
              </Grid>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="major-select-label">Select Major</InputLabel>
                <Select
                  labelId="major-select-label"
                  id="major-select"
                  value={reportData.selectedMajor}
                  onChange={handleMajorChange}
                  label="Select Major"
                >
                  <MenuItem value="all">All Majors</MenuItem>
                  {availableMajors.map((major) => (
                    <MenuItem key={major.id} value={major.id}>
                      {major.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedReport?.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Introduction
              </Typography>
              <Typography paragraph>
                {selectedReport?.introduction}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Detailed Description
              </Typography>
              <Typography paragraph>
                {selectedReport?.body}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Courses
              </Typography>
              <Typography paragraph>
                {selectedReport?.selectedCourses?.map((courseId) => {
                  const course = availableCourses.find((c) => c.id === courseId);
                  return course ? course.code : courseId;
                }).join(', ') || "All courses"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Major
              </Typography>
              <Typography paragraph>
                {availableMajors.find((m) => m.id === selectedReport?.selectedMajor)?.name || "All Majors"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Submission Date
              </Typography>
              <Typography paragraph>
                {selectedReport?.submissionDate}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)} color="primary">
            Close
          </Button>
          {isEditingReport && (
            <Button
              onClick={() => handleSaveReport(false)}
              color="primary"
              variant="contained"
            >
              {selectedReport ? "Update Report" : "Save Report"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default StudentsEvaluations;