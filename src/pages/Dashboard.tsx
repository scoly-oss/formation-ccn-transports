import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules, getTotalSections, getTotalQuestions } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import Avatar from '../components/Avatar';
import ProgressBar from '../components/ProgressBar';
import { Award, BookOpen, HelpCircle, TrendingUp } from 'lucide-react';

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
    ? "Bienvenue dans la formation CCN Transports Routiers ! Je suis Sofiane, et je serai votre formateur. Choisissez un module pour commencer."
    : completedCount < totalSections / 2
    ? `Vous avez complété ${completedCount} section${completedCount > 1 ? 's' : ''}. Continuez comme ça !`
    : completedCount < totalSections
    ? `Super progression ! Plus que ${totalSections - completedCount} section${totalSections - completedCount > 1 ? 's' : ''} avant la fin.`
    : "Bravo ! Vous avez terminé l'ensemble de la formation. Vous maîtrisez maintenant la CCN Transports Routiers !";

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1100 }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32 }}
      >
        <Avatar message={greeting} size="lg" />
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        marginBottom: 36,
      }}>
        {[
          { icon: BookOpen, label: 'Modules', value: modules.length, color: '#e8842c' },
          { icon: TrendingUp, label: 'Progression', value: `${Math.round((completedCount / totalSections) * 100)}%`, color: '#2a3d50' },
          { icon: HelpCircle, label: 'Quiz réussis', value: totalQuizAttempted > 0 ? `${totalQuizScore}/${totalQuizAttempted}` : '—', color: '#1e2d3d' },
          { icon: Award, label: 'Sections complétées', value: `${completedCount}/${totalSections}`, color: '#e8842c' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '20px 22px',
              border: '1px solid #e2e6ec',
            }}
          >
            <stat.icon size={20} color={stat.color} />
            <div style={{ fontSize: 28, fontWeight: 800, color: '#1e2d3d', margin: '8px 0 4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: '#2a3d50', opacity: 0.7 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginBottom: 32 }}>
        <ProgressBar
          value={completedCount}
          max={totalSections}
          label="Progression globale"
        />
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e2d3d', marginBottom: 20 }}>
        Modules de formation
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300, 1fr))',
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
    </div>
  );
}
