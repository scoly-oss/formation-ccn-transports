import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { modules } from '../data/modules';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  show: boolean;
  onClose: () => void;
}

interface SearchResult {
  moduleId: string;
  moduleTitle: string;
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
  excerpt: string;
  type: 'content' | 'keyPoint' | 'flashcard' | 'quiz';
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\|/g, ' ').replace(/[-]+/g, ' ');
}

function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark style="background:#fde68a;padding:1px 2px;border-radius:3px;font-weight:600">$1</mark>');
}

export default function SearchModal({ show, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [show]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (show) onClose();
      }
      if (e.key === 'Escape' && show) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [show, onClose]);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    for (const mod of modules) {
      for (let si = 0; si < mod.sections.length; si++) {
        const sec = mod.sections[si];

        // Search in content
        const plainContent = stripMarkdown(sec.content);
        const idx = plainContent.toLowerCase().indexOf(q);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(plainContent.length, idx + query.length + 80);
          found.push({
            moduleId: mod.id, moduleTitle: mod.title,
            sectionId: sec.id, sectionTitle: sec.title, sectionIndex: si,
            excerpt: (start > 0 ? '...' : '') + plainContent.slice(start, end) + (end < plainContent.length ? '...' : ''),
            type: 'content',
          });
        }

        // Search in key points
        if (sec.keyPoints) {
          for (const kp of sec.keyPoints) {
            if (kp.toLowerCase().includes(q)) {
              found.push({
                moduleId: mod.id, moduleTitle: mod.title,
                sectionId: sec.id, sectionTitle: sec.title, sectionIndex: si,
                excerpt: kp,
                type: 'keyPoint',
              });
              break;
            }
          }
        }

        // Search in flashcards
        if (sec.flashcards) {
          for (const fc of sec.flashcards) {
            if (fc.front.toLowerCase().includes(q) || fc.back.toLowerCase().includes(q)) {
              found.push({
                moduleId: mod.id, moduleTitle: mod.title,
                sectionId: sec.id, sectionTitle: sec.title, sectionIndex: si,
                excerpt: `Q: ${fc.front} — R: ${fc.back}`,
                type: 'flashcard',
              });
              break;
            }
          }
        }

        // Search in quiz
        if (sec.quiz) {
          for (const qq of sec.quiz) {
            if (qq.question.toLowerCase().includes(q) || qq.explanation.toLowerCase().includes(q)) {
              found.push({
                moduleId: mod.id, moduleTitle: mod.title,
                sectionId: sec.id, sectionTitle: sec.title, sectionIndex: si,
                excerpt: qq.question,
                type: 'quiz',
              });
              break;
            }
          }
        }
      }
    }

    return found.slice(0, 20);
  }, [query]);

  const handleSelect = (r: SearchResult) => {
    onClose();
    navigate(`/module/${r.moduleId}?section=${r.sectionIndex}`);
  };

  const typeLabels: Record<string, { label: string; color: string }> = {
    content: { label: 'Contenu', color: 'var(--orange)' },
    keyPoint: { label: 'Point cle', color: '#22c55e' },
    flashcard: { label: 'Flashcard', color: '#8b5cf6' },
    quiz: { label: 'Quiz', color: '#f59e0b' },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(30,45,61,0.5)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 120,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: 600, maxHeight: '70vh',
              background: '#fff', borderRadius: 20,
              boxShadow: '0 24px 80px rgba(30,45,61,0.2)',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Search input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 20px', borderBottom: '1px solid var(--border)',
            }}>
              <Search size={20} color="var(--text-light)" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher dans la formation..."
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 16, fontWeight: 500, color: 'var(--navy)',
                  background: 'transparent',
                }}
              />
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(30,45,61,0.06)', border: 'none',
                  width: 28, height: 28, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={14} color="var(--text-light)" />
              </button>
            </div>

            {/* Results */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
              {query.length < 2 ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-light)', fontSize: 14 }}>
                  Tapez au moins 2 caracteres pour rechercher
                </div>
              ) : results.length === 0 ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-light)', fontSize: 14 }}>
                  Aucun resultat pour "{query}"
                </div>
              ) : (
                results.map((r, i) => {
                  const tl = typeLabels[r.type];
                  return (
                    <div
                      key={`${r.sectionId}-${r.type}-${i}`}
                      onClick={() => handleSelect(r)}
                      style={{
                        padding: '12px 20px', cursor: 'pointer',
                        borderBottom: '1px solid rgba(30,45,61,0.04)',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(232,132,44,0.04)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)' }}>
                          {r.moduleTitle}
                        </span>
                        <ArrowRight size={10} color="var(--text-light)" />
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          {r.sectionTitle}
                        </span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: tl.color,
                          background: `${tl.color}12`, padding: '2px 8px', borderRadius: 20,
                          marginLeft: 'auto',
                        }}>
                          {tl.label}
                        </span>
                      </div>
                      <div
                        style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}
                        dangerouslySetInnerHTML={{ __html: highlightMatch(r.excerpt, query) }}
                      />
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '10px 20px', borderTop: '1px solid var(--border)',
              display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-light)',
            }}>
              <span><kbd style={{ padding: '2px 6px', background: 'rgba(30,45,61,0.06)', borderRadius: 4, fontSize: 10 }}>ESC</kbd> fermer</span>
              <span><kbd style={{ padding: '2px 6px', background: 'rgba(30,45,61,0.06)', borderRadius: 4, fontSize: 10 }}>⌘K</kbd> ouvrir/fermer</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
