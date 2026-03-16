import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Layers, CheckCircle2, Brain } from 'lucide-react';
import type { Flashcard as FlashcardType } from '../data/modules';

// SM-2 Spaced Repetition
interface SM2Data {
  easeFactor: number;
  interval: number; // in "reviews" (simplified for session use)
  repetitions: number;
  nextReview: number; // review index when this card should appear next
}

function sm2Update(data: SM2Data, quality: number): SM2Data {
  // quality: 0-5 (0=complete blackout, 5=perfect)
  const ef = Math.max(1.3, data.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  if (quality < 3) {
    return { easeFactor: ef, interval: 1, repetitions: 0, nextReview: 0 };
  }

  let interval: number;
  if (data.repetitions === 0) interval = 1;
  else if (data.repetitions === 1) interval = 3;
  else interval = Math.round(data.interval * ef);

  return {
    easeFactor: ef,
    interval,
    repetitions: data.repetitions + 1,
    nextReview: interval,
  };
}

interface FlashcardProps {
  cards: FlashcardType[];
  onReview: (count: number) => void;
}

const DIFFICULTY_OPTIONS = [
  { label: 'A revoir', quality: 1, color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
  { label: 'Difficile', quality: 3, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { label: 'Correct', quality: 4, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { label: 'Facile', quality: 5, color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
];

export default function FlashcardDeck({ cards, onReview }: FlashcardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [sm2Data, setSM2Data] = useState<Record<number, SM2Data>>(() => {
    const data: Record<number, SM2Data> = {};
    cards.forEach((_, i) => {
      data[i] = { easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: 0 };
    });
    return data;
  });
  const [reviewCount, setReviewCount] = useState(0);

  // Cards sorted by priority (due for review first)
  const sortedQueue = useMemo(() => {
    return cards
      .map((_, i) => ({ index: i, data: sm2Data[i] }))
      .sort((a, b) => {
        // Unreviewed first, then by nextReview
        const aReviewed = reviewed.has(a.index);
        const bReviewed = reviewed.has(b.index);
        if (!aReviewed && bReviewed) return -1;
        if (aReviewed && !bReviewed) return 1;
        return (a.data?.nextReview || 0) - (b.data?.nextReview || 0);
      });
  }, [cards, sm2Data, reviewed]);

  const card = cards[currentIdx];

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setShowRating(true);
      if (!reviewed.has(currentIdx)) {
        const newReviewed = new Set(reviewed);
        newReviewed.add(currentIdx);
        setReviewed(newReviewed);
        onReview(newReviewed.size);
      }
    }
  };

  const handleRate = (quality: number) => {
    const currentData = sm2Data[currentIdx] || { easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: 0 };
    const updated = sm2Update(currentData, quality);
    updated.nextReview = reviewCount + updated.interval;

    setSM2Data(prev => ({ ...prev, [currentIdx]: updated }));
    setReviewCount(prev => prev + 1);
    setShowRating(false);

    // Auto-advance to next card
    setTimeout(() => {
      if (currentIdx < cards.length - 1) {
        goTo(currentIdx + 1);
      } else {
        // Find a card that needs review
        const needsReview = sortedQueue.find(q => {
          const d = sm2Data[q.index];
          return d && d.repetitions > 0 && d.nextReview <= reviewCount + 1;
        });
        if (needsReview) goTo(needsReview.index);
      }
    }, 200);
  };

  const goTo = (idx: number) => {
    setDirection(idx > currentIdx ? 1 : -1);
    setIsFlipped(false);
    setShowRating(false);
    setTimeout(() => setCurrentIdx(idx), 50);
  };

  const next = () => {
    if (currentIdx < cards.length - 1) goTo(currentIdx + 1);
  };

  const prev = () => {
    if (currentIdx > 0) goTo(currentIdx - 1);
  };

  // Get mastery level for a card
  const getMastery = (idx: number) => {
    const d = sm2Data[idx];
    if (!d || d.repetitions === 0) return 0;
    if (d.easeFactor >= 2.5 && d.repetitions >= 2) return 2; // mastered
    if (d.repetitions >= 1) return 1; // learning
    return 0;
  };

  const masteredCount = cards.filter((_, i) => getMastery(i) === 2).length;

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(139,92,246,0.25)',
        }}>
          <Layers size={18} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 800,
            color: 'var(--navy)',
            letterSpacing: '-0.02em',
          }}>
            Flashcards
          </h4>
          <span style={{ fontSize: 12, color: 'var(--text-light)' }}>
            {reviewed.size}/{cards.length} revues — Cliquez pour retourner
          </span>
        </div>
        {masteredCount > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 700, color: '#22c55e',
            background: 'rgba(34,197,94,0.08)', padding: '4px 10px', borderRadius: 20,
          }}>
            <Brain size={11} /> {masteredCount} maitrisee{masteredCount > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Card */}
      <div
        onClick={!showRating ? handleFlip : undefined}
        style={{
          perspective: 1000,
          cursor: showRating ? 'default' : 'pointer',
          height: 220,
          marginBottom: showRating ? 8 : 16,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIdx}-${isFlipped ? 'back' : 'front'}-${direction}`}
            initial={{
              rotateY: isFlipped ? -90 : 90,
              opacity: 0,
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
            }}
            exit={{
              rotateY: isFlipped ? 90 : -90,
              opacity: 0,
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px 32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              ...(isFlipped
                ? {
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(167,139,250,0.03))',
                    border: '2px solid rgba(139,92,246,0.2)',
                    boxShadow: '0 8px 32px rgba(139,92,246,0.1)',
                  }
                : {
                    background: 'var(--white)',
                    border: '2px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                  }),
            }}
          >
            {/* Category badge */}
            {card.category && (
              <span style={{
                position: 'absolute',
                top: 16,
                left: 16,
                fontSize: 11,
                fontWeight: 700,
                color: isFlipped ? '#8b5cf6' : 'var(--text-light)',
                background: isFlipped ? 'rgba(139,92,246,0.1)' : 'rgba(30,45,61,0.05)',
                padding: '3px 10px',
                borderRadius: 20,
              }}>
                {card.category}
              </span>
            )}

            {/* Flip indicator */}
            <span style={{
              position: 'absolute',
              top: 16,
              right: 16,
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--text-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <RotateCcw size={10} />
              {isFlipped ? 'Réponse' : 'Question'}
            </span>

            {/* Mastery indicator */}
            {getMastery(currentIdx) > 0 && (
              <div style={{
                position: 'absolute', bottom: 16, right: 16,
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 10, fontWeight: 600,
                color: getMastery(currentIdx) === 2 ? '#22c55e' : '#f59e0b',
              }}>
                {getMastery(currentIdx) === 2 ? <CheckCircle2 size={13} /> : <Brain size={13} />}
                {getMastery(currentIdx) === 2 ? 'Maitrisee' : 'En cours'}
              </div>
            )}

            <div style={{
              fontSize: isFlipped ? 18 : 17,
              fontWeight: isFlipped ? 700 : 600,
              color: isFlipped ? '#8b5cf6' : 'var(--navy)',
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}>
              {isFlipped ? card.back : card.front}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SM-2 Difficulty rating */}
      {showRating && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', gap: 8, justifyContent: 'center',
            marginBottom: 16, padding: '0 8px',
          }}
        >
          {DIFFICULTY_OPTIONS.map(opt => (
            <button
              key={opt.quality}
              onClick={(e) => { e.stopPropagation(); handleRate(opt.quality); }}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: 10,
                border: `1px solid ${opt.color}20`,
                background: opt.bg, color: opt.color,
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 4px 12px ${opt.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          disabled={currentIdx === 0}
          style={{
            padding: '10px 16px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--white)',
            cursor: currentIdx === 0 ? 'default' : 'pointer',
            opacity: currentIdx === 0 ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--navy)',
            transition: 'all 0.2s',
          }}
        >
          <ChevronLeft size={14} /> Précédente
        </button>

        {/* Dots with mastery colors */}
        <div style={{ display: 'flex', gap: 6 }}>
          {cards.map((_, i) => {
            const mastery = getMastery(i);
            let bg: string;
            if (mastery === 2) bg = '#22c55e';
            else if (mastery === 1) bg = '#f59e0b';
            else if (reviewed.has(i)) bg = 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
            else if (i === currentIdx) bg = '#8b5cf6';
            else bg = 'rgba(30,45,61,0.1)';

            return (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                style={{
                  width: i === currentIdx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: bg,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            );
          })}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          disabled={currentIdx === cards.length - 1}
          style={{
            padding: '10px 16px',
            borderRadius: 10,
            border: 'none',
            background: currentIdx === cards.length - 1
              ? 'rgba(139,92,246,0.1)'
              : 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
            cursor: currentIdx === cards.length - 1 ? 'default' : 'pointer',
            opacity: currentIdx === cards.length - 1 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            color: currentIdx === cards.length - 1 ? '#8b5cf6' : '#fff',
            transition: 'all 0.2s',
            boxShadow: currentIdx === cards.length - 1 ? 'none' : '0 4px 12px rgba(139,92,246,0.25)',
          }}
        >
          Suivante <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
