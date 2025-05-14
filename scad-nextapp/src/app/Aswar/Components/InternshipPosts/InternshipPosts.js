'use client';
import React from 'react';
import './InternshipPosts.css';

const InternshipPosts = () => {
  return (
    <div className="frame6">
      <div className="rectangle8" />
      <div className="header-title">Your Internship Posts</div>

      {/* Column Headers */}
      <div className="label title">Title</div>
      <div className="label start-date">Start Date</div>
      <div className="label duration">Duration</div>
      <div className="label posted-on">Posted On</div>
      <div className="label applicants">Applicants</div>
      <div className="label status">Status</div>

      {/* Rows */}
      <div className="line line3" />
      <div className="line line5" />
      <div className="line line4" />

      <div className="post-title one">Frontend Development Internship</div>
      <div className="post-title two">Digital Marketing Assistant</div>
      <div className="post-title three">Data Analysis Intern</div>
      <div className="post-title four">UI/UX Design Intern</div>

      <div className="date one">2025-06-01</div>
      <div className="date two">2025-07-15</div>
      <div className="date three">2025-05-20</div>
      <div className="date four">2025-04-10</div>
    </div>
  );
};

export default InternshipPosts;
