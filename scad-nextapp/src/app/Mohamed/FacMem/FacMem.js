import React, { useState } from "react";
import styles from "./FacMem.module.css";
import jsPDF from "jspdf";
import {
  Container,
  Typography,
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Alert,
  Tabs,
  Tab,
  TextField
} from "@mui/material";

// Dummy data
const mockMajors = [
  { id: "csen", name: "Computer Science & Engineering" },
  { id: "dmet", name: "Digital Media Engineering" },
  { id: "comm", name: "Communications & Networks" },
  { id: "mct", name: "Management & Technology" }
];

const mockReports = [
  // Accepted (5)
  {
    id: 1,
    studentName: "Ahmed Hassan",
    studentId: "20P1234",
    major: "csen",
    company: "Google",
    supervisor: "John Doe",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    title: "Software Engineering Internship at Google",
    status: "accepted",
    introduction: "Worked on Google Cloud Platform...",
    body: "Detailed work on cloud APIs, automation, and team projects.",
    comments: [
      { id: 1, author: "Dr. Sarah", date: "2025-05-01", text: "Great technical depth." }
    ]
  },
  {
    id: 2,
    studentName: "Omar Ibrahim",
    studentId: "20P9999",
    major: "csen",
    company: "IBM",
    supervisor: "Michael Brown",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    title: "Backend Internship at IBM",
    status: "accepted",
    introduction: "API development and database optimization...",
    body: "Implemented RESTful APIs, optimized SQL queries, and improved backend reliability.",
    comments: [
      { id: 2, author: "Dr. Ahmed", date: "2025-05-10", text: "Excellent technical report." }
    ]
  },
  {
    id: 3,
    studentName: "Fatma Adel",
    studentId: "20P8888",
    major: "dmet",
    company: "Microsoft",
    supervisor: "Jane Smith",
    startDate: "2025-02-01",
    endDate: "2025-05-01",
    title: "UI/UX Internship at Microsoft",
    status: "accepted",
    introduction: "Worked on Microsoft Teams UI/UX...",
    body: "Improved accessibility and design systems.",
    comments: []
  },
  {
    id: 4,
    studentName: "Youssef Khaled",
    studentId: "20P7777",
    major: "comm",
    company: "Google",
    supervisor: "Sam Wilson",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    title: "Network Engineering Internship at Google",
    status: "accepted",
    introduction: "Worked on Google Fiber project...",
    body: "Configured routers and optimized network performance.",
    comments: []
  },
  {
    id: 5,
    studentName: "Laila Mostafa",
    studentId: "20P6666",
    major: "mct",
    company: "Microsoft",
    supervisor: "Emily Clark",
    startDate: "2025-03-10",
    endDate: "2025-06-10",
    title: "Management Internship at Microsoft",
    status: "accepted",
    introduction: "Worked on project management tools...",
    body: "Assisted in planning and executing software projects.",
    comments: []
  },

  // Rejected (2)
  {
    id: 6,
    studentName: "Karim Nabil",
    studentId: "20P5555",
    major: "csen",
    company: "IBM",
    supervisor: "Michael Brown",
    startDate: "2025-02-01",
    endDate: "2025-05-01",
    title: "Cloud Computing Internship at IBM",
    status: "rejected",
    introduction: "Worked on IBM Cloud...",
    body: "Faced challenges in project completion.",
    comments: [
      { id: 3, author: "Dr. Sarah", date: "2025-05-15", text: "Report lacks detail." }
    ]
  },
  {
    id: 7,
    studentName: "Mona Fathy",
    studentId: "20P4444",
    major: "dmet",
    company: "Google",
    supervisor: "John Doe",
    startDate: "2025-01-20",
    endDate: "2025-04-20",
    title: "Digital Media Internship at Google",
    status: "rejected",
    introduction: "Worked on Google Ads media...",
    body: "Did not meet the required objectives.",
    comments: []
  },

  // Flagged (2)
  {
    id: 8,
    studentName: "Sara Mohamed",
    studentId: "20P5678",
    major: "dmet",
    company: "Microsoft",
    supervisor: "Jane Smith",
    startDate: "2025-02-01",
    endDate: "2025-05-01",
    title: "Frontend Internship at Microsoft",
    status: "flagged",
    introduction: "UI/UX improvements for Microsoft Teams...",
    body: "Worked on React components, accessibility, and design systems.",
    comments: []
  },
  {
    id: 9,
    studentName: "Mahmoud Tarek",
    studentId: "20P3333",
    major: "comm",
    company: "IBM",
    supervisor: "Michael Brown",
    startDate: "2025-03-05",
    endDate: "2025-06-05",
    title: "Network Security Internship at IBM",
    status: "flagged",
    introduction: "Worked on IBM network security...",
    body: "Assisted in penetration testing and security audits.",
    comments: []
  },

  // Pending (3)
  {
    id: 10,
    studentName: "Nour El-Din",
    studentId: "20P2222",
    major: "csen",
    company: "Google",
    supervisor: "Sam Wilson",
    startDate: "2025-04-01",
    endDate: "2025-07-01",
    title: "Software Testing Internship at Google",
    status: "pending",
    introduction: "Worked on software QA...",
    body: "Tested new features and reported bugs.",
    comments: []
  },
  {
    id: 11,
    studentName: "Hana Ahmed",
    studentId: "20P1111",
    major: "mct",
    company: "Microsoft",
    supervisor: "Emily Clark",
    startDate: "2025-03-20",
    endDate: "2025-06-20",
    title: "Business Analysis Internship at Microsoft",
    status: "pending",
    introduction: "Worked on business process analysis...",
    body: "Analyzed workflows and suggested improvements.",
    comments: []
  },
  {
    id: 12,
    studentName: "Ali Samir",
    studentId: "20P0001",
    major: "comm",
    company: "IBM",
    supervisor: "Michael Brown",
    startDate: "2025-04-10",
    endDate: "2025-07-10",
    title: "Communications Internship at IBM",
    status: "pending",
    introduction: "Worked on internal communications...",
    body: "Helped improve company-wide communication channels.",
    comments: []
  }
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "flagged", label: "Flagged" },
  { value: "rejected", label: "Rejected" },
  { value: "accepted", label: "Accepted" }
];

