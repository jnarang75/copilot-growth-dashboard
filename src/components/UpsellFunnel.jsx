import React from 'react'
import {
  FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer,
} from 'recharts'
import { funnelData, COHORTS } from '../data/mockData'

const COLORS = {
  smbc:       ['#064e3b','#065f46','#047857','#059669','#10b981'],
  enterprise: ['#1e3a5f','#1d4ed8','#2563eb','#3b82f6','#60a5fa'],
  consumer:   ['#4a044e','#7e22ce','#9333ea','#c026d3','#e879f9'],
}

const cohortLabel = (id) => COHORTS.find(c => c.id === id)?.label ?? id

export default function UpsellFunnel({ selected }) {
  const ids = selected === 'all' ? ['smbc', 'enterprise', 'consumer'] : [selected]

  return (
    <div style={card}>
      <h2 style={title}>Growth → Upsell Funnel</h2>
      <p style={sub}>Users (thousands) at each stage of the activation journey</p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {ids.map(id => {
          const data = funnelData[id].map((d, i) => ({ ...d, fill: COLORS[id][i] }))
          return (
            <div key={id} style={{ flex: '1 1 220px', minWidth: 200 }}>
              <p style={cohortTitle}>{cohortLabel(id)}</p>
              <ResponsiveContainer width="100%" height={260}>
                <FunnelChart>
                  <Tooltip
                    formatter={(v) => [`${v}K`, '']}
                    contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Funnel dataKey="value" data={data} isAnimationActive>
                    <LabelList position="right" fill="#94a3b8" stroke="none" dataKey="stage" style={{ fontSize: 11 }} />
                    <LabelList position="center" fill="#fff" stroke="none" dataKey="value" formatter={v => `${v}K`} style={{ fontSize: 12, fontWeight: 700 }} />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
              <DropOffTable data={funnelData[id]} color={COLORS[id][4]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DropOffTable({ data, color }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, marginTop: 8 }}>
      <thead>
        <tr>
          <th style={th}>Stage</th>
          <th style={th}>Users</th>
          <th style={th}>Drop-off</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => {
          const prev = data[i - 1]?.value
          const dropoff = prev ? `${(((prev - d.value) / prev) * 100).toFixed(0)}%` : '—'
          return (
            <tr key={d.stage}>
              <td style={td}>{d.stage}</td>
              <td style={{ ...td, color }}>{d.value}K</td>
              <td style={{ ...td, color: i > 0 ? '#f87171' : '#64748b' }}>{dropoff}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const card        = { background: '#1e293b', borderRadius: 12, padding: '20px 24px', border: '1px solid #334155' }
const title       = { fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }
const sub         = { fontSize: 12, color: '#64748b', marginBottom: 16 }
const cohortTitle = { fontSize: 13, fontWeight: 700, color: '#94a3b8', marginBottom: 4, textAlign: 'center' }
const th          = { padding: '4px 8px', color: '#64748b', textAlign: 'left', borderBottom: '1px solid #334155' }
const td          = { padding: '3px 8px', color: '#94a3b8', borderBottom: '1px solid #1e293b' }
