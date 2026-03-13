import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, Wallet, FileText, Calendar, Truck, Shield, MessageSquare } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: 24,
        cursor: 'pointer',
        border: '1px solid #e2e6ec',
        transition: 'box-shadow 0.3s, transform 0.3s',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: '#e2e6ec',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: module.color,
          transition: 'width 0.5s ease',
        }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${module.color}12`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={24} color={module.color} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 16, color: '#1e2d3d', fontWeight: 700 }}>
            {module.title}
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#2a3d50', opacity: 0.7 }}>
            {module.sections.length} section{module.sections.length > 1 ? 's' : ''}
          </p>
        </div>
        {pct > 0 && (
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: pct === 100 ? '#16a34a' : module.color,
            background: pct === 100 ? '#16a34a15' : `${module.color}15`,
            padding: '4px 10px',
            borderRadius: 20,
          }}>
            {pct === 100 ? '✓' : `${pct}%`}
          </span>
        )}
      </div>

      <p style={{ margin: 0, fontSize: 14, color: '#2a3d50', lineHeight: 1.5, opacity: 0.85 }}>
        {module.description}
      </p>
    </motion.div>
  );
}
