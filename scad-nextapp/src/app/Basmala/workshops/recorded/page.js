'use client';
import { useState } from 'react';
import SidebarPRO from '@/app/sharedComponents-Aswar/SidebarComponents/SidebarPRO';
import ToolbarPro from '@/app/sharedComponents-Aswar/ToolbarComponents/ToolbarPro';
import styles from './page.module.css';
import { FaPlay, FaTimes } from 'react-icons/fa';

const DUMMY_WORKSHOPS = [
  {
    id: 1,
    title: "Resume Writing Essentials",
    duration: "45 minutes",
    presenter: "Sarah Johnson",
    description: "Learn the fundamentals of creating a professional resume that stands out.",
    videoUrl: "https://example.com/video1.mp4",
    thumbnail: "/workshop-thumbnails/resume-writing.jpg"
  },
  {
    id: 2,
    title: "Interview Skills Masterclass",
    duration: "60 minutes",
    presenter: "Michael Brown",
    description: "Master the art of interviewing with practical tips and mock interviews.",
    videoUrl: "https://example.com/video2.mp4",
    thumbnail: "/workshop-thumbnails/interview-skills.jpg"
  },
  {
    id: 3,
    title: "LinkedIn Profile Optimization",
    duration: "30 minutes",
    presenter: "Emily Chen",
    description: "Optimize your LinkedIn profile to attract recruiters and opportunities.",
    videoUrl: "https://example.com/video3.mp4",
    thumbnail: "/workshop-thumbnails/linkedin-profile.jpg"
  }
];

export default function RecordedWorkshopsPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = (workshop) => {
    setSelectedVideo(workshop);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  return (
    <div className={styles.pageContainer}>
      <ToolbarPro />
      <div className={styles.contentWrapper}>
        <SidebarPRO activeItem="Workshops" />
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <h1 className={styles.title}>Pre-recorded Workshops</h1>
            
            <div className={styles.workshopGrid}>
              {DUMMY_WORKSHOPS.map((workshop) => (
                <div key={workshop.id} className={styles.workshopCard}>
                  <div className={styles.thumbnailContainer}>
                    <div className={styles.thumbnail} style={{ backgroundImage: `url(${workshop.thumbnail})` }} />
                    <button 
                      className={styles.playButton}
                      onClick={() => handlePlayVideo(workshop)}
                    >
                      <FaPlay />
                    </button>
                  </div>
                  <div className={styles.workshopInfo}>
                    <h2>{workshop.title}</h2>
                    <p className={styles.presenter}>Presenter: {workshop.presenter}</p>
                    <p className={styles.duration}>Duration: {workshop.duration}</p>
                    <p className={styles.description}>{workshop.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedVideo && (
              <div className={styles.videoModal}>
                <div className={styles.videoContainer}>
                  <button 
                    className={styles.closeButton}
                    onClick={handleCloseVideo}
                  >
                    <FaTimes />
                  </button>
                  <div className={styles.videoWrapper}>
                    <video
                      controls
                      autoPlay={isPlaying}
                      className={styles.video}
                    >
                      <source src={selectedVideo.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className={styles.videoInfo}>
                    <h2>{selectedVideo.title}</h2>
                    <p>{selectedVideo.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 