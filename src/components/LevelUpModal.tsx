import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface LevelUpModalProps {
  show: boolean;
  level: number;
  levelName: string;
  onClose: () => void;
}

export default function LevelUpModal({ show, level, levelName, onClose }: LevelUpModalProps) {
  useEffect(() => {
    if (show) {
      // Fire confetti
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#e8842c', '#F5A623', '#1e2d3d', '#8b5cf6', '#22c55e'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#e8842c', '#F5A623', '#1e2d3d', '#8b5cf6', '#22c55e'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();

      // Auto close
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(30,45,61,0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateZ: -5 }}
            animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1e2d3d 0%, #2a3f52 100%)',
              borderRadius: 28,
              padding: '48px 56px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.3), 0 0 0 2px rgba(232,132,44,0.3)',
            }}
          >
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 160,
              height: 160,
              borderRadius: '50%',
              background: 'rgba(232,132,44,0.08)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(139,92,246,0.08)',
            }} />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
              style={{
                fontSize: 64,
                marginBottom: 16,
                filter: 'drop-shadow(0 4px 20px rgba(232,132,44,0.4))',
              }}
            >
              {level >= 7 ? '👑' : level >= 5 ? '⭐' : level >= 3 ? '🚀' : '🎉'}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: 2,
                marginBottom: 8,
              }}
            >
              Level Up !
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              style={{
                fontSize: 56,
                fontWeight: 900,
                background: 'var(--gradient-orange)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              Niveau {level}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
                position: 'relative',
              }}
            >
              {levelName}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: 28,
                padding: '12px 32px',
                borderRadius: 12,
                border: 'none',
                background: 'var(--gradient-orange)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(232,132,44,0.35)',
              }}
            >
              Continuer
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
