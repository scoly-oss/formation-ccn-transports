import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Play, Pause, RotateCcw, Coffee, BookOpen, X } from 'lucide-react';

type Phase = 'work' | 'break';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

// Notify with browser notification when timer ends
function notifyTimerEnd(phase: Phase) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(phase === 'work' ? 'Pause meritee !' : 'Reprise !', {
      body: phase === 'work' ? 'Votre session de 25 min est terminee.' : 'La pause est finie, on reprend !',
    });
  }
}

export default function PomodoroTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('work');
  const [secondsLeft, setSecondsLeft] = useState(WORK_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const totalSeconds = phase === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const tick = useCallback(() => {
    setSecondsLeft(prev => {
      if (prev <= 1) {
        setIsRunning(false);
        notifyTimerEnd(phase);
        if (phase === 'work') {
          setSessionsCompleted(c => c + 1);
          setPhase('break');
          return BREAK_MINUTES * 60;
        } else {
          setPhase('work');
          return WORK_MINUTES * 60;
        }
      }
      return prev - 1;
    });
  }, [phase]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, tick]);

  const reset = () => {
    setIsRunning(false);
    setPhase('work');
    setSecondsLeft(WORK_MINUTES * 60);
  };

  // Minimized floating button
  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: isRunning ? 'auto' : 48, height: 48,
          padding: isRunning ? '0 16px 0 12px' : 0,
          borderRadius: 24, border: 'none',
          background: phase === 'work' ? 'var(--gradient-orange)' : 'linear-gradient(135deg, #22c55e, #16a34a)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          fontSize: 14, fontWeight: 700,
        }}
      >
        <Timer size={20} />
        {isRunning && formatTime(secondsLeft)}
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 280, background: '#fff',
          borderRadius: 20, boxShadow: '0 12px 48px rgba(30,45,61,0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px 12px',
          background: phase === 'work'
            ? 'linear-gradient(135deg, var(--navy) 0%, #2a3f52 100%)'
            : 'linear-gradient(135deg, #22c55e, #16a34a)',
          color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {phase === 'work' ? <BookOpen size={16} /> : <Coffee size={16} />}
              <span style={{ fontSize: 13, fontWeight: 700 }}>
                {phase === 'work' ? 'Concentration' : 'Pause'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none',
                width: 24, height: 24, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
              }}
            >
              <X size={12} />
            </button>
          </div>

          {/* Timer display */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {formatTime(secondsLeft)}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: '#fff', borderRadius: 2,
              transition: 'width 1s linear',
            }} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <button
            onClick={reset}
            style={{
              width: 40, height: 40, borderRadius: 10,
              border: '1px solid var(--border)', background: 'var(--white)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={16} color="var(--text-light)" />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRunning(!isRunning)}
            style={{
              width: 56, height: 56, borderRadius: 16,
              border: 'none',
              background: isRunning ? 'rgba(239,68,68,0.1)' : 'var(--gradient-orange)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: isRunning ? 'none' : 'var(--shadow-orange)',
            }}
          >
            {isRunning
              ? <Pause size={22} color="#ef4444" />
              : <Play size={22} color="#fff" style={{ marginLeft: 2 }} />
            }
          </motion.button>

          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'rgba(30,45,61,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: 'var(--navy)',
          }}>
            {sessionsCompleted}
          </div>
        </div>

        {/* Info */}
        <div style={{
          padding: '0 20px 14px', textAlign: 'center',
          fontSize: 11, color: 'var(--text-light)',
        }}>
          {sessionsCompleted} session{sessionsCompleted > 1 ? 's' : ''} — {WORK_MINUTES}min travail / {BREAK_MINUTES}min pause
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
