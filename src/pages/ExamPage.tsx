import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules } from '../data/modules';
import type { QuizQuestion } from '../data/modules';
import { Timer, Brain, ArrowLeft, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const EXAM_DURATION_MINUTES = 20;
const QUESTIONS_COUNT = 20;

interface ExamQuestion extends QuizQuestion {
  moduleTitle: string;
  sectionTitle: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ExamPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'exam' | 'results'>('intro');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const confettiFired = useRef(false);

  // Gather all questions
  const allQuestions = useMemo(() => {
    const qs: ExamQuestion[] = [];
    for (const mod of modules) {
      for (const sec of mod.sections) {
        if (sec.quiz) {
          for (const q of sec.quiz) {
            qs.push({ ...q, moduleTitle: mod.title, sectionTitle: sec.title });
          }
        }
      }
    }
    return qs;
  }, []);

  const startExam = useCallback(() => {
    const shuffled = shuffleArray(allQuestions);
    const selected = shuffled.slice(0, Math.min(QUESTIONS_COUNT, shuffled.length));
    setQuestions(selected);
    setAnswers(new Array(selected.length).fill(null));
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setSecondsLeft(EXAM_DURATION_MINUTES * 60);
    confettiFired.current = false;
    setPhase('exam');
  }, [allQuestions]);

  // Timer
  useEffect(() => {
    if (phase !== 'exam') return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setPhase('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIdx: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIdx);
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      clearInterval(intervalRef.current);
      setPhase('results');
    }
  };

  // Results
  const score = answers.reduce<number>((acc, a, i) => {
    if (a !== null && questions[i] && a === questions[i].correctIndex) return acc + 1;
    return acc;
  }, 0);
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= 70;

  useEffect(() => {
    if (phase === 'results' && passed && !confettiFired.current) {
      confettiFired.current = true;
      setTimeout(() => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#e8842c', '#F5A623', '#22c55e', '#8b5cf6'] });
      }, 300);
    }
  }, [phase, passed]);

  const timeWarning = secondsLeft < 60;
  const timeCaution = secondsLeft < 180 && !timeWarning;

  if (phase === 'intro') {
    return (
      <div style={{ padding: '60px 48px', maxWidth: 700, margin: '0 auto' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none',
            color: 'var(--text-secondary)', fontSize: 14,
            cursor: 'pointer', padding: 0, marginBottom: 40, fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} /> Retour
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: 'linear-gradient(135deg, var(--navy) 0%, #2a3f52 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', boxShadow: 'var(--shadow-lg)',
          }}>
            <Brain size={40} color="#fff" />
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em', marginBottom: 12 }}>
            Examen Final
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            {QUESTIONS_COUNT} questions aleatoires issues de tous les modules.
            Vous avez <strong>{EXAM_DURATION_MINUTES} minutes</strong> pour repondre.
            Un score d'au moins <strong>70%</strong> est requis pour reussir.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
            marginBottom: 36,
          }}>
            {[
              { icon: '📝', label: 'Questions', value: QUESTIONS_COUNT },
              { icon: '⏱️', label: 'Duree', value: `${EXAM_DURATION_MINUTES} min` },
              { icon: '🎯', label: 'Seuil', value: '70%' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '16px', background: 'rgba(30,45,61,0.03)',
                borderRadius: 12, textAlign: 'center',
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--navy)' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(232,132,44,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={startExam}
            style={{
              padding: '18px 48px', borderRadius: 16, border: 'none',
              background: 'var(--gradient-orange)', color: '#fff',
              fontSize: 18, fontWeight: 800, cursor: 'pointer',
              boxShadow: 'var(--shadow-orange)', letterSpacing: '-0.01em',
            }}
          >
            Commencer l'examen
          </motion.button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div style={{ padding: '60px 48px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: passed ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', boxShadow: passed ? '0 8px 32px rgba(34,197,94,0.3)' : '0 8px 32px rgba(239,68,68,0.3)',
          }}>
            {passed ? <Award size={40} color="#fff" /> : <XCircle size={40} color="#fff" />}
          </div>

          <h1 style={{
            fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em',
            color: passed ? '#22c55e' : '#ef4444', marginBottom: 8,
          }}>
            {passed ? 'Examen reussi !' : 'Examen non valide'}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32 }}>
            {passed
              ? 'Felicitations ! Vous maitrisez la CCN Transports Routiers.'
              : 'Revisez les modules et reessayez. Courage !'
            }
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            background: 'var(--white)', borderRadius: 16, padding: '20px 32px',
            border: '1px solid var(--border)', marginBottom: 32,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em' }}>{score}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>/ {questions.length}</div>
            </div>
            <div style={{ width: 1, height: 50, background: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: passed ? '#22c55e' : '#ef4444', letterSpacing: '-0.03em' }}>{pct}%</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>score</div>
            </div>
          </div>

          {/* Review answers */}
          <div style={{ textAlign: 'left', marginBottom: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)', marginBottom: 16 }}>Detail des reponses</h3>
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correctIndex;
              return (
                <div key={i} style={{
                  padding: '14px 18px', marginBottom: 8,
                  borderRadius: 12, border: '1px solid var(--border)',
                  background: isCorrect ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {isCorrect ? <CheckCircle2 size={16} color="#22c55e" /> : <XCircle size={16} color="#ef4444" />}
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', flex: 1 }}>
                      {q.question}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{q.moduleTitle}</span>
                  </div>
                  {!isCorrect && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, marginLeft: 26 }}>
                      Reponse : {q.options[q.correctIndex]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '14px 28px', borderRadius: 12,
                border: '1px solid var(--border)', background: 'var(--white)',
                fontSize: 15, fontWeight: 600, cursor: 'pointer', color: 'var(--navy)',
              }}
            >
              <ArrowLeft size={16} style={{ marginRight: 8, verticalAlign: -3 }} />
              Tableau de bord
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startExam}
              style={{
                padding: '14px 28px', borderRadius: 12,
                border: 'none', background: 'var(--gradient-orange)',
                color: '#fff', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', boxShadow: 'var(--shadow-orange)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <RotateCcw size={16} /> Repasser l'examen
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Exam phase
  const q = questions[currentIdx];
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div style={{ padding: '40px 48px', maxWidth: 800, margin: '0 auto' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 32, padding: '16px 24px',
        background: 'var(--white)', borderRadius: 16,
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>
          Question {currentIdx + 1}/{questions.length}
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 4 }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: i === currentIdx ? 20 : 8, height: 8, borderRadius: 4,
              background: answers[i] !== null
                ? (answers[i] === questions[i].correctIndex ? '#22c55e' : '#ef4444')
                : i === currentIdx ? 'var(--orange)' : 'rgba(30,45,61,0.1)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em',
          color: timeWarning ? '#ef4444' : timeCaution ? '#f59e0b' : 'var(--navy)',
          animation: timeWarning ? 'pulse-dot 1s infinite' : 'none',
        }}>
          <Timer size={16} />
          {formatTime(secondsLeft)}
        </div>
      </div>

      {/* Question card */}
      <motion.div
        key={currentIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          background: 'var(--white)', borderRadius: 20,
          border: '1px solid var(--border)', padding: '36px 40px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600, marginBottom: 8 }}>
          {q.moduleTitle} — {q.sectionTitle}
        </div>
        <h2 style={{
          fontSize: 20, fontWeight: 800, color: 'var(--navy)',
          lineHeight: 1.4, letterSpacing: '-0.02em', marginBottom: 28,
        }}>
          {q.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = i === q.correctIndex;
            let bg = 'var(--white)';
            let border = '1px solid var(--border)';
            let color = 'var(--navy)';

            if (showFeedback) {
              if (isCorrect) {
                bg = 'rgba(34,197,94,0.08)';
                border = '2px solid #22c55e';
                color = '#16a34a';
              } else if (isSelected && !isCorrect) {
                bg = 'rgba(239,68,68,0.08)';
                border = '2px solid #ef4444';
                color = '#dc2626';
              }
            } else if (isSelected) {
              bg = 'rgba(232,132,44,0.06)';
              border = '2px solid var(--orange)';
            }

            return (
              <motion.button
                key={i}
                whileHover={!showFeedback ? { scale: 1.01 } : {}}
                onClick={() => handleAnswer(i)}
                style={{
                  padding: '16px 20px', borderRadius: 12,
                  border, background: bg, color,
                  fontSize: 15, fontWeight: 600, textAlign: 'left',
                  cursor: showFeedback ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800,
                  background: showFeedback && isCorrect ? '#22c55e' : showFeedback && isSelected ? '#ef4444' : 'rgba(30,45,61,0.06)',
                  color: (showFeedback && (isCorrect || isSelected)) ? '#fff' : 'var(--text-light)',
                  flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 24 }}
          >
            <div style={{
              padding: '16px 20px', borderRadius: 12,
              background: selectedOption === q.correctIndex ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
              border: `1px solid ${selectedOption === q.correctIndex ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6,
              marginBottom: 20,
            }}>
              {q.explanation}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextQuestion}
                style={{
                  padding: '12px 28px', borderRadius: 12, border: 'none',
                  background: 'var(--gradient-orange)', color: '#fff',
                  fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  boxShadow: 'var(--shadow-orange)',
                }}
              >
                {currentIdx < questions.length - 1 ? 'Question suivante' : 'Voir les resultats'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom progress */}
      <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: 'var(--text-light)' }}>
        {answeredCount}/{questions.length} questions repondues
      </div>
    </div>
  );
}
