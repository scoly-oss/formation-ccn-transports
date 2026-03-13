import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '../data/modules';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
      const finalScore = selected === q.correctIndex ? score + 0 : score; // score already updated
      onComplete(finalScore, questions.length);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: pct >= 70 ? 'linear-gradient(135deg, #e8842c15, #e8842c05)' : 'linear-gradient(135deg, #ff634715, #ff634705)',
          border: `2px solid ${pct >= 70 ? '#e8842c' : '#ff6347'}`,
          borderRadius: 16,
          padding: 32,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>{pct >= 70 ? '🎉' : '📚'}</div>
        <h3 style={{ margin: '0 0 8px', color: '#1e2d3d', fontSize: 22 }}>
          {pct >= 70 ? 'Excellent !' : 'Continuez vos efforts !'}
        </h3>
        <p style={{ fontSize: 18, color: '#2a3d50', margin: 0 }}>
          Score : <strong>{score}/{questions.length}</strong> ({pct}%)
        </p>
      </motion.div>
    );
  }

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: '#2a3d50', fontWeight: 600 }}>
          Question {current + 1} / {questions.length}
        </span>
        <span style={{ fontSize: 13, color: '#e8842c', fontWeight: 600 }}>
          Score : {score}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1e2d3d', marginBottom: 16, lineHeight: 1.5 }}>
            {q.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, idx) => {
              let bg = '#fff';
              let borderColor = '#e2e6ec';
              let textColor = '#1e2d3d';

              if (showResult) {
                if (idx === q.correctIndex) {
                  bg = '#e8842c15';
                  borderColor = '#e8842c';
                  textColor = '#e8842c';
                } else if (idx === selected && idx !== q.correctIndex) {
                  bg = '#ff634715';
                  borderColor = '#ff6347';
                  textColor = '#ff6347';
                }
              } else if (idx === selected) {
                bg = '#e8842c10';
                borderColor = '#e8842c';
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  whileHover={!showResult ? { scale: 1.01 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    fontSize: 15,
                    textAlign: 'left',
                    cursor: showResult ? 'default' : 'pointer',
                    fontWeight: showResult && idx === q.correctIndex ? 600 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ marginRight: 10, fontWeight: 700 }}>
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 16 }}
            >
              <div style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: selected === q.correctIndex ? '#e8842c08' : '#1e2d3d08',
                border: `1px solid ${selected === q.correctIndex ? '#e8842c30' : '#1e2d3d20'}`,
                fontSize: 14,
                color: '#2a3d50',
                lineHeight: 1.6,
                marginBottom: 16,
              }}>
                <strong>{selected === q.correctIndex ? '✓ Correct !' : '✗ Incorrect.'}</strong>{' '}
                {q.explanation}
              </div>

              <button
                onClick={handleNext}
                style={{
                  padding: '12px 28px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#e8842c',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {current < questions.length - 1 ? 'Question suivante →' : 'Voir le résultat'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
