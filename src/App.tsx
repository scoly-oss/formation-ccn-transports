import { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';
import CertificatePage from './pages/CertificatePage';
import XPNotification from './components/XPNotification';
import LevelUpModal from './components/LevelUpModal';
import BadgeUnlock from './components/BadgeUnlock';
import { LEVELS, BADGES, XP_VALUES, modules, getTotalSections } from './data/modules';

function getLevel(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.xpRequired) current = l;
    else break;
  }
  return current;
}

function getNextLevel(xp: number) {
  for (const l of LEVELS) {
    if (xp < l.xpRequired) return l;
  }
  return null;
}

interface StreakData {
  lastDate: string;
  count: number;
}

function App() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('ccn-completed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [quizScores, setQuizScores] = useState<Record<string, { score: number; total: number }>>(() => {
    const saved = localStorage.getItem('ccn-quizzes');
    return saved ? JSON.parse(saved) : {};
  });

  const [xp, setXP] = useState<number>(() => {
    const saved = localStorage.getItem('ccn-xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('ccn-badges');
    return saved ? JSON.parse(saved) : [];
  });

  const [flashcardsReviewed, setFlashcardsReviewed] = useState<number>(() => {
    const saved = localStorage.getItem('ccn-flashcards');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [scenariosCompleted, setScenariosCompleted] = useState<number>(() => {
    const saved = localStorage.getItem('ccn-scenarios');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [streak, setStreak] = useState<StreakData>(() => {
    const saved = localStorage.getItem('ccn-streak');
    return saved ? JSON.parse(saved) : { lastDate: '', count: 0 };
  });

  // Notification states
  const [xpNotif, setXPNotif] = useState<{ show: boolean; amount: number; reason: string }>({ show: false, amount: 0, reason: '' });
  const [levelUpModal, setLevelUpModal] = useState<{ show: boolean; level: number; name: string }>({ show: false, level: 0, name: '' });
  const [badgeNotif, setBadgeNotif] = useState<{ show: boolean; badge: { title: string; icon: string; description: string } | null }>({ show: false, badge: null });

  // Persist
  useEffect(() => { localStorage.setItem('ccn-completed', JSON.stringify([...completedSections])); }, [completedSections]);
  useEffect(() => { localStorage.setItem('ccn-quizzes', JSON.stringify(quizScores)); }, [quizScores]);
  useEffect(() => { localStorage.setItem('ccn-xp', String(xp)); }, [xp]);
  useEffect(() => { localStorage.setItem('ccn-badges', JSON.stringify(earnedBadges)); }, [earnedBadges]);
  useEffect(() => { localStorage.setItem('ccn-flashcards', String(flashcardsReviewed)); }, [flashcardsReviewed]);
  useEffect(() => { localStorage.setItem('ccn-scenarios', String(scenariosCompleted)); }, [scenariosCompleted]);
  useEffect(() => { localStorage.setItem('ccn-streak', JSON.stringify(streak)); }, [streak]);

  // Streak management
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (streak.lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streak.lastDate === yesterday) {
      setStreak({ lastDate: today, count: streak.count + 1 });
    } else if (streak.lastDate !== today) {
      setStreak({ lastDate: today, count: 1 });
    }
  }, []);

  // XP notification queue
  const xpQueueRef = useRef<{ amount: number; reason: string }[]>([]);
  const processingRef = useRef(false);

  const processXPQueue = useCallback(() => {
    if (processingRef.current || xpQueueRef.current.length === 0) return;
    processingRef.current = true;
    const next = xpQueueRef.current.shift()!;
    setXPNotif({ show: true, amount: next.amount, reason: next.reason });
  }, []);

  const addXP = useCallback((amount: number, reason: string) => {
    setXP(prev => {
      const newXP = prev + amount;
      const oldLevel = getLevel(prev);
      const newLevel = getLevel(newXP);
      if (newLevel.level > oldLevel.level) {
        setTimeout(() => {
          setLevelUpModal({ show: true, level: newLevel.level, name: newLevel.name });
        }, 800);
      }
      return newXP;
    });
    xpQueueRef.current.push({ amount, reason });
    processXPQueue();
  }, [processXPQueue]);

  // Check badges
  const checkBadges = useCallback(() => {
    const quizPerfectScores = Object.values(quizScores).filter(q => q.score === q.total).length;
    const modulesCompleted = modules.filter(m =>
      m.sections.every(s => completedSections.has(s.id))
    ).length;

    const stats = {
      xp,
      level: getLevel(xp).level,
      completedSections: completedSections.size,
      totalSections: getTotalSections(),
      quizPerfectScores,
      flashcardsReviewed,
      scenariosCompleted,
      streak: streak.count,
      modulesCompleted,
    };

    for (const badge of BADGES) {
      if (!earnedBadges.includes(badge.id) && badge.condition(stats)) {
        setEarnedBadges(prev => [...prev, badge.id]);
        setTimeout(() => {
          setBadgeNotif({ show: true, badge: { title: badge.title, icon: badge.icon, description: badge.description } });
        }, 600);
        break;
      }
    }
  }, [xp, completedSections, quizScores, flashcardsReviewed, scenariosCompleted, streak.count, earnedBadges]);

  useEffect(() => { checkBadges(); }, [xp, completedSections.size, flashcardsReviewed, scenariosCompleted]);

  const handleCompleteSection = useCallback((sectionId: string) => {
    if (completedSections.has(sectionId)) return;
    setCompletedSections(prev => new Set([...prev, sectionId]));
    addXP(XP_VALUES.SECTION_COMPLETE, 'Section completee');

    const mod = modules.find(m => m.sections.some(s => s.id === sectionId));
    if (mod) {
      const othersDone = mod.sections.filter(s => s.id !== sectionId).every(s => completedSections.has(s.id));
      if (othersDone) {
        setTimeout(() => addXP(XP_VALUES.MODULE_COMPLETE, 'Module termine !'), 1200);
      }
    }
  }, [completedSections, addXP]);

  const handleQuizComplete = useCallback((sectionId: string, score: number, total: number) => {
    setQuizScores(prev => ({ ...prev, [sectionId]: { score, total } }));
    const points = score * XP_VALUES.QUIZ_CORRECT;
    addXP(points, `Quiz: ${score}/${total}`);
    if (score === total) {
      setTimeout(() => addXP(XP_VALUES.QUIZ_PERFECT, 'Score parfait !'), 800);
    }
  }, [addXP]);

  const handleFlashcardReview = useCallback((count: number) => {
    setFlashcardsReviewed(count);
  }, []);

  const handleFlashcardXP = useCallback(() => {
    addXP(XP_VALUES.FLASHCARD_REVIEW, 'Flashcard revue');
  }, [addXP]);

  const handleScenarioComplete = useCallback((correct: boolean, xpBonus: number) => {
    if (correct) {
      setScenariosCompleted(prev => prev + 1);
      addXP(XP_VALUES.SCENARIO_CORRECT + xpBonus, 'Scenario reussi');
    } else {
      addXP(10, 'Tentative scenario');
    }
  }, [addXP]);

  const currentLevel = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const xpProgress = nextLevel
    ? ((xp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
    : 100;

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb' }}>
        <Sidebar
          completedSections={completedSections}
          xp={xp}
          level={currentLevel.level}
          levelName={currentLevel.name}
          xpProgress={xpProgress}
          streak={streak.count}
          earnedBadges={earnedBadges}
        />
        <main style={{ marginLeft: 280, flex: 1, minHeight: '100vh' }}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  completedSections={completedSections}
                  quizScores={quizScores}
                  xp={xp}
                  level={currentLevel.level}
                  levelName={currentLevel.name}
                  xpProgress={xpProgress}

                  streak={streak.count}
                  earnedBadges={earnedBadges}
                  flashcardsReviewed={flashcardsReviewed}
                  scenariosCompleted={scenariosCompleted}
                />
              }
            />
            <Route
              path="/module/:moduleId"
              element={
                <ModulePage
                  completedSections={completedSections}
                  onCompleteSection={handleCompleteSection}
                  quizScores={quizScores}
                  onQuizComplete={handleQuizComplete}
                  onFlashcardReview={handleFlashcardReview}
                  onFlashcardXP={handleFlashcardXP}
                  onScenarioComplete={handleScenarioComplete}
                />
              }
            />
            <Route
              path="/certificat"
              element={
                <CertificatePage
                  completedSections={completedSections}
                  quizScores={quizScores}
                  xp={xp}
                  level={currentLevel.level}
                  levelName={currentLevel.name}
                />
              }
            />
          </Routes>
        </main>
      </div>

      <XPNotification
        show={xpNotif.show}
        amount={xpNotif.amount}
        reason={xpNotif.reason}
        onDone={() => {
          setXPNotif({ show: false, amount: 0, reason: '' });
          processingRef.current = false;
          processXPQueue();
        }}
      />
      <LevelUpModal
        show={levelUpModal.show}
        level={levelUpModal.level}
        levelName={levelUpModal.name}
        onClose={() => setLevelUpModal({ show: false, level: 0, name: '' })}
      />
      <BadgeUnlock
        show={badgeNotif.show}
        badge={badgeNotif.badge}
        onDone={() => setBadgeNotif({ show: false, badge: null })}
      />
    </BrowserRouter>
  );
}

export default App;
