import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy, BookOpen } from 'lucide-react';
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
      onComplete(score, questions.length);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const success = pct >= 70;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: success
            ? 'linear-gradient(135deg, rgba(232,132,44,0.08), rgba(245,166,35,0.04))'
            : 'linear-gradient(135deg, rgba(30,45,61,0.06), rgba(30,45,61,0.02))',
          border: `2px solid ${success ? 'rgba(232,132,44,0.3)' : 'rgba(30,45,61,0.1)'}`,
          borderRadius: 'var(--radius-xl)',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: success ? 'var(--gradient-orange)' : 'linear-gradient(135deg, var(--navy), var(--navy-light))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: success ? 'var(--shadow-orange)' : 'var(--shadow-md)',
        }}>
          {success ? <Trophy size={32} color="#fff" /> : <BookOpen size={32} color="#fff" />}
        </div>
        <h3 style={{
          margin: '0 0 8px',
          color: 'var(--navy)',
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}>
          {success ? 'Excellent !' : 'Continuez vos efforts !'}
        </h3>
        <p style={{
          fontSize: 18,
          color: 'var(--text-secondary)',
          margin: 0,
        }}>
          Score : <strong style={{ color: success ? '#e8842c' : 'var(--navy)' }}>{score}/{questions.length}</strong> ({pct}%)
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 24,
      }}>
        {questions.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 28 : 8,
            height: 8,
            borderRadius: 4,
            background: i < current ? 'var(--gradient-orange)' : i === current ? 'var(--orange)' : 'rgba(30,45,61,0.1)',
            transition: 'all 0.3s',
          }} />
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>
          {score} pt{score > 1 ? 's' : ''}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <p style={{
            fontSize: 17,
            fontWeight: 700,
            color: 'var(--navy)',
            marginBottom: 20,
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}>
            {q.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, idx) => {
              const isCorrect = idx === q.correctIndex;
              const isSelected = idx === selected;
              let bg = 'var(--white)';
              let borderColor = 'var(--border)';
              let textColor = 'var(--navy)';
              let shadow = 'none';

              if (showResult) {
                if (isCorrect) {
                  bg = 'rgba(232,132,44,0.06)';
                  borderColor = 'rgba(232,132,44,0.4)';
                  textColor = '#e8842c';
                  shadow = '0 2px 12px rgba(232,132,44,0.1)';
                } else if (isSelected && !isCorrect) {
                  bg = 'rgba(239,68,68,0.04)';
                  borderColor = 'rgba(239,68,68,0.3)';
                  textColor = '#ef4444';
                }
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  whileHover={!showResult ? { y: -2, boxShadow: 'var(--shadow-md)' } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    fontSize: 15,
                    textAlign: 'left',
                    cursor: showResult ? 'default' : 'pointer',
                    fontWeight: showResult && isCorrect ? 700 : 500,
                    transition: 'all 0.2s',
                    boxShadow: shadow,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <span style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: showResult && isCorrect ? 'var(--gradient-orange)' : showResult && isSelected ? '#ef4444' : 'rgba(30,45,61,0.05)',
                    color: showResult && (isCorrect || isSelected) ? '#fff' : 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 13,
                    flexShrink: 0,
                  }}>
                    {showResult && isCorrect ? <CheckCircle2 size={16} /> :
                     showResult && isSelected ? <XCircle size={16} /> :
                     String.fromCharCode(65 + idx)}
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
              style={{ marginTop: 20 }}
            >
              <div style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                background: selected === q.correctIndex
                  ? 'linear-gradient(135deg, rgba(232,132,44,0.06), rgba(245,166,35,0.03))'
                  : 'rgba(30,45,61,0.03)',
                border: `1px solid ${selected === q.correctIndex ? 'rgba(232,132,44,0.15)' : 'var(--border)'}`,
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 16,
              }}>
                <strong style={{ color: selected === q.correctIndex ? '#e8842c' : '#ef4444' }}>
                  {selected === q.correctIndex ? '✓ Correct !' : '✗ Incorrect.'}
                </strong>{' '}
                {q.explanation}
              </div>

              <button
                onClick={handleNext}
                style={{
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'var(--gradient-orange)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: 'var(--shadow-orange)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {current < questions.length - 1 ? 'Question suivante' : 'Voir le résultat'}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
