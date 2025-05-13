import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';

export default function CoursesInMajor() {
  // State to track the selected major
  const [selectedMajor, setSelectedMajor] = useState("all");
  const [studentMajor, setStudentMajor] = useState("csen"); // Default to CSEN

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
      { id: 1, code: "CSEN 401", name: "Computer Programming Lab", credits: 2, description: "This lab course introduces students to practical aspects of computer programming using C/C++." },
      { id: 2, code: "CSEN 402", name: "Computer Programming", credits: 3, description: "An introduction to computer programming concepts, algorithm design, and problem solving using C/C++." },
      { id: 3, code: "CSEN 403", name: "Digital Design", credits: 4, description: "Introduction to digital design concepts, Boolean algebra, logic gates, and circuit design." },
      { id: 4, code: "CSEN 501", name: "Database Systems", credits: 3, description: "Concepts and techniques for database design, implementation, and management." },
      { id: 5, code: "CSEN 601", name: "Software Engineering", credits: 4, description: "Principles and methodologies for development of large software systems." },
      { id: 7, code: "CSEN 602", name: "Computer Architecture", credits: 4, description: "Study of computer organization and architecture, memory systems, and pipelining." },
      { id: 8, code: "CSEN 603", name: "Algorithms and Data Structures", credits: 4, description: "Advanced data structures, algorithm design techniques, and complexity analysis." }
    ],
    dmet: [
      { id: 6, code: "DMET 501", name: "Introduction to Media Engineering", credits: 3, description: "Fundamentals of digital media processing and engineering." },
      { id: 9, code: "DMET 502", name: "Computer Graphics", credits: 4, description: "Principles and practice of computer graphics including 2D and 3D rendering." },
      { id: 10, code: "DMET 503", name: "Game Development", credits: 3, description: "Game design principles and development using modern game engines." },
      { id: 11, code: "DMET 601", name: "Interactive Media Design", credits: 4, description: "Design and implementation of interactive media applications." }
    ],
    comm: [
      { id: 12, code: "COMM 401", name: "Introduction to Computer Networks", credits: 3, description: "Fundamentals of computer networks, protocols, and network architecture." },
      { id: 13, code: "COMM 501", name: "Wireless Communications", credits: 4, description: "Principles of wireless communication systems, modulation, and wireless networks." },
      { id: 14, code: "COMM 502", name: "Network Security", credits: 3, description: "Security concepts, cryptography, and security protocols for computer networks." }
    ],
    mct: [
      { id: 15, code: "MCT 301", name: "Project Management", credits: 3, description: "Principles and practices of project management in technology settings." },
      { id: 16, code: "MCT 401", name: "Technology Entrepreneurship", credits: 3, description: "Entrepreneurship concepts and practices specific to technology ventures." },
      { id: 17, code: "MCT 501", name: "Innovation Management", credits: 4, description: "Management of innovation processes and technology-driven organizational change." }
    ]
  };

  // Helper function to get all courses (flattened)
  const getAllCourses = () => {
    return Object.values(coursesByMajor).flat();
  };

  // Handler for major selection change
  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  // Handler for when the student wants to change their major view
  const handleStudentMajorChange = (majorId) => {
    setStudentMajor(majorId);
    setSelectedMajor(majorId); // Also update the selected major filter
  };

  // Get the courses to display based on the selected major
  const displayCourses = selectedMajor === "all" 
    ? getAllCourses() 
    : coursesByMajor[selectedMajor] || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Courses By Major</Typography>
        <Button variant="outlined" href="/">Back to Dashboard</Button>
      </Box>

      <Paper elevation={3} sx={{ mb: 4, p: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              Your Major: {availableMajors.find(m => m.id === studentMajor)?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Below you can view all courses available for your major or explore courses in other majors.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            {availableMajors.map((major) => (
              <Chip 
                key={major.id}
                label={major.name}
                icon={<SchoolIcon />}
                onClick={() => handleStudentMajorChange(major.id)}
                color={major.id === studentMajor ? "primary" : "default"}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <TextField
          select
          label="Filter Courses by Major"
          value={selectedMajor}
          onChange={handleMajorChange}
          variant="outlined"
          fullWidth
          SelectProps={{
            native: true,
          }}
        >
          <option value="all">All Majors</option>
          {availableMajors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </TextField>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          {selectedMajor === "all" ? "All Available Courses" : `${availableMajors.find(m => m.id === selectedMajor)?.name} Courses`}
        </Typography>

        <List>
          {displayCourses.map((course) => (
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
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {course.description}
                        </Typography>
                        <Box sx={{ display: 'flex', mt: 1 }}>
                          <Chip 
                            size="small" 
                            label={`${course.credits} Credits`} 
                            color="info"
                          />
                          <Chip 
                            size="small" 
                            label={availableMajors.find(m => coursesByMajor[m.id].some(c => c.id === course.id))?.name} 
                            sx={{ ml: 1 }} 
                          />
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}