import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { modules } from '../data/modules';
import Quiz from '../components/Quiz';
import Avatar from '../components/Avatar';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, BookOpen } from 'lucide-react';

interface ModulePageProps {
  completedSections: Set<string>;
  onCompleteSection: (sectionId: string) => void;
  quizScores: Record<string, { score: number; total: number }>;
  onQuizComplete: (sectionId: string, score: number, total: number) => void;
}

export default function ModulePage({ completedSections, onCompleteSection, quizScores, onQuizComplete }: ModulePageProps) {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const mod = modules.find(m => m.id === moduleId);
  const moduleIndex = modules.findIndex(m => m.id === moduleId);

  useEffect(() => {
    setActiveSectionIdx(0);
    setShowQuiz(false);
  }, [moduleId]);

  if (!mod) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Module non trouvé</h2>
        <button onClick={() => navigate('/')}>Retour au tableau de bord</button>
      </div>
    );
  }

  const section = mod.sections[activeSectionIdx];
  const isCompleted = completedSections.has(section.id);
  const hasQuiz = section.quiz && section.quiz.length > 0;
  const quizDone = quizScores[section.id] !== undefined;

  const handleMarkComplete = () => {
    onCompleteSection(section.id);
  };

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
    'intro-1': "Commençons par les bases ! La CCN Transports Routiers est un texte essentiel que tout professionnel du secteur doit maîtriser.",
    'intro-2': "Comprendre la hiérarchie des normes, c'est savoir quel texte prime dans chaque situation. C'est fondamental !",
    'class-1': "Les classifications, c'est le cœur de la convention. Chaque salarié est rattaché à un groupe qui détermine ses droits.",
    'class-2': "La classification des conducteurs est très détaillée. Le type de véhicule et les compétences font toute la différence.",
    'tt-1': "Le temps de travail dans le transport, c'est un sujet complexe. Les règles sont différentes du droit commun !",
    'tt-2': "Les règles de repos sont strictes et surveillées. Elles protègent la sécurité des conducteurs et des usagers de la route.",
    'tt-3': "Les heures supplémentaires dans le transport ont un régime unique. L'équivalence à 43h est une spécificité majeure.",
    'rem-1': "La rémunération, c'est ce qui intéresse tout le monde ! Les minima conventionnels sont régulièrement revalorisés.",
    'rem-2': "Les indemnités de déplacement sont essentielles pour les conducteurs. C'est un élément clé de leur rémunération.",
    'rem-3': "La prime d'ancienneté récompense la fidélité. Elle est obligatoire et doit figurer sur le bulletin de paie.",
    'ct-1': "La période d'essai varie selon la catégorie. Attention au renouvellement : il faut un accord exprès !",
    'ct-2': "Le préavis est un moment important. Les heures de recherche d'emploi sont un droit souvent méconnu.",
    'ct-3': "L'indemnité de licenciement conventionnelle est souvent plus favorable que le légal. Un avantage pour les salariés !",
    'cg-1': "Les jours de congés supplémentaires pour ancienneté, c'est un vrai plus de la convention collective.",
    'cg-2': "Les congés pour événements familiaux sont plus généreux que le minimum légal, surtout pour les cadres.",
    'sp-1': "Le chronotachygraphe, c'est le gendarme du transport routier. Son bon usage est essentiel.",
    'sp-2': "Le transport de matières dangereuses nécessite des compétences spécifiques. La formation ADR est incontournable.",
    'sp-3': "FIMO et FCO : ces formations sont le sésame pour conduire professionnellement. Sans elles, pas de volant !",
    'ss-1': "La santé des conducteurs est une priorité. Le suivi médical renforcé protège les conducteurs et les usagers.",
    'ss-2': "La prévention des risques est l'affaire de tous. Le droit de refus du conducteur est un droit fondamental.",
    'rp-1': "Le dialogue social dans le transport a ses particularités. Réunir des conducteurs toujours sur la route, c'est un défi !",
  };

  return (
    <div style={{ display: 'flex', gap: 0, minHeight: '100vh' }}>
      {/* Section sidebar */}
      <div style={{
        width: 260,
        background: '#fff',
        borderRight: '1px solid #e2e6ec',
        padding: '24px 0',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '0 20px 16px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              color: '#2a3d50',
              fontSize: 13,
              cursor: 'pointer',
              padding: 0,
              marginBottom: 16,
            }}
          >
            <ChevronLeft size={16} /> Retour
          </button>
          <h3 style={{ margin: 0, fontSize: 16, color: '#1e2d3d', fontWeight: 700 }}>
            {mod.title}
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#2a3d50', opacity: 0.6 }}>
            {mod.sections.length} sections
          </p>
        </div>

        {mod.sections.map((s, idx) => {
          const done = completedSections.has(s.id);
          const active = idx === activeSectionIdx;
          return (
            <div
              key={s.id}
              onClick={() => goToSection(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 20px',
                cursor: 'pointer',
                background: active ? `${mod.color}08` : 'transparent',
                borderLeft: active ? `3px solid ${mod.color}` : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {done ? (
                <CheckCircle2 size={18} color="#16a34a" />
              ) : (
                <Circle size={18} color={active ? mod.color : '#e2e6ec'} />
              )}
              <span style={{
                fontSize: 13,
                color: active ? '#1e2d3d' : '#2a3d50',
                fontWeight: active ? 600 : 400,
                lineHeight: 1.4,
              }}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 48px', maxWidth: 800 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {avatarMessages[section.id] && (
              <div style={{ marginBottom: 28 }}>
                <Avatar message={avatarMessages[section.id]} size="sm" />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: mod.color,
                background: `${mod.color}15`,
                padding: '4px 12px',
                borderRadius: 20,
              }}>
                Section {activeSectionIdx + 1}/{mod.sections.length}
              </span>
              {isCompleted && (
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#16a34a',
                  background: '#16a34a15',
                  padding: '4px 12px',
                  borderRadius: 20,
                }}>
                  ✓ Complétée
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e2d3d', margin: '0 0 24px', lineHeight: 1.3 }}>
              {section.title}
            </h1>

            <div
              className="content-body"
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: '#2a3d50',
              }}
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

            {section.keyPoints && section.keyPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  background: `${mod.color}08`,
                  border: `1px solid ${mod.color}25`,
                  borderRadius: 14,
                  padding: '20px 24px',
                  marginTop: 28,
                }}
              >
                <h4 style={{ margin: '0 0 12px', fontSize: 15, color: mod.color, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BookOpen size={18} /> Points clés à retenir
                </h4>
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {section.keyPoints.map((kp, i) => (
                    <li key={i} style={{ fontSize: 14, color: '#1e2d3d', lineHeight: 1.5 }}>
                      {kp}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Quiz section */}
            {hasQuiz && (
              <div style={{ marginTop: 36 }}>
                {!showQuiz && !quizDone && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuiz(true)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      borderRadius: 14,
                      border: `2px dashed ${mod.color}50`,
                      background: `${mod.color}05`,
                      color: mod.color,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    🧠 Testez vos connaissances
                  </motion.button>
                )}

                {(showQuiz || quizDone) && section.quiz && (
                  <div style={{
                    background: '#fff',
                    border: '1px solid #e2e6ec',
                    borderRadius: 14,
                    padding: 28,
                  }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 18, color: '#1e2d3d' }}>
                      🧠 Quiz
                    </h3>
                    {quizDone ? (
                      <div style={{
                        textAlign: 'center',
                        padding: 20,
                        background: '#16a34a10',
                        borderRadius: 12,
                        border: '1px solid #16a34a30',
                      }}>
                        <p style={{ fontSize: 16, color: '#16a34a', fontWeight: 600, margin: 0 }}>
                          ✓ Quiz terminé — Score : {quizScores[section.id].score}/{quizScores[section.id].total}
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

            {/* Mark complete + navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 36,
              paddingTop: 24,
              borderTop: '1px solid #e2e6ec',
            }}>
              <button
                onClick={() => activeSectionIdx > 0 && goToSection(activeSectionIdx - 1)}
                disabled={activeSectionIdx === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  borderRadius: 10,
                  border: '1px solid #e2e6ec',
                  background: '#fff',
                  color: activeSectionIdx === 0 ? '#ccc' : '#2a3d50',
                  fontSize: 14,
                  cursor: activeSectionIdx === 0 ? 'default' : 'pointer',
                }}
              >
                <ChevronLeft size={16} /> Précédent
              </button>

              {!isCompleted && (
                <button
                  onClick={handleMarkComplete}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#16a34a',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Marquer comme terminée
                </button>
              )}

              {activeSectionIdx < mod.sections.length - 1 ? (
                <button
                  onClick={() => goToSection(activeSectionIdx + 1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 18px',
                    borderRadius: 10,
                    border: 'none',
                    background: mod.color,
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Suivant <ChevronRight size={16} />
                </button>
              ) : nextModule ? (
                <button
                  onClick={() => navigate(`/module/${nextModule.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 18px',
                    borderRadius: 10,
                    border: 'none',
                    background: mod.color,
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Module suivant <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/')}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 10,
                    border: 'none',
                    background: mod.color,
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Terminer
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
