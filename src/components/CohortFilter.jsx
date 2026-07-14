import React from 'react'
import { COHORTS } from '../data/mockData'

export default function CohortFilter({ selected, onChange }) {
  return (
    <div style={styles.bar}>
      <span style={styles.label}>Cohort</span>
      <div style={styles.buttons}>
        {COHORTS.map(c => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            style={{
              ...styles.btn,
              background: selected === c.id ? c.color : 'transparent',
              color:      selected === c.id ? '#0f172a' : c.color,
              borderColor: c.color,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '12px 24px',
    background: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  label: { fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  buttons: { display: 'flex', gap: 8 },
  btn: {
    padding: '6px 18px',
    borderRadius: 20,
    border: '1.5px solid',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 13,
    transition: 'all 0.15s',
  },
}
