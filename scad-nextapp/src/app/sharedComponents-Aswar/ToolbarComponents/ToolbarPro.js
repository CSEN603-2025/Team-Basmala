'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './toolbar.module.css';
import { FaChevronDown, FaSearch, FaEnvelope, FaBell } from 'react-icons/fa';
import Image from 'next/image';
import NotificationListMedium from '@/app/Aswar/Components/NotificationListMedium/NotificationListMedium';

export default function Toolbar({ title = "Dashboard" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.toolbar}>
      <span className={styles.title}>{title}</span>

      <div className={styles.profileSection}>
        <div className={styles.iconContainer}>
          <button className={styles.iconBtn}><FaSearch /></button>
          <button className={styles.iconBtn}><FaEnvelope /></button>
          <button
            className={styles.iconBtn}
            onClick={() => setDropdownOpen(open => !open)}
            aria-label="Toggle notifications"
          >
            <FaBell />
          </button>

          {dropdownOpen && (
            <div ref={dropdownRef} className={styles.notificationDropdown}>
              <NotificationListMedium />
            </div>
          )}
        </div>

        <div className={styles.profileWrapper}>
          <Image
            src="/John.jpg"
            alt="Profile"
            className={styles.profilePic}
            width={40}
            height={40}
          />
          <span className={styles.proBadge}>PRO</span>
        </div>

        <button className={styles.dropdownBtn}>
          <FaChevronDown />
        </button>
      </div>
    </div>
  );
}
