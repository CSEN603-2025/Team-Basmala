// app/Aswar/Components/Charts/ApplicationStatusChart.jsx
import styles from './ApplicationStatusChart.module.css';

export default function ApplicationStatusChart() {
  return (
    <div className={styles.statusChartWrapper}>
      <div className={styles.chartBackground}></div>

      <div className={styles.barRejected}></div>
      <div className={styles.barPending}></div>
      <div className={styles.barAccepted}></div>

      <div className={styles.labelRejected}>Rejected</div>
      <div className={styles.labelPending}>Pending</div>
      <div className={styles.labelAccepted}>Accepted</div>

      <div className={styles.countRejected}>10</div>
      <div className={styles.countPending}>6</div>
      <div className={styles.countAccepted}>17</div>

      <div className={styles.chartTitle}>Application Status</div>
    </div>
  );
}
