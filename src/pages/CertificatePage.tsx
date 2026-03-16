import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { modules, getTotalSections } from '../data/modules';
import { GraduationCap, Award, ArrowLeft, Download } from 'lucide-react';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface CertificatePageProps {
  completedSections: Set<string>;
  quizScores: Record<string, { score: number; total: number }>;
  xp: number;
  level: number;
  levelName: string;
}

export default function CertificatePage({ completedSections, quizScores, xp, level, levelName }: CertificatePageProps) {
  const navigate = useNavigate();
  const totalSections = getTotalSections();
  const pct = Math.round((completedSections.size / totalSections) * 100);
  const totalQuizScore = Object.values(quizScores).reduce((a, b) => a + b.score, 0);
  const totalQuizTotal = Object.values(quizScores).reduce((a, b) => a + b.total, 0);
  const quizPct = totalQuizTotal > 0 ? Math.round((totalQuizScore / totalQuizTotal) * 100) : 0;
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const certRef = useRef<HTMLDivElement>(null);
  const confettiFired = useRef(false);

  useEffect(() => {
    if (!confettiFired.current && pct >= 100) {
      confettiFired.current = true;
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e8842c', '#F5A623', '#1e2d3d', '#22c55e', '#8b5cf6'],
        });
      }, 500);
    }
  }, [pct]);

  if (pct < 100) {
    return (
      <div style={{ padding: '80px 48px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <GraduationCap size={64} color="var(--text-light)" style={{ marginBottom: 24, opacity: 0.3 }} />
        <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 12 }}>
          Certificat non disponible
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
          Vous devez completer 100% de la formation pour obtenir votre certificat.
          Progression actuelle : <strong style={{ color: 'var(--orange)' }}>{pct}%</strong>
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '14px 28px', borderRadius: 12, border: 'none',
            background: 'var(--gradient-orange)', color: '#fff',
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
            boxShadow: 'var(--shadow-orange)',
          }}
        >
          Continuer la formation
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900, margin: '0 auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none',
          color: 'var(--text-secondary)', fontSize: 14,
          cursor: 'pointer', padding: 0, marginBottom: 32, fontWeight: 600,
        }}
      >
        <ArrowLeft size={16} /> Retour au tableau de bord
      </button>

      {/* Certificate */}
      <motion.div
        ref={certRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: '#fff',
          borderRadius: 24,
          border: '3px solid var(--navy)',
          padding: '60px 64px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(30,45,61,0.12)',
        }}
      >
        {/* Corner decorations */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 80, height: 80,
          borderRight: '3px solid var(--orange)', borderBottom: '3px solid var(--orange)',
          borderBottomRightRadius: 20,
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 80, height: 80,
          borderLeft: '3px solid var(--orange)', borderBottom: '3px solid var(--orange)',
          borderBottomLeftRadius: 20,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: 80, height: 80,
          borderRight: '3px solid var(--orange)', borderTop: '3px solid var(--orange)',
          borderTopRightRadius: 20,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: 80, height: 80,
          borderLeft: '3px solid var(--orange)', borderTop: '3px solid var(--orange)',
          borderTopLeftRadius: 20,
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--gradient-orange)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(232,132,44,0.3)',
          }}>
            <GraduationCap size={36} color="#fff" />
          </div>

          <div style={{
            fontSize: 14, fontWeight: 700, color: 'var(--orange)',
            textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8,
          }}>
            Certificat de reussite
          </div>

          <h1 style={{
            fontSize: 36, fontWeight: 900, color: 'var(--navy)',
            letterSpacing: '-0.03em', margin: '0 0 4px',
          }}>
            Formation CCN
          </h1>
          <h2 style={{
            fontSize: 22, fontWeight: 600, color: 'var(--text-secondary)',
            margin: 0,
          }}>
            Transports Routiers (IDCC 16)
          </h2>
        </div>

        {/* Divider */}
        <div style={{
          width: 80, height: 3, background: 'var(--gradient-orange)',
          margin: '0 auto 32px', borderRadius: 2,
        }} />

        {/* Content */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
            Ce certificat atteste que le participant a suivi avec succes
            l'integralite de la formation sur la Convention Collective Nationale
            des Transports Routiers.
          </p>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
          marginBottom: 40,
        }}>
          {[
            { label: 'Modules', value: modules.length, icon: '📚' },
            { label: 'Sections', value: `${completedSections.size}/${totalSections}`, icon: '✅' },
            { label: 'Quiz', value: `${quizPct}%`, icon: '🎯' },
            { label: 'XP', value: xp, icon: '⚡' },
          ].map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '16px 12px',
              background: 'rgba(30,45,61,0.03)', borderRadius: 12,
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level badge */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12, marginBottom: 36,
          padding: '14px 24px',
          background: 'linear-gradient(135deg, rgba(232,132,44,0.06), rgba(245,166,35,0.03))',
          borderRadius: 16,
          border: '1px solid rgba(232,132,44,0.15)',
          width: 'fit-content', margin: '0 auto 36px',
        }}>
          <Award size={24} color="#e8842c" />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)' }}>Niveau {level} — {levelName}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{xp} points d'experience accumules</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          paddingTop: 28, borderTop: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 4 }}>Date</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{today}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
              background: 'var(--gradient-orange)', padding: 2, margin: '0 auto 8px',
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                <img
                  src={`${import.meta.env.BASE_URL}avatar-sofiane.jpg`}
                  alt="Sofiane Coly"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                />
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>Sofiane Coly</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Formateur</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 4 }}>Formation</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>CCN Transports Routiers</div>
          </div>
        </div>
      </motion.div>

      {/* Export PDF button */}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(232,132,44,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.print()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 32px', borderRadius: 14, border: 'none',
            background: 'var(--gradient-orange)', color: '#fff',
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            boxShadow: 'var(--shadow-orange)',
            marginBottom: 16,
          }}
        >
          <Download size={18} /> Telecharger en PDF
        </motion.button>
        <div style={{ fontSize: 13, color: 'var(--text-light)' }}>
          Felicitations pour avoir termine cette formation !
        </div>
      </div>
    </div>
  );
}
