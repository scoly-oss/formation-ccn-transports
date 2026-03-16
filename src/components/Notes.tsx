import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StickyNote, Save, Trash2 } from 'lucide-react';

interface NotesProps {
  sectionId: string;
}

export default function Notes({ sectionId }: NotesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const storageKey = `ccn-notes-${sectionId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setText(saved || '');
  }, [sectionId]);

  const handleSave = () => {
    if (text.trim()) {
      localStorage.setItem(storageKey, text);
    } else {
      localStorage.removeItem(storageKey);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleClear = () => {
    setText('');
    localStorage.removeItem(storageKey);
  };

  const hasNote = text.trim().length > 0;

  return (
    <div style={{ marginTop: 32 }}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setTimeout(() => textareaRef.current?.focus(), 100);
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', width: '100%',
          borderRadius: 'var(--radius-lg)',
          border: `1px solid ${hasNote ? 'rgba(245,158,11,0.2)' : 'var(--border)'}`,
          background: hasNote ? 'rgba(245,158,11,0.04)' : 'var(--white)',
          cursor: 'pointer', fontSize: 14, fontWeight: 600,
          color: 'var(--navy)', textAlign: 'left',
          transition: 'all 0.2s',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: hasNote ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'rgba(30,45,61,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <StickyNote size={16} color={hasNote ? '#fff' : 'var(--text-light)'} />
        </div>
        <span style={{ flex: 1 }}>
          {hasNote ? 'Mes notes' : 'Ajouter une note'}
          {hasNote && !isOpen && (
            <span style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 400, marginLeft: 8 }}>
              ({text.length} car.)
            </span>
          )}
        </span>
        <span style={{ fontSize: 18, color: 'var(--text-light)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          ▾
        </span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{
            marginTop: 8,
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 20,
            overflow: 'hidden',
          }}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Prenez des notes sur cette section... (sauvegardees localement)"
            style={{
              width: '100%', minHeight: 120, resize: 'vertical',
              border: '1px solid var(--border)', borderRadius: 10,
              padding: '14px 16px', fontSize: 14, lineHeight: 1.7,
              color: 'var(--navy)', fontFamily: 'inherit',
              outline: 'none', background: 'rgba(30,45,61,0.01)',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(232,132,44,0.3)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
            {hasNote && (
              <button
                onClick={handleClear}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 8,
                  border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)',
                  color: '#ef4444', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={13} /> Effacer
              </button>
            )}
            <button
              onClick={handleSave}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 8,
                border: 'none', background: saved ? '#22c55e' : 'var(--gradient-orange)',
                color: '#fff', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: saved ? '0 2px 8px rgba(34,197,94,0.25)' : 'var(--shadow-orange)',
              }}
            >
              <Save size={13} /> {saved ? 'Sauvegarde !' : 'Sauvegarder'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
