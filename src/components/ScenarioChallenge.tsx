import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, Lightbulb, Zap } from 'lucide-react';
import type { Scenario } from '../data/modules';

interface ScenarioProps {
  scenario: Scenario;
  onComplete: (correct: boolean, xpBonus: number) => void;
}

export default function ScenarioChallenge({ scenario, onComplete }: ScenarioProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const choice = scenario.choices[idx];
    onComplete(choice.isCorrect, choice.xpBonus || 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 32,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '2px solid rgba(245,158,11,0.2)',
        background: 'linear-gradient(135deg, rgba(245,158,11,0.04), rgba(251,191,36,0.02))',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 28px',
        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Lightbulb size={20} color="#fff" />
        </div>
        <div>
          <h4 style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.01em',
          }}>
            Cas Pratique
          </h4>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
            Mettez vos connaissances en situation
          </span>
        </div>
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(255,255,255,0.2)',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 700,
          color: '#fff',
        }}>
          <Zap size={12} /> +XP
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>
        {/* Situation */}
        <div style={{
          padding: '18px 22px',
          background: 'var(--white)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          marginBottom: 16,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}>
            <AlertTriangle size={14} color="#f59e0b" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Situation
            </span>
          </div>
          <p style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--navy)',
            fontWeight: 500,
          }}>
            {scenario.situation}
          </p>
          <p style={{
            margin: '10px 0 0',
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
          }}>
            {scenario.context}
          </p>
        </div>

        {/* Choices */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {scenario.choices.map((choice, idx) => {
            const isSelected = selected === idx;
            const isCorrect = choice.isCorrect;
            let bg = 'var(--white)';
            let borderColor = 'var(--border)';
            let textColor = 'var(--navy)';

            if (showFeedback) {
              if (isCorrect) {
                bg = 'rgba(34,197,94,0.06)';
                borderColor = 'rgba(34,197,94,0.4)';
                textColor = '#16a34a';
              } else if (isSelected && !isCorrect) {
                bg = 'rgba(239,68,68,0.04)';
                borderColor = 'rgba(239,68,68,0.3)';
                textColor = '#ef4444';
              } else {
                bg = 'rgba(30,45,61,0.02)';
                borderColor = 'rgba(30,45,61,0.05)';
                textColor = 'var(--text-light)';
              }
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleSelect(idx)}
                whileHover={!showFeedback ? { y: -2, boxShadow: 'var(--shadow-md)' } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: `2px solid ${borderColor}`,
                  background: bg,
                  color: textColor,
                  fontSize: 14,
                  fontWeight: showFeedback && isCorrect ? 700 : 500,
                  textAlign: 'left',
                  cursor: showFeedback ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  lineHeight: 1.5,
                }}
              >
                <span style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: showFeedback && isCorrect
                    ? '#22c55e'
                    : showFeedback && isSelected && !isCorrect
                    ? '#ef4444'
                    : 'rgba(245,158,11,0.1)',
                  color: showFeedback && (isCorrect || (isSelected && !isCorrect)) ? '#fff' : '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 13,
                  flexShrink: 0,
                }}>
                  {showFeedback && isCorrect ? <CheckCircle2 size={16} /> :
                   showFeedback && isSelected && !isCorrect ? <XCircle size={16} /> :
                   String.fromCharCode(65 + idx)}
                </span>
                <span style={{ flex: 1 }}>{choice.text}</span>
                {showFeedback && isCorrect && choice.xpBonus && (
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#22c55e',
                    background: 'rgba(34,197,94,0.1)',
                    padding: '3px 10px',
                    borderRadius: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    flexShrink: 0,
                  }}>
                    <Zap size={10} /> +{choice.xpBonus} XP
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              style={{
                marginTop: 16,
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                background: scenario.choices[selected].isCorrect
                  ? 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))'
                  : 'rgba(239,68,68,0.04)',
                border: `1px solid ${scenario.choices[selected].isCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: scenario.choices[selected].isCorrect ? '#16a34a' : '#ef4444' }}>
                {scenario.choices[selected].isCorrect ? '✓ Bonne analyse !' : '✗ Ce n\'est pas la meilleure approche.'}
              </strong>{' '}
              {scenario.choices[selected].feedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
