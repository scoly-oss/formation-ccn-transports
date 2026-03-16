import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules, getTotalSections, BADGES } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import ProgressBar from '../components/ProgressBar';
import { Award, BookOpen, Target, Zap, Flame, Layers, Lightbulb, GraduationCap } from 'lucide-react';

interface DashboardProps {
  completedSections: Set<string>;
  quizScores: Record<string, { score: number; total: number }>;
  xp: number;
  level: number;
  levelName: string;
  xpProgress: number;

  streak: number;
  earnedBadges: string[];
  flashcardsReviewed: number;
  scenariosCompleted: number;
}

export default function Dashboard({
  completedSections, quizScores, xp, level, levelName, xpProgress,
  streak, earnedBadges, flashcardsReviewed, scenariosCompleted
}: DashboardProps) {
  const navigate = useNavigate();
  const totalSections = getTotalSections();
  const completedCount = completedSections.size;
  const totalQuizScore = Object.values(quizScores).reduce((a, b) => a + b.score, 0);
  const totalQuizAttempted = Object.values(quizScores).reduce((a, b) => a + b.total, 0);
  const allDone = completedCount >= totalSections;

  const getModuleProgress = (moduleId: string) => {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return 0;
    const done = mod.sections.filter(s => completedSections.has(s.id)).length;
    return done / mod.sections.length;
  };

  const greeting = completedCount === 0
    ? "Bienvenue dans la formation CCN Transports Routiers ! Je suis Sofiane, et je serai votre formateur tout au long de ce parcours. Choisissez un module pour demarrer."
    : completedCount < totalSections / 2
    ? `Vous avez complete ${completedCount} section${completedCount > 1 ? 's' : ''} sur ${totalSections}. Continuez sur cette lancee !`
    : completedCount < totalSections
    ? `Super progression ! Plus que ${totalSections - completedCount} section${totalSections - completedCount > 1 ? 's' : ''} avant la fin.`
    : "Bravo ! Vous avez termine l'ensemble de la formation. Vous maitrisez maintenant la CCN Transports Routiers !";

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, #2a3f52 50%, #1e2d3d 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 40px',
          marginBottom: 28,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -60, right: -40,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(232,132,44,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, right: 80,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(232,132,44,0.05)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                width: 80, height: 80, minWidth: 80,
                borderRadius: '50%', overflow: 'hidden',
                background: 'var(--gradient-orange)',
                padding: 3,
                boxShadow: '0 4px 24px rgba(232,132,44,0.35)',
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                <img
                  src={`${import.meta.env.BASE_URL}avatar-sofiane.jpg`}
                  alt="Sofiane Coly"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                />
              </div>
            </motion.div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontSize: 13, fontWeight: 700,
                  background: 'var(--gradient-orange)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Sofiane Coly
                </span>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 11, color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '3px 10px', borderRadius: 20,
                }}>
                  <Zap size={10} /> Formateur
                </span>
              </div>
              <p style={{
                fontSize: 16, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.85)',
                margin: 0, maxWidth: 600,
              }}>
                {greeting}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gamification row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {/* XP Card */}
        <div style={{
          background: 'linear-gradient(135deg, #e8842c 0%, #F5A623 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '22px 24px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Zap size={16} />
            <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.9, textTransform: 'uppercase', letterSpacing: 0.5 }}>Experience</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{xp}</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>XP — Niveau {level} ({levelName})</div>
          <div style={{ marginTop: 10, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${Math.min(xpProgress, 100)}%`, background: '#fff', borderRadius: 2, transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* Streak Card */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '22px 24px',
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Flame size={16} color="#f59e0b" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Streak</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {streak}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            jour{streak > 1 ? 's' : ''} consecutif{streak > 1 ? 's' : ''}
          </div>
        </div>

        {/* Badges Card */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '22px 24px',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Award size={16} color="#8b5cf6" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Badges</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {earnedBadges.length}/{BADGES.length}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
            {BADGES.slice(0, 6).map(b => (
              <span key={b.id} style={{
                fontSize: 18,
                filter: earnedBadges.includes(b.id) ? 'none' : 'grayscale(1) opacity(0.15)',
              }}>
                {b.icon}
              </span>
            ))}
            {BADGES.length > 6 && (
              <span style={{ fontSize: 12, color: 'var(--text-light)', alignSelf: 'center' }}>+{BADGES.length - 6}</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        marginBottom: 28,
      }}>
        {[
          { icon: BookOpen, label: 'Sections', value: `${completedCount}/${totalSections}`, sub: 'completees', grad: 'var(--gradient-orange)' },
          { icon: Target, label: 'Quiz', value: totalQuizAttempted > 0 ? `${totalQuizScore}/${totalQuizAttempted}` : '—', sub: totalQuizAttempted > 0 ? 'bonnes reponses' : 'aucun quiz', grad: 'linear-gradient(135deg, #1e2d3d, #2a3f52)' },
          { icon: Layers, label: 'Flashcards', value: flashcardsReviewed, sub: 'revues', grad: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
          { icon: Lightbulb, label: 'Scenarios', value: scenariosCompleted, sub: 'reussis', grad: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px 20px',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: stat.grad,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
              boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
            }}>
              <stat.icon size={20} color="#fff" />
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          border: '1px solid var(--border)',
          marginBottom: 36,
        }}
      >
        <ProgressBar value={completedCount} max={totalSections} label="Progression globale" height={12} />
      </motion.div>

      {/* Certificate CTA */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'linear-gradient(135deg, var(--navy) 0%, #2a3f52 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px 36px',
            marginBottom: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-lg)',
          }}
          onClick={() => navigate('/certificat')}
          whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(30,45,61,0.2)' }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'var(--gradient-orange)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(232,132,44,0.35)',
            flexShrink: 0,
          }}>
            <GraduationCap size={30} color="#fff" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              Obtenez votre certificat
            </h3>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              Vous avez termine la formation ! Generez votre certificat de reussite.
            </p>
          </div>
        </motion.div>
      )}

      {/* Modules heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em', margin: 0 }}>
          Modules de formation
        </h2>
        <span style={{
          fontSize: 12, fontWeight: 700, color: 'var(--text-light)',
          background: 'rgba(30,45,61,0.05)', padding: '4px 12px', borderRadius: 20,
        }}>
          {modules.length} chapitres
        </span>
      </motion.div>

      {/* Module grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 20,
      }}>
        {modules.map((mod, i) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            index={i}
            progress={getModuleProgress(mod.id)}
            onClick={() => navigate(`/module/${mod.id}`)}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ textAlign: 'center', padding: '48px 0 24px', fontSize: 13, color: 'var(--text-light)' }}
      >
        Formation CCN Transports Routiers — Concue par <strong style={{ color: 'var(--orange)' }}>Sofiane Coly</strong>
      </motion.div>
    </div>
  );
}
