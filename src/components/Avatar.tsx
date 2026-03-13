import { motion } from 'framer-motion';

interface AvatarProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({ message, size = 'md', className = '' }: AvatarProps) {
  const sizeMap = { sm: 48, md: 72, lg: 120 };
  const s = sizeMap[size];

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
          background: 'linear-gradient(135deg, #e8842c 0%, #1e2d3d 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: s * 0.4,
          fontWeight: 700,
          boxShadow: '0 4px 16px rgba(232,132,44,0.3)',
          border: '3px solid #fff',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        SC
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '12px 18px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e2e6ec',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#1e2d3d',
            maxWidth: 400,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            left: -8,
            top: 16,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '8px solid #fff',
          }} />
          {message}
        </motion.div>
      )}
    </div>
  );
}
