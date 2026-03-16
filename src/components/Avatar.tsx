import { motion } from 'framer-motion';

interface AvatarProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'friendly' | 'serious';
}

const BASE = import.meta.env.BASE_URL;

export default function Avatar({ message, size = 'md', variant = 'friendly' }: AvatarProps) {
  const sizeMap = { sm: 52, md: 72, lg: 110 };
  const s = sizeMap[size];
  const photo = variant === 'serious'
    ? `${BASE}avatar-sofiane-serious.jpg`
    : `${BASE}avatar-sofiane.jpg`;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
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
          background: 'var(--gradient-orange)',
          padding: 3,
          boxShadow: 'var(--shadow-orange)',
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'var(--navy)',
        }}>
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
        </div>
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 24px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--navy)',
            maxWidth: 500,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            left: -8,
            top: 20,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '8px solid var(--white)',
            filter: 'drop-shadow(-2px 0 1px rgba(30,45,61,0.04))',
          }} />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 6,
          }}>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              background: 'var(--gradient-orange)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Sofiane Coly
            </span>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--text-light)',
              background: 'rgba(30,45,61,0.05)',
              padding: '2px 8px',
              borderRadius: 20,
            }}>
              Formateur
            </span>
          </div>
          {message}
        </motion.div>
      )}
    </div>
  );
}
