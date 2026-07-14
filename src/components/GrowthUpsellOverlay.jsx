import React from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { timeSeriesData, COHORTS } from '../data/mockData'

const MAU_KEYS = {
  smbc:       { key: 'smbc_mau',       color: '#34d399', label: 'SMB+C MAU (K)' },
  enterprise: { key: 'enterprise_mau', color: '#60a5fa', label: 'Enterprise MAU (K)' },
  consumer:   { key: 'consumer_mau',   color: '#f472b6', label: 'Consumer MAU (K)' },
}
const UPSELL_KEYS = {
  smbc:       { key: 'smbc_upsell',       color: '#6ee7b7', label: 'SMB+C Upsell %' },
  enterprise: { key: 'enterprise_upsell', color: '#93c5fd', label: 'Enterprise Upsell %' },
  consumer:   { key: 'consumer_upsell',   color: '#f9a8d4', label: 'Consumer Upsell %' },
}

const activeCohorts = (selected) =>
  selected === 'all' ? ['smbc', 'enterprise', 'consumer'] : [selected]

export default function GrowthUpsellOverlay({ selected }) {
  const cohorts = activeCohorts(selected)

  return (
    <div style={card}>
      <h2 style={title}>MAU Growth × Upsell Conversion Rate</h2>
      <p style={sub}>Bars = Monthly Active Users (K) &nbsp;|&nbsp; Lines = Upsell conversion rate (%)</p>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={timeSeriesData} margin={{ top: 8, right: 40, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis yAxisId="left"  tick={{ fill: '#94a3b8', fontSize: 12 }} label={{ value: 'MAU (K)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 12 }} label={{ value: 'Upsell %', angle: 90, position: 'insideRight', fill: '#64748b', fontSize: 11 }} domain={[0, 'auto']} />
          <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} labelStyle={{ color: '#e2e8f0' }} />
          <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
          {cohorts.map(c => (
            <Bar key={c + '_bar'} yAxisId="left" dataKey={MAU_KEYS[c].key} name={MAU_KEYS[c].label} fill={MAU_KEYS[c].color} opacity={0.75} radius={[4,4,0,0]} />
          ))}
          {cohorts.map(c => (
            <Line key={c + '_line'} yAxisId="right" type="monotone" dataKey={UPSELL_KEYS[c].key} name={UPSELL_KEYS[c].label} stroke={UPSELL_KEYS[c].color} strokeWidth={2.5} dot={{ r: 4 }} />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

const card  = { background: '#1e293b', borderRadius: 12, padding: '20px 24px', border: '1px solid #334155' }
const title = { fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }
const sub   = { fontSize: 12, color: '#64748b', marginBottom: 16 }
