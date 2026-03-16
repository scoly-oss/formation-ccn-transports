import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { modules } from '../data/modules';
import Quiz from '../components/Quiz';
import Avatar from '../components/Avatar';
import FlashcardDeck from '../components/Flashcard';
import ScenarioChallenge from '../components/ScenarioChallenge';
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen, Brain, ArrowRight, Sparkles } from 'lucide-react';

interface ModulePageProps {
  completedSections: Set<string>;
  onCompleteSection: (sectionId: string) => void;
  quizScores: Record<string, { score: number; total: number }>;
  onQuizComplete: (sectionId: string, score: number, total: number) => void;
  onFlashcardReview: (count: number) => void;
  onFlashcardXP: () => void;
  onScenarioComplete: (correct: boolean, xpBonus: number) => void;
}

export default function ModulePage({
  completedSections, onCompleteSection, quizScores, onQuizComplete,
  onFlashcardReview, onFlashcardXP, onScenarioComplete
}: ModulePageProps) {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [scenarioDone, setScenarioDone] = useState<Set<string>>(new Set());
  const flashcardXPGiven = useRef<Set<string>>(new Set());

  const mod = modules.find(m => m.id === moduleId);
  const moduleIndex = modules.findIndex(m => m.id === moduleId);

  useEffect(() => {
    setActiveSectionIdx(0);
    setShowQuiz(false);
  }, [moduleId]);

  if (!mod) {
    return (
      <div style={{ padding: 60, textAlign: 'center' }}>
        <h2 style={{ color: 'var(--navy)', fontWeight: 800 }}>Module non trouve</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: 20, padding: '12px 28px',
            borderRadius: 'var(--radius-sm)', border: 'none',
            background: 'var(--gradient-orange)', color: '#fff',
            fontWeight: 700, cursor: 'pointer',
          }}
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  const section = mod.sections[activeSectionIdx];
  const isCompleted = completedSections.has(section.id);
  const hasQuiz = section.quiz && section.quiz.length > 0;
  const quizDone = quizScores[section.id] !== undefined;
  const completedInModule = mod.sections.filter(s => completedSections.has(s.id)).length;
  const hasFlashcards = section.flashcards && section.flashcards.length > 0;
  const hasScenario = !!section.scenario;
  const scenarioIsDone = scenarioDone.has(section.id);

  const handleMarkComplete = () => onCompleteSection(section.id);
  const handleQuizComplete = (score: number, total: number) => {
    onQuizComplete(section.id, score, total);
    onCompleteSection(section.id);
  };

  const goToSection = (idx: number) => {
    setActiveSectionIdx(idx);
    setShowQuiz(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  const avatarMessages: Record<string, string> = {
    'intro-1': "Commençons par les bases ! La CCN Transports Routiers est un texte essentiel que tout professionnel du secteur doit maitriser.",
    'intro-2': "Comprendre la hierarchie des normes, c'est savoir quel texte prime dans chaque situation. C'est fondamental !",
    'class-1': "Les classifications, c'est le coeur de la convention. Chaque salarie est rattache a un groupe qui determine ses droits.",
    'class-2': "La classification des conducteurs est tres detaillee. Le type de vehicule et les competences font toute la difference.",
    'tt-1': "Le temps de travail dans le transport, c'est un sujet complexe. Les regles sont differentes du droit commun !",
    'tt-2': "Les regles de repos sont strictes et surveillees. Elles protegent la securite des conducteurs et des usagers de la route.",
    'tt-3': "Les heures supplementaires dans le transport ont un regime unique. L'equivalence a 43h est une specificite majeure.",
    'rem-1': "La remuneration, c'est ce qui interesse tout le monde ! Les minima conventionnels sont regulierement revalorises.",
    'rem-2': "Les indemnites de deplacement sont essentielles pour les conducteurs. C'est un element cle de leur remuneration.",
    'rem-3': "La prime d'anciennete recompense la fidelite. Elle est obligatoire et doit figurer sur le bulletin de paie.",
    'ct-1': "La periode d'essai varie selon la categorie. Attention au renouvellement : il faut un accord expres !",
    'ct-2': "Le preavis est un moment important. Les heures de recherche d'emploi sont un droit souvent meconnu.",
    'ct-3': "L'indemnite de licenciement conventionnelle est souvent plus favorable que le legal. Un avantage pour les salaries !",
    'cg-1': "Les jours de conges supplementaires pour anciennete, c'est un vrai plus de la convention collective.",
    'cg-2': "Les conges pour evenements familiaux sont plus genereux que le minimum legal, surtout pour les cadres.",
    'sp-1': "Le chronotachygraphe, c'est le gendarme du transport routier. Son bon usage est essentiel.",
    'sp-2': "Le transport de matieres dangereuses necessite des competences specifiques. La formation ADR est incontournable.",
    'sp-3': "FIMO et FCO : ces formations sont le sesame pour conduire professionnellement. Sans elles, pas de volant !",
    'ss-1': "La sante des conducteurs est une priorite. Le suivi medical renforce protege les conducteurs et les usagers.",
    'ss-2': "La prevention des risques est l'affaire de tous. Le droit de refus du conducteur est un droit fondamental.",
    'rp-1': "Le dialogue social dans le transport a ses particularites. Reunir des conducteurs toujours sur la route, c'est un defi !",
  };

  return (
    <div style={{ display: 'flex', gap: 0, minHeight: '100vh' }}>
      {/* Section sidebar */}
      <div style={{
        width: 280,
        background: 'var(--white)',
        borderRight: '1px solid var(--border)',
        padding: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border)' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none',
              color: 'var(--text-secondary)', fontSize: 13,
              cursor: 'pointer', padding: 0, marginBottom: 16, fontWeight: 500,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <ChevronLeft size={16} /> Tableau de bord
          </button>
          <h3 style={{
            margin: 0, fontSize: 17, color: 'var(--navy)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.3,
          }}>
            {mod.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 500 }}>
              {completedInModule}/{mod.sections.length} sections
            </span>
            <div style={{
              flex: 1, height: 4,
              background: 'rgba(30,45,61,0.06)', borderRadius: 2, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${(completedInModule / mod.sections.length) * 100}%`,
                background: 'var(--gradient-orange)', borderRadius: 2, transition: 'width 0.5s',
              }} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '12px 12px' }}>
          {mod.sections.map((s, idx) => {
            const done = completedSections.has(s.id);
            const active = idx === activeSectionIdx;
            return (
              <div
                key={s.id}
                onClick={() => goToSection(idx)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', cursor: 'pointer',
                  background: active ? 'rgba(232,132,44,0.06)' : 'transparent',
                  borderRadius: 10, transition: 'all 0.2s', marginBottom: 2,
                }}
              >
                {done ? (
                  <CheckCircle2 size={18} color="#22c55e" style={{ flexShrink: 0 }} />
                ) : (
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: `2px solid ${active ? 'var(--orange)' : 'rgba(30,45,61,0.12)'}`,
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {active && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)' }} />
                    )}
                  </div>
                )}
                <span style={{
                  fontSize: 13,
                  color: active ? 'var(--navy)' : 'var(--text-secondary)',
                  fontWeight: active ? 700 : 500,
                  lineHeight: 1.4,
                }}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Interactive elements indicators */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: 1, marginBottom: 8 }}>
            Activites de cette section
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {hasFlashcards && (
              <span style={{
                fontSize: 11, fontWeight: 600, color: '#8b5cf6',
                background: 'rgba(139,92,246,0.08)', padding: '4px 10px', borderRadius: 20,
              }}>Flashcards</span>
            )}
            {hasScenario && (
              <span style={{
                fontSize: 11, fontWeight: 600, color: '#f59e0b',
                background: 'rgba(245,158,11,0.08)', padding: '4px 10px', borderRadius: 20,
              }}>Scenario</span>
            )}
            {hasQuiz && (
              <span style={{
                fontSize: 11, fontWeight: 600, color: 'var(--orange)',
                background: 'rgba(232,132,44,0.08)', padding: '4px 10px', borderRadius: 20,
              }}>Quiz</span>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '40px 56px', maxWidth: 840 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Avatar message */}
            {avatarMessages[section.id] && (
              <div style={{ marginBottom: 32 }}>
                <Avatar message={avatarMessages[section.id]} size="sm" />
              </div>
            )}

            {/* Section badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{
                fontSize: 12, fontWeight: 700, color: 'var(--orange)',
                background: 'rgba(232,132,44,0.08)', padding: '5px 14px', borderRadius: 20,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Sparkles size={12} />
                Section {activeSectionIdx + 1}/{mod.sections.length}
              </span>
              {isCompleted && (
                <span style={{
                  fontSize: 12, fontWeight: 700, color: '#22c55e',
                  background: 'rgba(34,197,94,0.08)', padding: '5px 14px', borderRadius: 20,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <CheckCircle2 size={12} /> Completee
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 32, fontWeight: 900, color: 'var(--navy)',
              margin: '0 0 32px', lineHeight: 1.2, letterSpacing: '-0.03em',
            }}>
              {section.title}
            </h1>

            {/* Content */}
            <div
              className="content-body"
              style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{
                __html: section.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/\n- /g, '<br/>• ')
                  .replace(/\n\|/g, '\n|')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>')
              }}
            />

            {/* Key points */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(232,132,44,0.05), rgba(245,166,35,0.02))',
                  border: '1px solid rgba(232,132,44,0.12)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px 28px',
                  marginTop: 32,
                }}
              >
                <h4 style={{
                  margin: '0 0 16px', fontSize: 16, fontWeight: 800, color: 'var(--navy)',
                  display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.02em',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--gradient-orange)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <BookOpen size={16} color="#fff" />
                  </div>
                  Points cles a retenir
                </h4>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {section.keyPoints.map((kp, i) => (
                    <li key={i} style={{
                      fontSize: 14, color: 'var(--navy)', lineHeight: 1.6, fontWeight: 500,
                      padding: '8px 14px', background: 'var(--white)',
                      borderRadius: 10, border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                    }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 1 }}>
                        {i + 1}.
                      </span>
                      {kp}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Flashcards */}
            {hasFlashcards && section.flashcards && (
              <FlashcardDeck
                cards={section.flashcards}
                onReview={(count) => {
                  onFlashcardReview(count);
                  // Give XP for each new card reviewed
                  const key = `${section.id}-${count}`;
                  if (!flashcardXPGiven.current.has(key)) {
                    flashcardXPGiven.current.add(key);
                    onFlashcardXP();
                  }
                }}
              />
            )}

            {/* Scenario */}
            {hasScenario && section.scenario && !scenarioIsDone && (
              <ScenarioChallenge
                scenario={section.scenario}
                onComplete={(correct, xpBonus) => {
                  onScenarioComplete(correct, xpBonus);
                  setScenarioDone(prev => new Set([...prev, section.id]));
                }}
              />
            )}

            {hasScenario && scenarioIsDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: 32,
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))',
                  border: '1px solid rgba(34,197,94,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <CheckCircle2 size={22} color="#22c55e" />
                <span style={{ fontSize: 15, fontWeight: 600, color: '#16a34a' }}>
                  Scenario pratique termine !
                </span>
              </motion.div>
            )}

            {/* Quiz section */}
            {hasQuiz && (
              <div style={{ marginTop: 40 }}>
                {!showQuiz && !quizDone && (
                  <motion.button
                    whileHover={{ y: -2, boxShadow: 'var(--shadow-orange)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuiz(true)}
                    style={{
                      width: '100%', padding: '22px 28px',
                      borderRadius: 'var(--radius-lg)', border: 'none',
                      background: 'linear-gradient(135deg, var(--navy) 0%, #2a3f52 100%)',
                      color: '#fff', fontSize: 17, fontWeight: 800,
                      cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', gap: 12,
                      letterSpacing: '-0.01em', boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    <Brain size={22} />
                    Testez vos connaissances
                    <ArrowRight size={18} />
                  </motion.button>
                )}

                {(showQuiz || quizDone) && section.quiz && (
                  <div style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 32,
                    boxShadow: 'var(--shadow-md)',
                  }}>
                    <h3 style={{
                      margin: '0 0 24px', fontSize: 20, fontWeight: 800,
                      color: 'var(--navy)', display: 'flex', alignItems: 'center',
                      gap: 10, letterSpacing: '-0.02em',
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'var(--gradient-orange)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Brain size={18} color="#fff" />
                      </div>
                      Quiz
                    </h3>
                    {quizDone ? (
                      <div style={{
                        textAlign: 'center', padding: '28px 24px',
                        background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))',
                        borderRadius: 'var(--radius-lg)', border: '1px solid rgba(34,197,94,0.15)',
                      }}>
                        <CheckCircle2 size={36} color="#22c55e" style={{ marginBottom: 12 }} />
                        <p style={{ fontSize: 17, color: '#22c55e', fontWeight: 700, margin: 0 }}>
                          Quiz termine — Score : {quizScores[section.id].score}/{quizScores[section.id].total}
                        </p>
                      </div>
                    ) : (
                      <Quiz
                        questions={section.quiz}
                        onComplete={(score, total) => handleQuizComplete(score, total)}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)',
            }}>
              <button
                onClick={() => activeSectionIdx > 0 && goToSection(activeSectionIdx - 1)}
                disabled={activeSectionIdx === 0}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 20px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)', background: 'var(--white)',
                  color: activeSectionIdx === 0 ? 'var(--text-light)' : 'var(--navy)',
                  fontSize: 14, fontWeight: 600,
                  cursor: activeSectionIdx === 0 ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: activeSectionIdx === 0 ? 0.5 : 1,
                }}
              >
                <ChevronLeft size={16} /> Precedent
              </button>

              {!isCompleted && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleMarkComplete}
                  style={{
                    padding: '12px 24px', borderRadius: 'var(--radius-sm)',
                    border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 4px 12px rgba(34,197,94,0.25)',
                  }}
                >
                  <CheckCircle2 size={16} /> Marquer comme terminee
                </motion.button>
              )}

              {activeSectionIdx < mod.sections.length - 1 ? (
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => goToSection(activeSectionIdx + 1)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 20px', borderRadius: 'var(--radius-sm)',
                    border: 'none', background: 'var(--gradient-orange)',
                    color: '#fff', fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', boxShadow: 'var(--shadow-orange)',
                  }}
                >
                  Suivant <ChevronRight size={16} />
                </motion.button>
              ) : nextModule ? (
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => navigate(`/module/${nextModule.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 20px', borderRadius: 'var(--radius-sm)',
                    border: 'none', background: 'var(--gradient-orange)',
                    color: '#fff', fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', boxShadow: 'var(--shadow-orange)',
                  }}
                >
                  Module suivant <ChevronRight size={16} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => navigate('/')}
                  style={{
                    padding: '12px 24px', borderRadius: 'var(--radius-sm)',
                    border: 'none', background: 'var(--gradient-orange)',
                    color: '#fff', fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', boxShadow: 'var(--shadow-orange)',
                  }}
                >
                  Terminer la formation
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
