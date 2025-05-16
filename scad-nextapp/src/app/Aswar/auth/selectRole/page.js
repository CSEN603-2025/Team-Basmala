'use client';
import { useRouter } from 'next/navigation';


export default function SelectRolePage() {
  const router = useRouter();

  const handleSelect = (role) => {
    const roleRoutes = {
      company: '/Aswar/DashboardCompany',
      scad: '/Aswar/DashboardSCAD',
      student: '/Aswar/DashboardStudent',
      'pro student': '/Aswar/DashboardPRO',
      'faculty member': '/Aswar/DashboardFacultyMem',
    };

    const route = roleRoutes[role];
    if (route) {
      router.push(route);
    } else {
      alert('Invalid role selected');
    }
  };

  const roles = ['Company', 'SCAD', 'Student', 'Pro Student', 'Faculty Member'];

  return (
    <div className={styles.container}>
      <h1>Select Your Role</h1>
      <div className={styles.roleList}>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleSelect(role.toLowerCase())}
            className={styles.roleButton}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}
