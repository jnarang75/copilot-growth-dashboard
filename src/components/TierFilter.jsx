import React from 'react'

const TIERS = [
  { id: 'starter', label: '⭐ Starter', color: '#94a3b8' },
  { id: 'premium', label: '💎 Premium', color: '#f59e0b' },
]

export default function TierFilter({ selected, onChange }) {
  return (
    <div style={styles.wrap}>
      <span style={styles.label}>Tier</span>
      {TIERS.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            ...styles.btn,
            background:  selected === t.id ? t.color : 'transparent',
            color:       selected === t.id ? '#0f172a' : t.color,
            borderColor: t.color,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

const styles = {
  wrap:  { display: 'flex', alignItems: 'center', gap: 8 },
  label: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginRight: 4 },
  btn: {
    padding: '4px 14px',
    borderRadius: 20,
    border: '1.5px solid',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 12,
    transition: 'all 0.15s',
  },
}
