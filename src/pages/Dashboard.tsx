import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules, getTotalSections, getTotalQuestions } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import Avatar from '../components/Avatar';
import ProgressBar from '../components/ProgressBar';
import { Award, BookOpen, HelpCircle, TrendingUp, Zap, Target } from 'lucide-react';

interface DashboardProps {
  completedSections: Set<string>;
  quizScores: Record<string, { score: number; total: number }>;
}

export default function Dashboard({ completedSections, quizScores }: DashboardProps) {
  const navigate = useNavigate();
  const totalSections = getTotalSections();
  const totalQuestions = getTotalQuestions();
  const completedCount = completedSections.size;

  const totalQuizScore = Object.values(quizScores).reduce((a, b) => a + b.score, 0);
  const totalQuizAttempted = Object.values(quizScores).reduce((a, b) => a + b.total, 0);

  const getModuleProgress = (moduleId: string) => {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return 0;
    const done = mod.sections.filter(s => completedSections.has(s.id)).length;
    return done / mod.sections.length;
  };

  const greeting = completedCount === 0
    ? "Bienvenue dans la formation CCN Transports Routiers ! Je suis Sofiane, et je serai votre formateur tout au long de ce parcours. Choisissez un module pour démarrer."
    : completedCount < totalSections / 2
    ? `Vous avez complété ${completedCount} section${completedCount > 1 ? 's' : ''} sur ${totalSections}. Continuez sur cette lancée !`
    : completedCount < totalSections
    ? `Super progression ! Plus que ${totalSections - completedCount} section${totalSections - completedCount > 1 ? 's' : ''} avant la fin.`
    : "Bravo ! Vous avez terminé l'ensemble de la formation. Vous maîtrisez maintenant la CCN Transports Routiers !";

  const stats = [
    {
      icon: BookOpen,
      label: 'Modules',
      value: modules.length,
      sublabel: 'chapitres',
      gradient: 'linear-gradient(135deg, #e8842c 0%, #F5A623 100%)',
    },
    {
      icon: Target,
      label: 'Sections',
      value: `${completedCount}/${totalSections}`,
      sublabel: 'complétées',
      gradient: 'linear-gradient(135deg, #1e2d3d 0%, #2a3f52 100%)',
    },
    {
      icon: TrendingUp,
      label: 'Progression',
      value: `${Math.round((completedCount / totalSections) * 100)}%`,
      sublabel: 'du parcours',
      gradient: 'linear-gradient(135deg, #e8842c 0%, #F5A623 100%)',
    },
    {
      icon: Award,
      label: 'Quiz',
      value: totalQuizAttempted > 0 ? `${totalQuizScore}/${totalQuizAttempted}` : '—',
      sublabel: totalQuizAttempted > 0 ? 'bonnes réponses' : 'aucun quiz',
      gradient: 'linear-gradient(135deg, #1e2d3d 0%, #2a3f52 100%)',
    },
  ];

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
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(232,132,44,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -40,
          right: 80,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(232,132,44,0.05)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                width: 80,
                height: 80,
                minWidth: 80,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--gradient-orange)',
                padding: 3,
                boxShadow: '0 4px 24px rgba(232,132,44,0.35)',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
              }}>
                <img
                  src={`${import.meta.env.BASE_URL}avatar-sofiane.jpg`}
                  alt="Sofiane Coly"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                />
              </div>
            </motion.div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  background: 'var(--gradient-orange)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Sofiane Coly
                </span>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '3px 10px',
                  borderRadius: 20,
                }}>
                  <Zap size={10} /> Formateur
                </span>
              </div>
              <p style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.85)',
                margin: 0,
                maxWidth: 600,
              }}>
                {greeting}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        marginBottom: 32,
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px 22px',
              border: '1px solid var(--border)',
              transition: 'all 0.3s',
              cursor: 'default',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: stat.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              boxShadow: i % 2 === 0 ? '0 4px 12px rgba(232,132,44,0.2)' : '0 4px 12px rgba(30,45,61,0.15)',
            }}>
              <stat.icon size={22} color="#fff" />
            </div>
            <div style={{
              fontSize: 32,
              fontWeight: 900,
              color: 'var(--navy)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 4,
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
              {stat.sublabel}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          border: '1px solid var(--border)',
          marginBottom: 40,
        }}
      >
        <ProgressBar
          value={completedCount}
          max={totalSections}
          label="Progression globale"
          height={12}
        />
      </motion.div>

      {/* Modules heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <h2 style={{
          fontSize: 24,
          fontWeight: 800,
          color: 'var(--navy)',
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Modules de formation
        </h2>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--text-light)',
          background: 'rgba(30,45,61,0.05)',
          padding: '4px 12px',
          borderRadius: 20,
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
        style={{
          textAlign: 'center',
          padding: '48px 0 24px',
          fontSize: 13,
          color: 'var(--text-light)',
        }}
      >
        Formation CCN Transports Routiers — Conçue par <strong style={{ color: 'var(--orange)' }}>Sofiane Coly</strong>
      </motion.div>
    </div>
  );
}
