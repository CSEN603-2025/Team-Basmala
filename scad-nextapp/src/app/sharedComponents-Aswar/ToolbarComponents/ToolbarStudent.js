'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './toolbar.module.css';
import { FaChevronDown, FaSearch, FaEnvelope, FaBell } from 'react-icons/fa';
import Image from 'next/image';
import NotificationListMedium from '@/app/Aswar/Components/NotificationListMedium/NotificationListMedium';
import { useRouter } from 'next/navigation';

export default function ToolbarStudent({ title = "Dashboard" }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setNotifOpen(false);
      }
      if (
        profileRef.current && !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEditProfile = () => {
    router.push('/Aswar/EditProfilePage'); // adjust route as needed
    setProfileOpen(false);
  };

  const handleLogout = () => {
    // TODO: perform logout
    router.push('/Aswar/auth/selectRole'); // adjust route as needed
  };

  return (
    <div className={styles.toolbar}>
      <span className={styles.title}>{title}</span>

      <div className={styles.profileSection}>
        <div className={styles.iconContainer}>
          <button className={styles.iconBtn}>
            <FaSearch />
          </button>
          <button className={styles.iconBtn}>
            <FaEnvelope />
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Toggle notifications"
          >
            <FaBell />
          </button>
          {notifOpen && (
            <div ref={dropdownRef} className={styles.notificationDropdown}>
              <NotificationListMedium />
            </div>
          )}
        </div>

        <Image
          src="/John.jpg"
          alt="Profile"
          className={styles.profilePic}
          width={40}
          height={40}
        />
        <button
          className={styles.dropdownBtn}
          onClick={() => setProfileOpen((o) => !o)}
          aria-label="Toggle profile menu"
        >
          <FaChevronDown />
        </button>

        {profileOpen && (
          <div ref={profileRef} className={styles.profileDropdown}>
            <button
              className={styles.profileItem}
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <button
              className={`${styles.profileItem} ${styles.logoutItem}`}
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
