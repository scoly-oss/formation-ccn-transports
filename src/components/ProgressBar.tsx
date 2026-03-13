import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
}

export default function ProgressBar({ value, max, label, color = '#e8842c' }: ProgressBarProps) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: '#1e2d3d' }}>
          <span>{label}</span>
          <span style={{ fontWeight: 600 }}>{pct}%</span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: 8,
        background: '#e2e6ec',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}
