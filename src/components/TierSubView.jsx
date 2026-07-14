import React from 'react'
import {
  ComposedChart, BarChart, Bar, Line, LineChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'
import { tierTimeSeriesData, tierKPIs, COHORTS } from '../data/mockData'

const TIER_COLORS   = { starter: '#94a3b8', premium: '#f59e0b' }
const COHORT_COLORS = { smbc: '#34d399', enterprise: '#60a5fa', consumer: '#f472b6' }
const COHORT_LABELS = { smbc: 'SMB+C', enterprise: 'Enterprise', consumer: 'Consumer' }

const tt = {
  contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: 8 },
  labelStyle: { color: '#e2e8f0' },
}

// All-cohorts view: merge all 3 cohorts for a given tier into one series
function getAllCohortsSeries(tier) {
  const cohorts = ['smbc', 'enterprise', 'consumer']
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months.map((month, i) => {
    const row = { month }
    cohorts.forEach(c => {
      const d = tierTimeSeriesData[c][tier][i]
      Object.keys(d).forEach(k => { row[`${c}_${k}`] = d[k] })
    })
    return row
  })
}

// Single-cohort view: merge starter + premium into one series for side-by-side comparison
function getBothTiersSeries(cohort) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months.map((month, i) => {
    const s = tierTimeSeriesData[cohort].starter[i]
    const p = tierTimeSeriesData[cohort].premium[i]
    const row = { month }
    Object.keys(s).forEach(k => {
      row[`starter_${k}`] = s[k]
      row[`premium_${k}`] = p[k]
    })
    return row
  })
}

