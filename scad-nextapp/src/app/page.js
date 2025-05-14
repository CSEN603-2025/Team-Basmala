'use client';
import { useRouter } from 'next/navigation';
import styles from './selectRole.module.css';

export default function SelectRolePage() {
  const router = useRouter();

  const handleSelect = (role) => {
    const roleSlug = role.toLowerCase().replace(/\s+/g, '-'); // Convert role to URL-friendly slug
    router.push(`/Aswar/auth?role=${roleSlug}`); // Redirect to auth with role as query param
  };

  const roles = ['Company', 'SCAD', 'Student', 'Pro Student', 'Faculty Member'];

  return (
    <div className={styles.container}>
      <h1>Select Your Role</h1>
      <div className={styles.roleList}>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleSelect(role)}
            className={styles.roleButton}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}
