import { BookOpen, Users, Clock, Wallet, FileText, Calendar, Truck, Shield, MessageSquare, Home, BarChart2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { modules } from '../data/modules';

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

  return (
    <nav style={{
      width: 280,
      minHeight: '100vh',
      background: '#1e2d3d',
      color: '#fff',
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto',
      zIndex: 100,
    }}>
      <div
        onClick={() => navigate('/')}
        style={{ padding: '0 20px', marginBottom: 32, cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #e8842c, #e8842ccc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 800,
          }}>
            T
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>Formation CCN</div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>Transports Routiers</div>
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 20px',
          cursor: 'pointer',
          background: currentPath === '/' || currentPath === import.meta.env.BASE_URL ? 'rgba(255,255,255,0.08)' : 'transparent',
          borderRight: currentPath === '/' || currentPath === import.meta.env.BASE_URL ? '3px solid #e8842c' : '3px solid transparent',
          transition: 'all 0.2s',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <Home size={18} />
        Tableau de bord
      </div>

      <div style={{ padding: '16px 20px 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', opacity: 0.4, letterSpacing: 1 }}>
        Modules
      </div>

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
              padding: '10px 20px',
              cursor: 'pointer',
              background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderRight: isActive ? '3px solid #e8842c' : '3px solid transparent',
              transition: 'all 0.2s',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              opacity: isActive ? 1 : 0.75,
            }}
          >
            <Icon size={18} color={isActive ? '#e8842c' : '#fff'} />
            <span style={{ flex: 1 }}>{mod.title}</span>
            {allDone && (
              <span style={{ fontSize: 11, background: '#16a34a', padding: '2px 6px', borderRadius: 6, fontWeight: 600 }}>
                ✓
              </span>
            )}
            {!allDone && completedCount > 0 && (
              <span style={{ fontSize: 11, opacity: 0.5 }}>
                {completedCount}/{mod.sections.length}
              </span>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: 'auto', padding: '20px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(232,132,44,0.6)',
            flexShrink: 0,
          }}>
            <img
              src={`${import.meta.env.BASE_URL}avatar-sofiane.jpg`}
              alt="Sofiane Coly"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Sofiane Coly</div>
            <div style={{ fontSize: 11, opacity: 0.5 }}>Votre formateur</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.6, fontSize: 12 }}>
          <BarChart2 size={14} />
          <span>{completedSections.size} sections complétées</span>
        </div>
      </div>
    </nav>
  );
}