export default function TierSubView({ cohort, tier }) {
  const isAll     = cohort === 'all'
  const tierColor = TIER_COLORS[tier]
  const tierLabel = tier === 'starter' ? 'Starter' : 'Premium'

  const kpis         = !isAll ? tierKPIs[cohort]?.[tier] : null
  const cohortColor  = isAll ? tierColor : COHORT_COLORS[cohort]
  const cohortLabel  = COHORTS.find(c => c.id === cohort)?.label ?? cohort

  // Data series
  const allSeries    = isAll  ? getAllCohortsSeries(tier) : null
  const bothTiers    = !isAll ? getBothTiersSeries(cohort) : null

  return (
    <div style={container}>
      {/* Header */}
      <div style={sectionHeader}>
        <span style={{ ...tierBadge, background: tierColor + '22', color: tierColor, borderColor: tierColor + '55' }}>
          {tier === 'starter' ? '⭐' : '💎'} {tierLabel}
        </span>
        <span style={sectionTitle}>
          {isAll ? 'All Cohorts' : cohortLabel} · Detailed Metrics
        </span>
        {!isAll && <span style={hint}>Showing ⭐ Starter vs 💎 Premium</span>}
      </div>

      {/* KPI strip — single cohort only */}
      {!isAll && kpis && (
        <div style={kpiRow}>
          <MiniKPI label="New Users"        value={kpis.newUsers}          color={cohortColor} />
          <MiniKPI label="Winback"          value={kpis.winback}           color="#a78bfa"     />
          <MiniKPI label="Chat Activ. Rate" value={kpis.chatActivRate}     color="#34d399"     />
          <MiniKPI label="Days to 1st Chat" value={kpis.avgDaysActivation} color="#f87171"     />
          <MiniKPI label="DAU"              value={kpis.dau}               color="#60a5fa"     />
          <MiniKPI label="WAU"              value={kpis.wau}               color="#f472b6"     />
          <MiniKPI label="DAU/MAU"          value={kpis.dauMau}            color="#fbbf24"     />
          <MiniKPI label="Churn Rate"       value={kpis.churnRate}         color="#f87171"     />
          <MiniKPI label="→ Premium"        value={kpis.upsellToPremium}   color="#818cf8"     />
          <MiniKPI label="Sessions/Wk"      value={kpis.avgSessions}       color="#34d399"     />
          <MiniKPI label="Rev / User"       value={kpis.revenuePerUser}    color="#f59e0b"     />
          <MiniKPI label="Feature Depth"    value={kpis.featureDepth}      color="#94a3b8"     />
        </div>
      )}

      {/* Row 1: Top of funnel (3 panels) */}
      <div style={rowLabel}>🔼 Top of Funnel &amp; Activation</div>
      <div style={grid3}>

        {/* Panel: New Users */}
        <Panel title="New Users" subtitle="New sign-ups per month (K)">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="newUsers" fmt={v => `${v}K`} />
          ) : (
            <TierBarChart series={bothTiers} dataKey="newUsers" fmt={v => `${v}K`} />
          )}
        </Panel>

        {/* Panel: Winback */}
        <Panel title="Winback" subtitle="Re-activated churned users (K)">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="winback" fmt={v => `${v}K`} color2="#a78bfa" />
          ) : (
            <TierBarChart series={bothTiers} dataKey="winback" fmt={v => `${v}K`}
              starterColor="#a78bfa" premiumColor="#7c3aed" />
          )}
        </Panel>

        {/* Panel: Chat Activation */}
        <Panel title="Chat Activation" subtitle="Rate (%) &amp; avg days to first chat">
          {isAll ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={allSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} domain={[0, 100]} />
                <Tooltip {...tt} formatter={v => [`${v}%`, '']} />
                <Legend wrapperStyle={legendStyle} />
                {['smbc','enterprise','consumer'].map(c => (
                  <Line key={c} type="monotone" dataKey={`${c}_chatActivRate`}
                    name={COHORT_LABELS[c]} stroke={COHORT_COLORS[c]} strokeWidth={2} dot={{ r: 3 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={bothTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis yAxisId="rate" tick={axisTick} domain={[0, 100]}
                  label={{ value: 'Rate %', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                <YAxis yAxisId="days" orientation="right" tick={axisTick} domain={[0, 12]}
                  label={{ value: 'Days', angle: 90, position: 'insideRight', fill: '#64748b', fontSize: 10 }} />
                <Tooltip {...tt} />
                <Legend wrapperStyle={legendStyle} />
                <Line yAxisId="rate" type="monotone" dataKey="starter_chatActivRate"
                  name="⭐ Activ. Rate %" stroke={TIER_COLORS.starter} strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="rate" type="monotone" dataKey="premium_chatActivRate"
                  name="💎 Activ. Rate %" stroke={TIER_COLORS.premium} strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="days" type="monotone" dataKey="starter_avgDaysActivation"
                  name="⭐ Days to Chat" stroke={TIER_COLORS.starter} strokeWidth={1.5}
                  strokeDasharray="4 3" dot={{ r: 2 }} />
                <Line yAxisId="days" type="monotone" dataKey="premium_avgDaysActivation"
                  name="💎 Days to Chat" stroke={TIER_COLORS.premium} strokeWidth={1.5}
                  strokeDasharray="4 3" dot={{ r: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </Panel>
      </div>

      {/* Row 2: Engagement + Retention (2 wider panels) */}
      <div style={rowLabel}>🔁 Engagement &amp; Retention</div>
      <div style={grid2}>

        {/* Panel: Engagement — DAU */}
        <Panel title="Engagement — Daily Active Users" subtitle="DAU per cohort (K) · how often users return each day">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="dau" fmt={v => `${v}K`} height={220} />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={bothTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} />
                <Tooltip {...tt} formatter={v => [`${v}K`, '']} />
                <Legend wrapperStyle={legendStyle} />
                <Bar  dataKey="starter_dau" name="⭐ Starter DAU" fill={TIER_COLORS.starter} opacity={0.5} radius={[3,3,0,0]} />
                <Bar  dataKey="premium_dau" name="💎 Premium DAU" fill={TIER_COLORS.premium} opacity={0.5} radius={[3,3,0,0]} />
                <Line dataKey="starter_dau" name="" stroke={TIER_COLORS.starter} strokeWidth={2} dot={{ r: 3 }} type="monotone" legendType="none" />
                <Line dataKey="premium_dau" name="" stroke={TIER_COLORS.premium} strokeWidth={2} dot={{ r: 3 }} type="monotone" legendType="none" />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </Panel>

        {/* Panel: Retention — WAU */}
        <Panel title="Retention — Weekly Active Users" subtitle="WAU per cohort (K) · breadth of weekly habit formation">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="wau" fmt={v => `${v}K`} height={220} />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={bothTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} />
                <Tooltip {...tt} formatter={v => [`${v}K`, '']} />
                <Legend wrapperStyle={legendStyle} />
                <Bar  dataKey="starter_wau" name="⭐ Starter WAU" fill={TIER_COLORS.starter} opacity={0.4} radius={[3,3,0,0]} />
                <Bar  dataKey="premium_wau" name="💎 Premium WAU" fill={TIER_COLORS.premium} opacity={0.4} radius={[3,3,0,0]} />
                <Line dataKey="starter_wau" name="" stroke={TIER_COLORS.starter} strokeWidth={2} dot={{ r: 3 }} type="monotone" legendType="none" />
                <Line dataKey="premium_wau" name="" stroke={TIER_COLORS.premium} strokeWidth={2} dot={{ r: 3 }} type="monotone" legendType="none" />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </Panel>
      </div>

      {/* Row 3: Health signals — Churn, Upsell-to-Premium, Sessions, Feature Depth */}
      <div style={rowLabel}>📊 Health Signals</div>
      <div style={grid4}>

        {/* Churn Rate */}
        <Panel title="Churn Rate" subtitle="Monthly % of users lost">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="churnRate" fmt={v => `${v}%`} height={180} />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={bothTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} />
                <Tooltip {...tt} formatter={v => [`${v}%`, '']} />
                <Legend wrapperStyle={legendStyle} />
                <Line type="monotone" dataKey="starter_churnRate" name="⭐ Starter" stroke={TIER_COLORS.starter} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="premium_churnRate" name="💎 Premium" stroke={TIER_COLORS.premium} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Panel>

        {/* Upsell to Premium (Starter only) */}
        <Panel title="Starter → Premium Rate" subtitle="% of Starter users upgrading each month">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="upsellToPremium" fmt={v => v ? `${v}%` : '—'} height={180} />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={bothTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} />
                <Tooltip {...tt} formatter={v => [v ? `${v}%` : 'N/A (Premium)', '']} />
                <Legend wrapperStyle={legendStyle} />
                <Line type="monotone" dataKey="starter_upsellToPremium" name="⭐ Starter Upgrade %" stroke="#818cf8" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Panel>

        {/* Sessions per week */}
        <Panel title="Avg Sessions / Week" subtitle="Per active user — depth of usage habit">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="avgSessionsPerWeek" height={180} />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={bothTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} />
                <Tooltip {...tt} />
                <Legend wrapperStyle={legendStyle} />
                <Line type="monotone" dataKey="starter_avgSessionsPerWeek" name="⭐ Starter" stroke={TIER_COLORS.starter} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="premium_avgSessionsPerWeek" name="💎 Premium" stroke={TIER_COLORS.premium} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Panel>

        {/* Feature Depth */}
        <Panel title="Feature Depth" subtitle="Avg # of distinct Copilot features used (1–10)">
          {isAll ? (
            <CohortLineChart series={allSeries} dataKey="featureDepth" height={180} />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={bothTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} domain={[0, 10]} />
                <Tooltip {...tt} />
                <Legend wrapperStyle={legendStyle} />
                <Line type="monotone" dataKey="starter_featureDepth" name="⭐ Starter" stroke={TIER_COLORS.starter} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="premium_featureDepth" name="💎 Premium" stroke={TIER_COLORS.premium} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Panel>
      </div>
    </div>
  )
}

// ── Reusable chart: 3 cohort lines for "all" view ──────────────────────────
function CohortLineChart({ series, dataKey, fmt, height = 200, color2 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={series}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
        <XAxis dataKey="month" tick={axisTick} />
        <YAxis tick={axisTick} />
        <Tooltip {...tt} formatter={fmt ? (v => [fmt(v), '']) : undefined} />
        <Legend wrapperStyle={legendStyle} />
        {['smbc','enterprise','consumer'].map(c => (
          <Line key={c} type="monotone" dataKey={`${c}_${dataKey}`}
            name={COHORT_LABELS[c]}
            stroke={color2 && c === 'smbc' ? color2 : COHORT_COLORS[c]}
            strokeWidth={2} dot={{ r: 3 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

// ── Reusable chart: starter vs premium bars for single-cohort view ─────────
function TierBarChart({ series, dataKey, fmt, starterColor, premiumColor }) {
  const sc = starterColor ?? TIER_COLORS.starter
  const pc = premiumColor ?? TIER_COLORS.premium
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={series} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
        <XAxis dataKey="month" tick={axisTick} />
        <YAxis tick={axisTick} />
        <Tooltip {...tt} formatter={fmt ? (v => [fmt(v), '']) : undefined} />
        <Legend wrapperStyle={legendStyle} />
        <Bar dataKey={`starter_${dataKey}`} name="⭐ Starter" fill={sc} radius={[4,4,0,0]} />
        <Bar dataKey={`premium_${dataKey}`} name="💎 Premium" fill={pc} radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Helper components ──────────────────────────────────────────────────────
function Panel({ title, subtitle, children }) {
  return (
    <div style={panelCard}>
      <p style={panelTitle}>{title}</p>
      <p style={panelSub}>{subtitle}</p>
      {children}
    </div>
  )
}

function MiniKPI({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <p style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 800, color }}>{value}</p>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────
const container     = { background: '#1e293b', borderRadius: 12, border: '1px solid #334155', overflow: 'hidden' }
const sectionHeader = { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid #334155', background: '#0f172a' }
const tierBadge     = { fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20, border: '1px solid' }
const sectionTitle  = { fontSize: 14, fontWeight: 700, color: '#e2e8f0' }
const hint          = { fontSize: 11, color: '#64748b', marginLeft: 'auto' }
const kpiRow        = { display: 'flex', gap: 0, borderBottom: '1px solid #334155', padding: '12px 20px' }
const rowLabel      = { fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '10px 20px 0', background: '#0f172a', borderTop: '1px solid #334155' }
const grid3         = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#334155' }
const grid2         = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#334155' }
const grid4         = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#334155' }
const panelCard     = { background: '#1e293b', padding: '16px 18px' }
const panelTitle    = { fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }
const panelSub      = { fontSize: 11, color: '#64748b', marginBottom: 12 }
const axisTick      = { fill: '#94a3b8', fontSize: 11 }
const legendStyle   = { color: '#94a3b8', fontSize: 11 }
