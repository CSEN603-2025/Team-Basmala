'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './auth.module.css';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // e.g., 'student', 'pro-student'
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Selected Role:', role);
  }, [role]);

  const dummyCredentials = {
    company: { email: 'company@example.com', password: 'company123' },
    student: { email: 'student@example.com', password: 'student123' },
    'pro-student': { email: 'pro@example.com', password: 'pro123' },
    'faculty-member': { email: 'faculty@example.com', password: 'faculty123' },
    scad: { email: 'scad@example.com', password: 'scad123' },
  };

  const dashboardRoutes = {
    company: '/Aswar/DashboardCompany',
    student: '/Aswar/DashboardStudent',
    'pro-student': '/Aswar/DashboardPRO',
    'faculty-member': '/Aswar/DashboardFacultyMem',
    scad: '/Aswar/DashboardSCAD',
  };

  const handleLogin = () => {
    if (!role || !dummyCredentials[role]) {
      setError('Invalid role selected');
      return;
    }

    const creds = dummyCredentials[role];
    if (email === creds.email && password === creds.password) {
      setError('');
      router.push(dashboardRoutes[role]);
    } else {
      setError('Invalid ' + role + ' email or password.');
    }
  };

  const handleRegister = () => {
    if (role === 'company') {
      router.push('/Aswar/auth/CompanyRegistration');
    } else {
      alert('Registration not implemented for this role.');
    }
  };

  const formatRoleDisplay = (role) => {
    if (!role) return 'No Role Selected';
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1>Welcome Back</h1>
        <p className={styles.roleDisplay}>
          Signing in as {formatRoleDisplay(role)}
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.buttonGroup}>
          <button onClick={handleLogin} className={styles.loginBtn}>
            Sign In
          </button>
          <button onClick={handleRegister} className={styles.registerBtn}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}