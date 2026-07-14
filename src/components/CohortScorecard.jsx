import React from 'react'
import { scorecardData } from '../data/mockData'

const RISK_ICONS = { Low: '🟢', Medium: '🟡', High: '🔴' }

export default function CohortScorecard({ selected }) {
  const rows = selected === 'all'
    ? scorecardData
    : scorecardData.filter(r => {
        const map = { smbc: 'SMB + C', enterprise: 'Enterprise', consumer: 'Consumer' }
        return r.cohort === map[selected]
      })

  return (
    <div style={card}>
      <h2 style={title}>Cohort Health Scorecard</h2>
      <div style={tableWrap}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#0f172a' }}>
              {['Cohort', 'MAU', 'MoM Growth', 'Upsell Rate', 'Avg Days to Upsell', 'Revenue Share', 'Churn Risk'].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.cohort} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={td}>
                  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: r.color, marginRight: 8 }} />
                  <strong style={{ color: '#e2e8f0' }}>{r.cohort}</strong>
                </td>
                <td style={{ ...td, color: r.color, fontWeight: 700 }}>{r.mau}</td>
                <td style={{ ...td, color: r.momGrowth.startsWith('+') ? '#34d399' : '#f87171', fontWeight: 600 }}>{r.momGrowth}</td>
                <td style={{ ...td, color: '#e2e8f0' }}>{r.upsellRate}</td>
                <td style={{ ...td, color: '#94a3b8' }}>{r.avgDaysUpsell}</td>
                <td style={td}>
                  <div style={{ background: '#0f172a', borderRadius: 4, overflow: 'hidden', height: 16, width: 100, display: 'inline-flex', alignItems: 'center' }}>
                    <div style={{ width: r.revenueShare, height: '100%', background: r.color, borderRadius: 4 }} />
                    <span style={{ marginLeft: 6, color: '#94a3b8', fontSize: 11 }}>{r.revenueShare}</span>
                  </div>
                </td>
                <td style={td}>
                  <span style={{ color: r.churnColor, fontWeight: 600 }}>
                    {RISK_ICONS[r.churnRisk]} {r.churnRisk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const card     = { background: '#1e293b', borderRadius: 12, padding: '20px 24px', border: '1px solid #334155' }
const title    = { fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 16 }
const tableWrap = { overflowX: 'auto' }
const th       = { padding: '10px 16px', color: '#64748b', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }
const td       = { padding: '12px 16px', color: '#94a3b8', whiteSpace: 'nowrap' }
