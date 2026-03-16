import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Layers, CheckCircle2 } from 'lucide-react';
import type { Flashcard as FlashcardType } from '../data/modules';

interface FlashcardProps {
  cards: FlashcardType[];
  onReview: (count: number) => void;
}

export default function FlashcardDeck({ cards, onReview }: FlashcardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState(0);

  const card = cards[currentIdx];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !reviewed.has(currentIdx)) {
      const newReviewed = new Set(reviewed);
      newReviewed.add(currentIdx);
      setReviewed(newReviewed);
      onReview(newReviewed.size);
    }
  };

  const goTo = (idx: number) => {
    setDirection(idx > currentIdx ? 1 : -1);
    setIsFlipped(false);
    setTimeout(() => setCurrentIdx(idx), 50);
  };

  const next = () => {
    if (currentIdx < cards.length - 1) goTo(currentIdx + 1);
  };

  const prev = () => {
    if (currentIdx > 0) goTo(currentIdx - 1);
  };

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
        <div>
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
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        style={{
          perspective: 1000,
          cursor: 'pointer',
          height: 220,
          marginBottom: 16,
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

            {/* Reviewed check */}
            {reviewed.has(currentIdx) && (
              <CheckCircle2
                size={16}
                color="#22c55e"
                style={{ position: 'absolute', bottom: 16, right: 16 }}
              />
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

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6 }}>
          {cards.map((_, i) => (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              style={{
                width: i === currentIdx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: reviewed.has(i)
                  ? 'linear-gradient(135deg, #8b5cf6, #a78bfa)'
                  : i === currentIdx
                  ? '#8b5cf6'
                  : 'rgba(30,45,61,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
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
