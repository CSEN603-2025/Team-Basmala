import React, { useState, useEffect } from "react";
import styles from "./EvaluationsStudent.module.css";
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
  DialogTitle
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

export default function StudentEvaluations() {
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
      companyName: "Tech Innovations Inc.",
      position: "Software Engineering Intern",
      duration: "3 months",
      completedOn: "March 15, 2025",
      evaluated: false
    },
    {
      id: 2,
      companyName: "DataSoft Solutions",
      position: "Frontend Developer Intern",
      duration: "6 months",
      completedOn: "April 30, 2025",
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
      title: "Software Engineering Internship at Tech Innovations",
      introduction: "During Summer 2025, I had the opportunity to work at Tech Innovations Inc...",
      body: "Throughout my internship, I gained hands-on experience with React, Node.js, and AWS...",
      submissionDate: "April 2, 2025",
      status: "Flagged",
      companyName: "Tech Innovations Inc.",
      selectedCourses: [1, 4, 5],
      comments: [
        {
          id: 1,
          author: "Dr. Ahmed Hassan",
          date: "April 5, 2025",
          text: "Your report lacks specific technical details. Please elaborate on the technologies you worked with and how they relate to your coursework.",
          type: "faculty"
        }
      ]
    }
  ];
  
  // Load saved data on component mount
  useEffect(() => {
    // In a real application, you would fetch from your API
    const savedEvaluations = localStorage.getItem("userEvaluations")
      ? JSON.parse(localStorage.getItem("userEvaluations"))
      : [];
      
    const savedReports = localStorage.getItem("userReports")
      ? JSON.parse(localStorage.getItem("userReports"))
      : userReports;

    setUserEvaluations(savedEvaluations);
    setReports(savedReports);
    
    // Display alert for flagged reports on component mount
    const hasFlaggedReports = savedReports.some(report => report.status === "Flagged" || report.status === "Rejected");
    if (hasFlaggedReports) {
      // In a real app, you might use a toast notification here
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
    setReportData({
      title: "",
      introduction: "",
      body: "",
      selectedCourses: [],
      selectedMajor: "all" // Default to showing all courses
    });
    setIsEditingReport(true);
    setSelectedReport(null);
  };
  
  const handleEditReport = (report) => {
    setReportData({
      title: report.title,
      introduction: report.introduction,
      body: report.body,
      selectedCourses: report.selectedCourses || [],
      selectedMajor: report.selectedMajor || "all" // Ensure selectedMajor is set
    });
    setSelectedReport(report);
    setIsEditingReport(true);
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
    
    if (finalize) {
      alert(selectedReport ? "Report updated and submitted for review!" : "Report created and submitted for review!");
    } else {
      alert(selectedReport ? "Report saved as draft!" : "Report created as draft!");
    }
  };
  
  const handleViewReport = (report) => {
    setSelectedReport(report);
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
    if (!selectedCompany && !isEditing) {
      return (
        <div className={styles.internshipList}>
          <Typography variant="h6" gutterBottom>
            Your Completed Internships
          </Typography>
          <Typography variant="body2" gutterBottom className={styles.instructions}>
            Select a company to provide your evaluation. Remember, you can evaluate a company only once.
          </Typography>
          
          {completedInternships.map(internship => (
            <Paper key={internship.id} elevation={2} className={styles.internshipCard} sx={{ mb: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography variant="h6">{internship.companyName}</Typography>
                  <Typography><strong>Position:</strong> {internship.position}</Typography>
                  <Typography><strong>Duration:</strong> {internship.duration}</Typography>
                  <Typography><strong>Completed on:</strong> {internship.completedOn}</Typography>
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
                          startIcon={<EditIcon />}
                          onClick={() => handleEditEvaluation(internship)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteEvaluation(internship.id)}
                        >
                          Delete
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
          
          {userEvaluations.length > 0 && (
            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Your Evaluations Summary
              </Typography>
              {userEvaluations.map(evaluation => (
                <Paper key={evaluation.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1">{evaluation.companyName}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>Rating:</Typography>
                        <Rating value={parseInt(evaluation.rating)} readOnly size="small" />
                      </Box>
                      <Typography variant="body2">
                        Recommend: {evaluation.recommend === "yes" ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => {
                          const company = completedInternships.find(c => c.id === evaluation.companyId);
                          if (company) {
                            handleEditEvaluation(company);
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}
        </div>
      ); 
    } else if (selectedCompany && !isEditing) {
      const evaluation = getCompanyEvaluation(selectedCompany.id);
      
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<EditIcon />} 
              onClick={() => handleEditEvaluation(selectedCompany)}
            >
              Edit
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteEvaluation(selectedCompany.id)}
            >
              Delete
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setSelectedCompany(null)}
            >
              Back to List
            </Button>
          </Box>
        </Paper>
      );
    } else {
      // Editing form remains mostly the same
      const isEdittingExisting = userEvaluations.some(evaluation => evaluation.companyId === selectedCompany?.id);
      
      return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {isEdittingExisting ? "Update Evaluation" : "New Company Evaluation"}
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
                        checked={formData.recommend === "yes"}
                        onChange={() => setFormData({...formData, recommend: "yes"})}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.recommend === "no"}
                        onChange={() => setFormData({...formData, recommend: "no"})}
                      />
                    }
                    label="No"
                  />
                </FormGroup>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    {isEdittingExisting ? "Update Evaluation" : "Submit Evaluation"}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancelEvaluation}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
          
          <Typography variant="caption" sx={{ display: 'block', mt: 3 }}>
            Note: You can only submit one evaluation per company. You may edit or delete it later.
          </Typography>
        </Paper>
      );
    }
  };
  
  const renderReportTab = () => {
    if (isEditingReport) {
      return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedReport ? "Edit Internship Report" : "Create Internship Report"}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Report Title"
                name="title"
                value={reportData.title}
                onChange={handleReportInputChange}
                fullWidth
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Introduction"
                name="introduction"
                value={reportData.introduction}
                onChange={handleReportInputChange}
                multiline
                rows={3}
                fullWidth
                required
                helperText="Provide a brief introduction about your internship experience"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Report Body"
                name="body"
                value={reportData.body}
                onChange={handleReportInputChange}
                multiline
                rows={6}
                fullWidth
                required
                helperText="Describe your tasks, learnings, challenges, and achievements during the internship"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select courses that helped you during this internship:
              </Typography>
              <Box sx={{ mb: 3 }}>
                <TextField
                  select
                  label="Filter by Major"
                  name="selectedMajor"
                  value={reportData.selectedMajor}
                  onChange={handleMajorChange}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                  sx={{ mb: 3 }}
                >
                  <option value="all">All Majors</option>
                  {availableMajors.map(major => (
                    <option key={major.id} value={major.id}>
                      {major.name}
                    </option>
                  ))}
                </TextField>
              </Box>
              <FormGroup>
                <Grid container spacing={2}>
                  {(reportData.selectedMajor === "all" ? availableCourses : coursesByMajor[reportData.selectedMajor] || []).map(course => (
                    <Grid item xs={6} key={course.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={reportData.selectedCourses.includes(course.id)}
                            onChange={() => handleCourseSelection(course.id)}
                          />
                        }
                        label={`${course.code} - ${course.name}`}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSaveReport(false)}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SendIcon />}
                  onClick={() => handleSaveReport(true)}
                >
                  Finalize and Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsEditingReport(false);
                    setSelectedReport(null);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      );
    } else {
      return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, mt: 2 }}>
            <Typography variant="h6">Your Internship Reports</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateReport}
            >
              Create New Report
            </Button>
          </Box>
          
          {reports.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              You haven't created any reports yet. Click "Create New Report" to get started.
            </Alert>
          ) : (
            reports.map(report => (
              <Paper 
                key={report.id} 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  mb: 2,
                  borderLeft: report.status === "Flagged" 
                    ? '5px solid #ff9800' 
                    : report.status === "Rejected" 
                      ? '5px solid #f44336' 
                      : report.status === "Accepted" 
                        ? '5px solid #4caf50'
                        : report.status === "Under Appeal"
                          ? '5px solid #9c27b0'
                          : report.status === "Pending"
                            ? '5px solid #2196f3'
                            : '5px solid #9e9e9e'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="h6">{report.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Company: {report.companyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submitted: {report.submissionDate}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip 
                        label={report.status} 
                        color={
                          report.status === "Flagged" 
                            ? "warning" 
                            : report.status === "Rejected" 
                              ? "error" 
                              : report.status === "Accepted" 
                                ? "success"
                                : report.status === "Under Appeal"
                                  ? "secondary"
                                  : report.status === "Pending"
                                    ? "info"
                                    : "default"
                        }
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {report.comments.length > 0 && (
                        <Chip 
                          label={`${report.comments.length} comment${report.comments.length > 1 ? 's' : ''}`}
                          size="small"
                        />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewReport(report)}
                      >
                        View
                      </Button>
                      {(report.status === "Draft" || report.status === "Pending") && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditReport(report)}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </Box>
      );
    }
  };
  
  // Report dialog
  const renderReportDialog = () => {
    if (!selectedReport) return null;
    
    return (
      <Dialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedReport.title}
          <Typography variant="subtitle2" color="text.secondary">
            Status: {selectedReport.status}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>Introduction</Typography>
          <Typography paragraph>{selectedReport.introduction}</Typography>
          
          <Typography variant="h6" gutterBottom>Report</Typography>
          <Typography paragraph>{selectedReport.body}</Typography>
          
          <Typography variant="h6" gutterBottom>Relevant Courses</Typography>
          <Box sx={{ mb: 3 }}>
            {selectedReport.selectedMajor && selectedReport.selectedMajor !== "all" && (
              <Box sx={{ mb: 2 }}>
                <Chip 
                  color="primary"
                  label={`Major: ${availableMajors.find(m => m.id === selectedReport.selectedMajor)?.name || 'Not specified'}`}
                  sx={{ mb: 1 }}
                />
              </Box>
            )}
            {selectedReport.selectedCourses.length > 0 ? (
              <Grid container spacing={1}>
                {selectedReport.selectedCourses.map(courseId => {
                  const course = availableCourses.find(c => c.id === courseId);
                  return course ? (
                    <Grid item key={course.id}>
                      <Chip 
                        icon={<MenuBookIcon />} 
                        label={`${course.code} - ${course.name}`} 
                      />
                    </Grid>
                  ) : null;
                })}
              </Grid>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No courses selected.
              </Typography>
            )}
          </Box>
          
          {selectedReport.comments.length > 0 && (
            <>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>Comments</Typography>
              <List>
                {selectedReport.comments.map(comment => (
                  <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2">
                          {comment.author} - {comment.date}
                        </Typography>
                      }
                      secondary={comment.text}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
          
          {(selectedReport.status === "Flagged" || selectedReport.status === "Rejected") && !selectedReport.appeal && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="warning">
                <Typography variant="subtitle2">
                  Your report has been {selectedReport.status.toLowerCase()}. You can appeal this decision.
                </Typography>
              </Alert>
            </Box>
          )}
          
          {selectedReport.appeal && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="info">
                <Typography variant="subtitle2">Your Appeal</Typography>
                <Typography variant="body2">{selectedReport.appeal}</Typography>
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadPDF(selectedReport)}
          >
            Download PDF
          </Button>
          
          {(selectedReport.status === "Flagged" || selectedReport.status === "Rejected") && !selectedReport.appeal && (
            <Button 
              color="warning" 
              startIcon={<ReplyIcon />}
              onClick={openAppealDialog}
            >
              Appeal Decision
            </Button>
          )}
          
          <Button onClick={() => setReportDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  // Appeal dialog
  const renderAppealDialog = () => {
    return (
      <Dialog
        open={appealDialogOpen}
        onClose={() => setAppealDialogOpen(false)}
      >
        <DialogTitle>Appeal Report Decision</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please provide a detailed explanation for why you believe this report should be reconsidered.
          </DialogContentText>
          <TextField
            autoFocus
            label="Appeal Reason"
            fullWidth
            multiline
            rows={4}
            value={appealMessage}
            onChange={(e) => setAppealMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAppealDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAppealReport} 
            color="primary"
            disabled={!appealMessage.trim()}
          >
            Submit Appeal
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const toggleShowCourses = () => {
    setShowCourses(prev => !prev);
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Student Internship Portal</Typography>
        <Button variant="outlined" href="/">Back to Home</Button>
      </Box>
      
      <Paper elevation={1} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="My Reports" />
          <Tab label="Company Evaluations" />
        </Tabs>
      </Paper>
      
      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {renderReportTab()}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        {renderCompanyEvaluationTab()}
      </TabPanel>
      
      {/* Dialogs */}
      {renderReportDialog()}
      {renderAppealDialog()}
      
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleShowCourses}
        >
          {showCourses ? "Hide Courses" : "View Courses"}
        </Button>
      </Box>

      {showCourses && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Available Courses
          </Typography>
          <List>
            {availableCourses.map((course) => (
              <React.Fragment key={course.id}>
                <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="subtitle1" component="span">
                            {course.code} - {course.name}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {course.description || "No description available."}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Paper>
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
}

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}