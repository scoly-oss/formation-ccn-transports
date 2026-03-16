import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Star } from 'lucide-react';

interface XPNotificationProps {
  show: boolean;
  amount: number;
  reason: string;
  onDone: () => void;
}

export default function XPNotification({ show, amount, reason, onDone }: XPNotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onAnimationComplete={() => {
            setTimeout(onDone, 1800);
          }}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px 24px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #1e2d3d 0%, #2a3f52 100%)',
            boxShadow: '0 12px 40px rgba(30,45,61,0.3), 0 0 0 1px rgba(232,132,44,0.2)',
            color: '#fff',
          }}
        >
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'var(--gradient-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(232,132,44,0.4)',
            }}
          >
            {amount >= 100 ? <Trophy size={22} /> : amount >= 50 ? <Star size={22} /> : <Zap size={22} />}
          </motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                background: 'var(--gradient-orange)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              +{amount} XP
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}
            >
              {reason}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
