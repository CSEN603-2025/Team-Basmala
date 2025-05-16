"use client";

import React, { useState } from "react";
import styles from "./ProStudentAppointments.module.css";
import { Button, Paper, Typography, Box, Chip } from "@mui/material";

const mockAppointments = [
  {
    id: 1,
    with: "SCAD Office",
    status: "pending",
    online: true,
    topic: "Career Guidance",
    date: "2025-05-20 14:00",
  },
  {
    id: 2,
    with: "SCAD Office",
    status: "accepted",
    online: false,
    topic: "Report Clarification",
    date: "2025-05-21 10:30",
  },
];

export default function ProStudentAppointments() {
  const [appointments, setAppointments] = useState(mockAppointments);

  // Request appointment (dummy)
  const handleRequest = () => {
    setAppointments([
      ...appointments,
      {
        id: appointments.length + 1,
        with: "SCAD Office",
        status: "pending",
        online: false,
        topic: "New Appointment",
        date: "2025-05-25 11:00",
      },
    ]);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <Typography variant="body2" gutterBottom>
        Request and manage your appointments for video calls with the SCAD Office.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRequest}
        sx={{ mb: 2 }}
      >
        Request New Appointment
      </Button>
      {appointments.map((appt) => (
        <Paper key={appt.id} className={styles.card} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1">With: {appt.with}</Typography>
              <Typography variant="body2">Topic: {appt.topic}</Typography>
              <Typography variant="body2">Date: {appt.date}</Typography>
              <Chip
                label={appt.online ? "Online" : "Offline"}
                color={appt.online ? "success" : "default"}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
            <Box>
              {appt.status === "pending" && (
                <Chip label="Pending" color="warning" />
              )}
              {appt.status === "accepted" && (
                <Chip label="Accepted" color="success" />
              )}
              {appt.status === "rejected" && (
                <Chip label="Rejected" color="error" />
              )}
            </Box>
          </Box>
        </Paper>
      ))}
    </div>
  );
}