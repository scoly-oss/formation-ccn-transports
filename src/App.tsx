import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';

function App() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('ccn-completed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [quizScores, setQuizScores] = useState<Record<string, { score: number; total: number }>>(() => {
    const saved = localStorage.getItem('ccn-quizzes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('ccn-completed', JSON.stringify([...completedSections]));
  }, [completedSections]);

  useEffect(() => {
    localStorage.setItem('ccn-quizzes', JSON.stringify(quizScores));
  }, [quizScores]);

  const handleCompleteSection = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  const handleQuizComplete = (sectionId: string, score: number, total: number) => {
    setQuizScores(prev => ({ ...prev, [sectionId]: { score, total } }));
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb' }}>
        <Sidebar completedSections={completedSections} />
        <main style={{ marginLeft: 280, flex: 1, minHeight: '100vh' }}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  completedSections={completedSections}
                  quizScores={quizScores}
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
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