// Dummy statistics (matching the above data)
function getStats(reports) {
  const accepted = reports.filter(r => r.status === "accepted").length;
  const rejected = reports.filter(r => r.status === "rejected").length;
  const flagged = reports.filter(r => r.status === "flagged").length;
  const pending = reports.filter(r => r.status === "pending").length;
  // Example: these can be improved to be dynamic if you want
  const topCourses = ["CSEN 701", "DMET 402", "CSEN 303"];
  const topCompanies = ["Google", "Microsoft", "IBM"];
  const companyCounts = {};
  reports.forEach(r => {
    companyCounts[r.company] = (companyCounts[r.company] || 0) + 1;
  });
  const topCompaniesByCount = Object.entries(companyCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
  // Dummy average review time
  const avgReviewTime = "3.2 days";
  return { accepted, rejected, flagged, pending, avgReviewTime, topCourses, topCompanies, topCompaniesByCount };
}

export default function FacMem() {
  // Tabs
  const [tab, setTab] = useState(0);

  // Reports state
  const [majorFilter, setMajorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clarification, setClarification] = useState("");
  const [reports, setReports] = useState(mockReports);

  // Filtering logic
  const filteredReports = reports.filter(r =>
    (majorFilter === "all" || r.major === majorFilter) &&
    (statusFilter === "all" || r.status === statusFilter)
  );

  // Status update handler
  const handleStatusChange = (reportId, newStatus) => {
    setReports(prev => prev.map(r =>
      r.id === reportId ? { ...r, status: newStatus } : r
    ));
    setSelectedReport(prev => prev ? { ...prev, status: newStatus } : prev);
  };

  // Clarification submit
  const handleClarificationSubmit = () => {
    if (!clarification.trim()) return;
    setReports(prev =>
      prev.map(r =>
        r.id === selectedReport.id
          ? {
              ...r,
              comments: [
                ...r.comments,
                {
                  id: Date.now(),
                  author: "Faculty Member",
                  date: new Date().toISOString().split("T")[0],
                  text: clarification
                }
              ]
            }
          : r
      )
    );
    setSelectedReport(prev =>
      prev
        ? {
            ...prev,
            comments: [
              ...prev.comments,
              {
                id: Date.now(),
                author: "Faculty Member",
                date: new Date().toISOString().split("T")[0],
                text: clarification
              }
            ]
          }
        : prev
    );
    setClarification("");
  };

  // Generate report (dummy)
  const handleGenerateReport = () => {
    alert("Report generated based on real-time statistics (dummy action).");
  };

  // Download PDF of statistics
  const handleDownloadPDF = (stats) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Real-Time Internship Statistics", 10, 15);
    doc.setFontSize(12);
    doc.text(`Accepted: ${stats.accepted}`, 10, 30);
    doc.text(`Rejected: ${stats.rejected}`, 10, 40);
    doc.text(`Flagged: ${stats.flagged}`, 10, 50);
    doc.text(`Pending: ${stats.pending}`, 10, 60);
    doc.text(`Avg. Review Time: ${stats.avgReviewTime}`, 10, 70);
    doc.text("Most Frequently Used Courses:", 10, 85);
    stats.topCourses.forEach((course, i) => {
      doc.text(`- ${course}`, 15, 95 + i * 8);
    });
    let y = 95 + stats.topCourses.length * 8 + 10;
    doc.text("Top Rated Companies:", 10, y);
    stats.topCompanies.forEach((company, i) => {
      doc.text(`- ${company}`, 15, y + 10 + i * 8);
    });
    y = y + 10 + stats.topCompanies.length * 8 + 10;
    doc.text("Top Companies by Internship Count:", 10, y);
    stats.topCompaniesByCount.forEach((c, i) => {
      doc.text(`- ${c.name}: ${c.count}`, 15, y + 10 + i * 8);
    });
    doc.save("internship-statistics.pdf");
  };

  const stats = getStats(reports);

  return (
    <Container maxWidth="md" className={styles.container}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Internship Reports" />
        <Tab label="Real-Time Statistics" />
      </Tabs>

      {/* TAB 1: INTERNSHIP REPORTS */}
      {tab === 0 && (
        <Paper className={styles.filterPaper}>
          <Box className={styles.filterBox}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Filter by Major</InputLabel>
              <Select
                value={majorFilter}
                label="Filter by Major"
                onChange={e => setMajorFilter(e.target.value)}
              >
                <MenuItem value="all">All Majors</MenuItem>
                {mockMajors.map(m => (
                  <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={statusFilter}
                label="Filter by Status"
                onChange={e => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                {statusOptions.map(s => (
                  <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {filteredReports.length === 0 ? (
            <Alert severity="info">No reports match the selected filters.</Alert>
          ) : (
            <List>
              {filteredReports.map(report => (
                <React.Fragment key={report.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => { setSelectedReport(report); setDialogOpen(true); }}
                      className={styles.listItem}
                    >
                      <ListItemText
                        primary={report.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">{report.studentName}</Typography>
                            {" | "}
                            <Chip
                              label={statusOptions.find(s => s.value === report.status)?.label || report.status}
                              color={
                                report.status === "accepted"
                                  ? "success"
                                  : report.status === "flagged"
                                    ? undefined
                                    : report.status === "rejected"
                                      ? "error"
                                      : "default"
                              }
                              size="small"
                              sx={{ ml: 1, ...(report.status === "flagged" && { backgroundColor: '#9c27b0', color: '#fff' }) }}
                            />
                          </>
                        }
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={e => { e.stopPropagation(); setSelectedReport(report); setDialogOpen(true); }}
                        sx={{ ml: 2 }}
                      >
                        View
                      </Button>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      )}

      {/* TAB 2: STATISTICS */}
      {tab === 1 && (
        <Paper className={styles.statsPaper}>
          <Typography variant="h5" gutterBottom>Real-Time Statistics</Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
            <Paper className={styles.statCard}><b>Accepted:</b> {stats.accepted}</Paper>
            <Paper className={styles.statCard}><b>Rejected:</b> {stats.rejected}</Paper>
            <Paper className={styles.statCard}><b>Flagged:</b> {stats.flagged}</Paper>
            <Paper className={styles.statCard}><b>Pending:</b> {stats.pending}</Paper>
            <Paper className={styles.statCard}><b>Avg. Review Time:</b> {stats.avgReviewTime}</Paper>
          </Box>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Most Frequently Used Courses:</Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {stats.topCourses.map(course => (
              <Chip key={course} label={course} />
            ))}
          </Box>
          <Typography variant="subtitle1">Top Rated Companies:</Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {stats.topCompanies.map(company => (
              <Chip key={company} label={company} />
            ))}
          </Box>
          <Typography variant="subtitle1">Top Companies by Internship Count:</Typography>
          <List>
            {stats.topCompaniesByCount.map(c => (
              <ListItem key={c.name}>
                <ListItemText primary={c.name} secondary={`Internships: ${c.count}`} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
            >
              Generate Report
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDownloadPDF(stats)}
            >
              Download PDF
            </Button>
          </Box>
        </Paper>
      )}

      {/* REPORT DETAILS DIALOG */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        {selectedReport && (
          <>
            <DialogTitle>{selectedReport.title}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1" gutterBottom>
                Student: {selectedReport.studentName} ({selectedReport.studentId})
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Major: {mockMajors.find(m => m.id === selectedReport.major)?.name || selectedReport.major}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Company: {selectedReport.company}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Main Supervisor: {selectedReport.supervisor}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Internship Dates: {selectedReport.startDate} &rarr; {selectedReport.endDate}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Status: <Chip label={statusOptions.find(s => s.value === selectedReport.status)?.label} size="small"
                  sx={selectedReport.status === "flagged" ? { backgroundColor: '#9c27b0', color: '#fff' } : {}}
                />
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Introduction</Typography>
              <Typography paragraph>{selectedReport.introduction}</Typography>
              <Typography variant="h6">Report Details</Typography>
              <Typography paragraph>{selectedReport.body}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">Comments</Typography>
              {selectedReport.comments.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No comments yet.</Typography>
              ) : (
                <List>
                  {selectedReport.comments.map(c => (
                    <ListItem key={c.id}>
                      <ListItemText
                        primary={c.text}
                        secondary={`${c.author} - ${c.date}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {/* Clarification form for flagged/rejected */}
              {(selectedReport.status === "flagged" || selectedReport.status === "rejected") && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Submit Clarification (why this report was flagged or rejected):
                  </Typography>
                  <TextField
                    value={clarification}
                    onChange={e => setClarification(e.target.value)}
                    placeholder="Enter your clarification/comment"
                    fullWidth
                    multiline
                    minRows={2}
                    sx={{ mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClarificationSubmit}
                    disabled={!clarification.trim()}
                  >
                    Submit Clarification
                  </Button>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              {statusOptions.filter(s => s.value !== selectedReport.status).map(s => (
                <Button
                  key={s.value}
                  onClick={() => handleStatusChange(selectedReport.id, s.value)}
                  color={
                    s.value === "accepted"
                      ? "success"
                      : s.value === "flagged"
                        ? "secondary"
                        : s.value === "rejected"
                          ? "error"
                          : "primary"
                  }
                  variant="outlined"
                >
                  Set as {s.label}
                </Button>
              ))}
              <Button onClick={() => setDialogOpen(false)} color="primary">Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}