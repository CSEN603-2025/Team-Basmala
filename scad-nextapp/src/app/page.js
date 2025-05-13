'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <Link href="/Aswar/auth">Go to Dashboard</Link>
    </main>
  );
}
