// src/app/login/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ⬅️ Import router
import styles from './auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ⬅️ Initialize router

  const handleLogin = () => {
    // You can add auth validation here if needed
    router.push('/Aswar/auth/selectRole'); // ⬅️ Redirect on login
  };

  const handleRegister = () => {
    alert(`Redirecting to register...`);
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
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
      <div className={styles.buttonGroup}>
        <button onClick={handleLogin} className={styles.loginBtn}>Login</button>
        <button onClick={handleRegister} className={styles.registerBtn}>Register</button>
      </div>
    </div>
  );
}
