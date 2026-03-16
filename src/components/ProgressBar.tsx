import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  height?: number;
}

export default function ProgressBar({ value, max, label, showPercentage = true, height = 10 }: ProgressBarProps) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercentage) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10,
          fontSize: 14,
          color: 'var(--navy)',
        }}>
          {label && <span style={{ fontWeight: 600 }}>{label}</span>}
          {showPercentage && (
            <span style={{
              fontWeight: 800,
              fontSize: 15,
              background: 'var(--gradient-orange)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {pct}%
            </span>
          )}
        </div>
      )}
      <div style={{
        width: '100%',
        height,
        background: 'rgba(30,45,61,0.06)',
        borderRadius: height,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '100%',
            background: 'var(--gradient-orange)',
            borderRadius: height,
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
}
