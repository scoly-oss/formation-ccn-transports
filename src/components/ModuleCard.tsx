import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, Wallet, FileText, Calendar, Truck, Shield, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Module } from '../data/modules';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  BookOpen, Users, Clock, Wallet, FileText, Calendar, Truck, Shield, MessageSquare,
};

interface ModuleCardProps {
  module: Module;
  index: number;
  progress: number;
  onClick: () => void;
}

export default function ModuleCard({ module, index, progress, onClick }: ModuleCardProps) {
  const Icon = iconMap[module.icon] || BookOpen;
  const pct = Math.round(progress * 100);
  const isDone = pct === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(30,45,61,0.12)' }}
      onClick={onClick}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-xl)',
        padding: 0,
        cursor: 'pointer',
        border: '1px solid var(--border)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient accent */}
      <div style={{
        height: 4,
        background: isDone
          ? 'linear-gradient(90deg, #22c55e, #4ade80)'
          : pct > 0
          ? `linear-gradient(90deg, ${module.color}, ${module.color}88)`
          : 'rgba(30,45,61,0.06)',
        position: 'relative',
      }}>
        {!isDone && pct > 0 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${pct}%`,
            background: 'var(--gradient-orange)',
          }} />
        )}
      </div>

      <div style={{ padding: '24px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 'var(--radius-sm)',
            background: `${module.color}10`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={26} color={module.color} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              margin: 0,
              fontSize: 17,
              color: 'var(--navy)',
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}>
              {module.title}
            </h3>
            <p style={{
              margin: '6px 0 0',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}>
              {module.sections.length} section{module.sections.length > 1 ? 's' : ''}
            </p>
          </div>
          {isDone ? (
            <CheckCircle2 size={22} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
          ) : pct > 0 ? (
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: module.color,
              background: `${module.color}12`,
              padding: '4px 12px',
              borderRadius: 20,
              flexShrink: 0,
            }}>
              {pct}%
            </span>
          ) : null}
        </div>

        <p style={{
          margin: 0,
          fontSize: 14,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}>
          {module.description}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 18,
          paddingTop: 16,
          borderTop: '1px solid var(--border)',
          fontSize: 13,
          fontWeight: 600,
          color: module.color,
        }}>
          {isDone ? 'Revoir le module' : pct > 0 ? 'Continuer' : 'Commencer'}
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}
