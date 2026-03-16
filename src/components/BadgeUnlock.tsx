import { motion, AnimatePresence } from 'framer-motion';

interface BadgeUnlockProps {
  show: boolean;
  badge: { title: string; icon: string; description: string } | null;
  onDone: () => void;
}

export default function BadgeUnlock({ show, badge, onDone }: BadgeUnlockProps) {
  return (
    <AnimatePresence>
      {show && badge && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onAnimationComplete={() => {
            setTimeout(onDone, 3000);
          }}
          style={{
            position: 'fixed',
            top: 32,
            right: 32,
            zIndex: 10002,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '18px 24px',
            borderRadius: 18,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9))',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 12px 40px rgba(30,45,61,0.15), 0 0 0 1px rgba(232,132,44,0.15)',
          }}
        >
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
            style={{
              fontSize: 36,
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
            }}
          >
            {badge.icon}
          </motion.div>
          <div>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#e8842c',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 2,
            }}>
              Badge débloqué !
            </div>
            <div style={{
              fontSize: 16,
              fontWeight: 800,
              color: 'var(--navy)',
              letterSpacing: '-0.01em',
            }}>
              {badge.title}
            </div>
            <div style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}>
              {badge.description}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
