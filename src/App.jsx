import React, { useState } from 'react'
import CohortFilter        from './components/CohortFilter'
import TierFilter          from './components/TierFilter'
import GrowthUpsellOverlay from './components/GrowthUpsellOverlay'
import UpsellFunnel        from './components/UpsellFunnel'
import CohortScorecard     from './components/CohortScorecard'
import LeadingIndicators   from './components/LeadingIndicators'
import RevenueAttribution  from './components/RevenueAttribution'
import TierSubView         from './components/TierSubView'

const COHORT_COLORS = { smbc: '#34d399', enterprise: '#60a5fa', consumer: '#f472b6' }
const KPI_MAP = {
  all:        { mau: '850K', growth: '+9.9%',  upsell: '9.2%',  revenue: '$31.7M' },
  smbc:       { mau: '215K', growth: '+12.0%', upsell: '8.3%',  revenue: '$7.0M'  },
  enterprise: { mau: '115K', growth: '+6.5%',  upsell: '22.0%', revenue: '$15.5M' },
  consumer:   { mau: '520K', growth: '+10.6%', upsell: '2.1%',  revenue: '$9.2M'  },
}

export default function App() {
  const [selected, setSelected] = useState('all')
  const [tier, setTier]         = useState('starter')
  const kpi = KPI_MAP[selected]

  return (
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.h1}>
            <span style={styles.dot}>●</span> CopilotAnalytix
          </h1>
          <p style={styles.headerSub}>Growth × Upsell Intelligence · All Cohorts</p>
        </div>
        <div style={styles.badge}>Last updated: Jun 2026</div>
      </header>

      {/* Cohort Filter */}
      <div style={styles.filterBar}>
        <CohortFilter selected={selected} onChange={setSelected} />
        <div style={styles.divider} />
        <TierFilter selected={tier} onChange={setTier} />
      </div>

      {/* KPI Strip */}
      <div style={styles.kpiStrip}>
        <KPICard label="Monthly Active Users"    value={kpi.mau}      color="#818cf8" />
        <KPICard label="MoM Growth"              value={kpi.growth}   color="#34d399" />
        <KPICard label="Upsell Conv. Rate"       value={kpi.upsell}   color="#f59e0b" />
        <KPICard label="Total Revenue (6mo)"     value={kpi.revenue}  color="#60a5fa" />
      </div>

      {/* Charts Grid */}
      <main style={styles.grid}>
        {/* Full-width: overlay chart */}
        <div style={styles.full}>
          <GrowthUpsellOverlay selected={selected} />
        </div>

        {/* Full-width: funnel */}
        <div style={styles.full}>
          <UpsellFunnel selected={selected} />
        </div>

        {/* Two-col: revenue + scorecard */}
        <div style={styles.half}>
          <RevenueAttribution selected={selected} />
        </div>
        <div style={styles.half}>
          <CohortScorecard selected={selected} />
        </div>

        {/* Full-width: leading indicators */}
        <div style={styles.full}>
          <LeadingIndicators selected={selected} />
        </div>

        {/* Full-width: Starter / Premium tier deep-dive */}
        <div style={styles.full}>
          <TierSubView cohort={selected} tier={tier} />
        </div>
      </main>
    </div>
  )
}

function KPICard({ label, value, color }) {
  return (
    <div style={{ ...styles.kpi, borderTop: `3px solid ${color}` }}>
      <p style={styles.kpiLabel}>{label}</p>
      <p style={{ ...styles.kpiValue, color }}>{value}</p>
    </div>
  )
}

const styles = {
  root: { minHeight: '100vh', background: '#0f172a' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 28px', background: '#1e293b', borderBottom: '1px solid #334155',
  },
  h1: { fontSize: 22, fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.5px' },
  dot: { color: '#818cf8', marginRight: 8 },
  headerSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  badge: { fontSize: 11, color: '#475569', background: '#0f172a', padding: '4px 12px', borderRadius: 20, border: '1px solid #334155' },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    padding: '10px 24px',
    background: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  divider: {
    width: 1, height: 24, background: '#334155', margin: '0 20px',
  },
  kpiStrip: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
    borderBottom: '1px solid #334155',
  },
  kpi: {
    padding: '16px 24px', background: '#1e293b',
    borderRight: '1px solid #334155',
  },
  kpiLabel: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 },
  kpiValue: { fontSize: 28, fontWeight: 800 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 20 },
  full: { gridColumn: '1 / -1' },
  half: { gridColumn: 'span 1' },
}
