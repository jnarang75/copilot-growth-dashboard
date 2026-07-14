import React from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  Tooltip, Legend,
} from 'recharts'
import { leadingIndicatorsData } from '../data/mockData'

const COHORT_COLORS = { smbc: '#34d399', enterprise: '#60a5fa', consumer: '#f472b6' }

export default function LeadingIndicators({ selected }) {
  const cohorts = selected === 'all'
    ? ['smbc', 'enterprise', 'consumer']
    : [selected]

  const labels = { smbc: 'SMB + C', enterprise: 'Enterprise', consumer: 'Consumer' }

  return (
    <div style={card}>
      <h2 style={title}>Leading Indicators → Upsell</h2>
      <p style={sub}>Feature adoption rate (%) — higher adoption correlates with upsell conversion</p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 340px', minWidth: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={leadingIndicatorsData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="feature" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} labelStyle={{ color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              {cohorts.map(c => (
                <Radar key={c} name={labels[c]} dataKey={c} stroke={COHORT_COLORS[c]} fill={COHORT_COLORS[c]} fillOpacity={0.15} strokeWidth={2} />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: '1 1 280px', minWidth: 260 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#0f172a' }}>
                <th style={th}>Feature</th>
                {cohorts.map(c => <th key={c} style={{ ...th, color: COHORT_COLORS[c] }}>{labels[c]}</th>)}
              </tr>
            </thead>
            <tbody>
              {leadingIndicatorsData.map(row => (
                <tr key={row.feature} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={td}>{row.feature}</td>
                  {cohorts.map(c => (
                    <td key={c} style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ flex: 1, background: '#0f172a', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                          <div style={{ width: `${row[c]}%`, height: '100%', background: COHORT_COLORS[c], borderRadius: 4 }} />
                        </div>
                        <span style={{ color: COHORT_COLORS[c], fontWeight: 600, minWidth: 30 }}>{row[c]}%</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const card  = { background: '#1e293b', borderRadius: 12, padding: '20px 24px', border: '1px solid #334155' }
const title = { fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }
const sub   = { fontSize: 12, color: '#64748b', marginBottom: 16 }
const th    = { padding: '8px 12px', color: '#64748b', textAlign: 'left', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.05em' }
const td    = { padding: '8px 12px', color: '#94a3b8' }
