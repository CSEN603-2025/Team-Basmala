'use client';
import styles from './toolbar.module.css';
import { FaChevronDown, FaSearch, FaEnvelope, FaBell } from 'react-icons/fa';
import Image from 'next/image';

export default function Toolbar({ title = "Dashboard" }) {
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
          <button className={styles.iconBtn}>
            <FaBell />
          </button>
        </div>

        <Image
          src="/John.jpg"
          alt="Profile"
          className={styles.profilePic}
          width={40}
          height={40}
        />
        <button className={styles.dropdownBtn}>
          <FaChevronDown />
        </button>
      </div>
    </div>
  );
}
