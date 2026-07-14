import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell,
} from 'recharts'
import { revenueAttributionData } from '../data/mockData'

const COHORT_COLORS = {
  'SMB + C':    '#34d399',
  'Enterprise': '#60a5fa',
  'Consumer':   '#f472b6',
}

export default function RevenueAttribution({ selected }) {
  const data = selected === 'all'
    ? revenueAttributionData
    : revenueAttributionData.filter(d => {
        const map = { smbc: 'SMB + C', enterprise: 'Enterprise', consumer: 'Consumer' }
        return d.cohort === map[selected]
      })

  const totalUpsell  = revenueAttributionData.reduce((s, d) => s + d.upsell, 0).toFixed(1)
  const totalOrganic = revenueAttributionData.reduce((s, d) => s + d.organic, 0).toFixed(1)

  return (
    <div style={card}>
      <h2 style={title}>Revenue Attribution: Organic Growth vs Upsell-Driven</h2>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 360px', minWidth: 300 }}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} margin={{ top: 8, right: 20, bottom: 0, left: 0 }} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="cohort" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} label={{ value: '$M', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={v => [`$${v}M`, '']}
              />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              <Bar dataKey="organic" name="Organic Growth" radius={[4,4,0,0]} stackId="a">
                {data.map(d => <Cell key={d.cohort} fill={COHORT_COLORS[d.cohort]} opacity={0.5} />)}
              </Bar>
              <Bar dataKey="upsell" name="Upsell-Driven" radius={[4,4,0,0]} stackId="a">
                {data.map(d => <Cell key={d.cohort} fill={COHORT_COLORS[d.cohort]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 20 }}>
          <StatBox label="Total Upsell Revenue" value={`$${totalUpsell}M`} color="#818cf8" />
          <StatBox label="Total Organic Revenue" value={`$${totalOrganic}M`} color="#94a3b8" />
          <StatBox label="Upsell Share" value={`${((parseFloat(totalUpsell) / (parseFloat(totalUpsell) + parseFloat(totalOrganic))) * 100).toFixed(0)}%`} color="#f59e0b" />
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value, color }) {
  return (
    <div style={{ background: '#0f172a', borderRadius: 8, padding: '12px 16px', border: `1px solid ${color}33` }}>
      <p style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 800, color }}>{value}</p>
    </div>
  )
}

const card  = { background: '#1e293b', borderRadius: 12, padding: '20px 24px', border: '1px solid #334155' }
const title = { fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 16 }
