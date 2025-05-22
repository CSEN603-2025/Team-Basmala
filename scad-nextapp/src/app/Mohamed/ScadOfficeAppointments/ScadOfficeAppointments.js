"use client";

import React, { useState } from "react";
import styles from "./ScadOfficeAppointments.module.css";
import { Button, Paper, Typography, Box, Chip } from "@mui/material";

const mockAppointments = [
  {
    id: 1,
    student: "Ahmed Hassan",
    status: "pending",
    online: true,
    topic: "Career Guidance",
    date: "2025-05-20 14:00",
  },
  {
    id: 2,
    student: "Sara Mohamed",
    status: "accepted",
    online: false,
    topic: "Report Clarification",
    date: "2025-05-21 10:30",
  },
];

export default function ScadOfficeAppointments() {
  const [appointments, setAppointments] = useState(mockAppointments);

  // Accept/Reject logic
  const handleStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status } : appt
      )
    );
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <Typography variant="body2" gutterBottom>
        Manage video call appointments for career guidance and report clarifications.
      </Typography>
      {appointments.map((appt) => (
        <Paper key={appt.id} className={styles.card} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1">{appt.student}</Typography>
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
                <>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleStatus(appt.id, "accepted")}
                    sx={{ mr: 1 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleStatus(appt.id, "rejected")}
                  >
                    Reject
                  </Button>
                </>
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