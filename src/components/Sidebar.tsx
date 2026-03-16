import { BookOpen, Users, Clock, Wallet, FileText, Calendar, Truck, Shield, MessageSquare, Home, BarChart2, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { modules, getTotalSections } from '../data/modules';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  BookOpen, Users, Clock, Wallet, FileText, Calendar, Truck, Shield, MessageSquare,
};

interface SidebarProps {
  completedSections: Set<string>;
}

export default function Sidebar({ completedSections }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const totalSections = getTotalSections();
  const pct = totalSections > 0 ? Math.round((completedSections.size / totalSections) * 100) : 0;

  return (
    <nav style={{
      width: 280,
      minHeight: '100vh',
      background: 'var(--navy)',
      color: '#fff',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto',
      zIndex: 100,
    }}>
      {/* Brand header */}
      <div
        onClick={() => navigate('/')}
        style={{
          padding: '28px 24px 24px',
          cursor: 'pointer',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'var(--gradient-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 900,
            boxShadow: '0 4px 12px rgba(232,132,44,0.3)',
          }}>
            T
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.03em' }}>Formation CCN</div>
            <div style={{ fontSize: 12, opacity: 0.5, fontWeight: 500 }}>Transports Routiers</div>
          </div>
        </div>
      </div>

      {/* Dashboard link */}
      <div style={{ padding: '16px 12px 8px' }}>
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 14px',
            cursor: 'pointer',
            background: currentPath === '/' || currentPath === import.meta.env.BASE_URL
              ? 'rgba(232,132,44,0.12)'
              : 'transparent',
            borderRadius: 10,
            transition: 'all 0.2s',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <Home size={18} color={currentPath === '/' || currentPath === import.meta.env.BASE_URL ? '#e8842c' : '#fff'} />
          Tableau de bord
        </div>
      </div>

      {/* Modules label */}
      <div style={{
        padding: '20px 26px 10px',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        opacity: 0.35,
        letterSpacing: 1.5,
      }}>
        Modules
      </div>

      {/* Module list */}
      <div style={{ padding: '0 12px', flex: 1 }}>
        {modules.map((mod) => {
          const Icon = iconMap[mod.icon] || BookOpen;
          const modPath = `/module/${mod.id}`;
          const isActive = currentPath.startsWith(modPath);
          const completedCount = mod.sections.filter(s => completedSections.has(s.id)).length;
          const allDone = completedCount === mod.sections.length;

          return (
            <div
              key={mod.id}
              onClick={() => navigate(modPath)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                cursor: 'pointer',
                background: isActive ? 'rgba(232,132,44,0.12)' : 'transparent',
                borderRadius: 10,
                transition: 'all 0.2s',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                opacity: isActive ? 1 : 0.7,
                marginBottom: 2,
              }}
            >
              <Icon size={18} color={isActive ? '#e8842c' : '#fff'} />
              <span style={{ flex: 1, lineHeight: 1.3 }}>{mod.title}</span>
              {allDone && (
                <span style={{
                  fontSize: 10,
                  background: '#22c55e',
                  padding: '3px 8px',
                  borderRadius: 20,
                  fontWeight: 700,
                }}>
                  ✓
                </span>
              )}
              {!allDone && completedCount > 0 && (
                <span style={{
                  fontSize: 11,
                  opacity: 0.5,
                  fontWeight: 600,
                }}>
                  {completedCount}/{mod.sections.length}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer with avatar + progress */}
      <div style={{
        padding: '20px 20px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: 'auto',
      }}>
        {/* Mini progress bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, opacity: 0.6 }}>
              <BarChart2 size={13} />
              Progression
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#e8842c' }}>{pct}%</span>
          </div>
          <div style={{
            width: '100%',
            height: 6,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: 'var(--gradient-orange)',
              borderRadius: 3,
              transition: 'width 0.8s ease',
            }} />
          </div>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--gradient-orange)',
            padding: 2,
            flexShrink: 0,
          }}>
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
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Sofiane Coly</div>
            <div style={{ fontSize: 11, opacity: 0.4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Sparkles size={10} /> Votre formateur
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
