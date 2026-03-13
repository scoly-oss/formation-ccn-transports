import { motion } from 'framer-motion';

interface AvatarProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'friendly' | 'serious';
}

const BASE = import.meta.env.BASE_URL;

export default function Avatar({ message, size = 'md', className = '', variant = 'friendly' }: AvatarProps) {
  const sizeMap = { sm: 56, md: 80, lg: 130 };
  const s = sizeMap[size];
  const photo = variant === 'serious'
    ? `${BASE}avatar-sofiane-serious.jpg`
    : `${BASE}avatar-sofiane.jpg`;

  return (
    <div className={`avatar-wrapper ${className}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          width: s,
          height: s,
          minWidth: s,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(232,132,44,0.25)',
          border: '3px solid #fff',
          position: 'relative',
          background: '#1e2d3d',
        }}
      >
        <img
          src={photo}
          alt="Sofiane Coly — Formateur"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            display: 'block',
          }}
        />
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '14px 20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e2e6ec',
            fontSize: 15,
            lineHeight: 1.6,
            color: '#1e2d3d',
            maxWidth: 440,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            left: -8,
            top: 18,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '8px solid #fff',
          }} />
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e8842c', marginBottom: 4 }}>
            Sofiane Coly
          </div>
          {message}
        </motion.div>
      )}
    </div>
  );
}
