// Mock data for Growth x Upsell dashboard
// Cohorts: SMB+C (Small/Medium Business + Commercial), Enterprise, Consumer
// Tiers: Starter, Premium

export const COHORTS = [
  { id: 'all',        label: 'All Cohorts', color: '#818cf8' },
  { id: 'smbc',       label: 'SMB + C',     color: '#34d399' },
  { id: 'enterprise', label: 'Enterprise',  color: '#60a5fa' },
  { id: 'consumer',   label: 'Consumer',    color: '#f472b6' },
]

// Monthly time-series: MAU growth + upsell conversion rate
export const timeSeriesData = [
  { month: 'Jan', smbc_mau: 120, enterprise_mau: 80,  consumer_mau: 310, smbc_upsell: 4.2, enterprise_upsell: 14.1, consumer_upsell: 1.8 },
  { month: 'Feb', smbc_mau: 138, enterprise_mau: 85,  consumer_mau: 345, smbc_upsell: 5.1, enterprise_upsell: 15.3, consumer_upsell: 2.0 },
  { month: 'Mar', smbc_mau: 155, enterprise_mau: 92,  consumer_mau: 390, smbc_upsell: 6.3, enterprise_upsell: 16.8, consumer_upsell: 2.4 },
  { month: 'Apr', smbc_mau: 170, enterprise_mau: 99,  consumer_mau: 420, smbc_upsell: 7.0, enterprise_upsell: 18.0, consumer_upsell: 2.1 },
  { month: 'May', smbc_mau: 192, enterprise_mau: 108, consumer_mau: 470, smbc_upsell: 7.8, enterprise_upsell: 19.5, consumer_upsell: 2.6 },
  { month: 'Jun', smbc_mau: 215, enterprise_mau: 115, consumer_mau: 520, smbc_upsell: 8.3, enterprise_upsell: 22.0, consumer_upsell: 2.1 },
]

// Funnel stages per cohort (counts in thousands)
export const funnelData = {
  smbc: [
    { stage: 'New Users',       value: 215 },
    { stage: 'Active (WAU)',    value: 162 },
    { stage: 'Engaged',         value: 98  },
    { stage: 'Upsell Triggered',value: 41  },
    { stage: 'Converted',       value: 18  },
  ],
  enterprise: [
    { stage: 'New Users',       value: 115 },
    { stage: 'Active (WAU)',    value: 101 },
    { stage: 'Engaged',         value: 88  },
    { stage: 'Upsell Triggered',value: 52  },
    { stage: 'Converted',       value: 25  },
  ],
  consumer: [
    { stage: 'New Users',       value: 520 },
    { stage: 'Active (WAU)',    value: 340 },
    { stage: 'Engaged',         value: 140 },
    { stage: 'Upsell Triggered',value: 32  },
    { stage: 'Converted',       value: 11  },
  ],
}

// Cohort health scorecard
export const scorecardData = [
  {
    cohort:        'SMB + C',
    color:         '#34d399',
    momGrowth:     '+12.0%',
    upsellRate:    '8.3%',
    avgDaysUpsell: '14 days',
    churnRisk:     'Medium',
    churnColor:    '#fbbf24',
    mau:           '215K',
    revenueShare:  '31%',
  },
  {
    cohort:        'Enterprise',
    color:         '#60a5fa',
    momGrowth:     '+6.5%',
    upsellRate:    '22.0%',
    avgDaysUpsell: '45 days',
    churnRisk:     'Low',
    churnColor:    '#34d399',
    mau:           '115K',
    revenueShare:  '52%',
  },
  {
    cohort:        'Consumer',
    color:         '#f472b6',
    momGrowth:     '+10.6%',
    upsellRate:    '2.1%',
    avgDaysUpsell: '7 days',
    churnRisk:     'High',
    churnColor:    '#f87171',
    mau:           '520K',
    revenueShare:  '17%',
  },
]

// Leading indicators: feature adoption driving upsell
export const leadingIndicatorsData = [
  { feature: 'Chat (deep)',       smbc: 72, enterprise: 88, consumer: 45 },
  { feature: 'Code Completions',  smbc: 65, enterprise: 91, consumer: 30 },
  { feature: 'Inline Edit',       smbc: 58, enterprise: 79, consumer: 22 },
  { feature: 'Agent Mode',        smbc: 41, enterprise: 63, consumer: 12 },
  { feature: 'Extensions',        smbc: 35, enterprise: 55, consumer: 8  },
  { feature: 'Seat Expansion',    smbc: 29, enterprise: 47, consumer: 5  },
]

// Revenue attribution: organic growth vs upsell-driven
export const revenueAttributionData = [
  { cohort: 'SMB + C',    organic: 4.2, upsell: 2.8  },
  { cohort: 'Enterprise', organic: 6.1, upsell: 9.4  },
  { cohort: 'Consumer',   organic: 8.3, upsell: 0.9  },
]

// ─── Tier data: Starter vs Premium per cohort ──────────────────────────────
// Metrics per month:
//   newUsers          – new sign-ups (K)
//   winback           – reactivated churned users (K)
//   chatActivRate     – % of new users with first chat within 7 days
//   avgDaysActivation – avg days from sign-up to first chat
//   dau               – daily active users (K)
//   wau               – weekly active users (K)
//   churnRate         – % of users who churned that month
//   upsellToPremium   – % of Starter users who upgraded (Starter only; Premium = upgrade from elsewhere)
//   avgSessionsPerWeek– avg sessions per active user per week
//   revenuePerUser    – avg monthly revenue per user ($)
//   featureDepth      – avg # of distinct Copilot features used (scale 1–10)

const MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
]
const makeSeries = (rows) => rows.map((r, i) => ({ month: MONTHS[i], ...r }))

export const tierTimeSeriesData = {
  // ── SMB + C ──────────────────────────────────────────────────────────────
  smbc: {
    starter: makeSeries([
      { newUsers: 38, winback: 6,  chatActivRate: 48, avgDaysActivation: 5.1, dau: 22, wau: 68,  churnRate: 8.2, upsellToPremium: 2.1, avgSessionsPerWeek: 2.8, revenuePerUser: 12,  featureDepth: 2.4 },
      { newUsers: 43, winback: 7,  chatActivRate: 51, avgDaysActivation: 4.8, dau: 25, wau: 72,  churnRate: 7.8, upsellToPremium: 2.4, avgSessionsPerWeek: 3.0, revenuePerUser: 12,  featureDepth: 2.6 },
      { newUsers: 49, winback: 9,  chatActivRate: 53, avgDaysActivation: 4.5, dau: 28, wau: 78,  churnRate: 7.5, upsellToPremium: 2.8, avgSessionsPerWeek: 3.2, revenuePerUser: 12,  featureDepth: 2.8 },
      { newUsers: 52, winback: 10, chatActivRate: 55, avgDaysActivation: 4.2, dau: 30, wau: 82,  churnRate: 7.1, upsellToPremium: 3.2, avgSessionsPerWeek: 3.4, revenuePerUser: 12,  featureDepth: 3.0 },
      { newUsers: 58, winback: 11, chatActivRate: 57, avgDaysActivation: 4.0, dau: 33, wau: 88,  churnRate: 6.8, upsellToPremium: 3.5, avgSessionsPerWeek: 3.6, revenuePerUser: 12,  featureDepth: 3.2 },
      { newUsers: 63, winback: 13, chatActivRate: 60, avgDaysActivation: 3.7, dau: 37, wau: 94,  churnRate: 6.5, upsellToPremium: 3.9, avgSessionsPerWeek: 3.9, revenuePerUser: 12,  featureDepth: 3.4 },
      { newUsers: 67, winback: 14, chatActivRate: 62, avgDaysActivation: 3.5, dau: 40, wau: 99,  churnRate: 6.2, upsellToPremium: 4.2, avgSessionsPerWeek: 4.1, revenuePerUser: 12,  featureDepth: 3.6 },
      { newUsers: 71, winback: 15, chatActivRate: 64, avgDaysActivation: 3.3, dau: 43, wau: 104, churnRate: 5.9, upsellToPremium: 4.5, avgSessionsPerWeek: 4.3, revenuePerUser: 12,  featureDepth: 3.8 },
      { newUsers: 74, winback: 16, chatActivRate: 66, avgDaysActivation: 3.1, dau: 46, wau: 109, churnRate: 5.7, upsellToPremium: 4.8, avgSessionsPerWeek: 4.5, revenuePerUser: 12,  featureDepth: 4.0 },
      { newUsers: 78, winback: 17, chatActivRate: 68, avgDaysActivation: 2.9, dau: 49, wau: 113, churnRate: 5.4, upsellToPremium: 5.1, avgSessionsPerWeek: 4.7, revenuePerUser: 12,  featureDepth: 4.2 },
      { newUsers: 82, winback: 18, chatActivRate: 70, avgDaysActivation: 2.7, dau: 52, wau: 118, churnRate: 5.1, upsellToPremium: 5.4, avgSessionsPerWeek: 4.9, revenuePerUser: 12,  featureDepth: 4.4 },
      { newUsers: 87, winback: 20, chatActivRate: 72, avgDaysActivation: 2.5, dau: 56, wau: 124, churnRate: 4.9, upsellToPremium: 5.8, avgSessionsPerWeek: 5.1, revenuePerUser: 12,  featureDepth: 4.6 },
    ]),
    premium: makeSeries([
      { newUsers: 14, winback: 2,  chatActivRate: 74, avgDaysActivation: 2.1, dau: 44, wau: 88,  churnRate: 3.1, upsellToPremium: null, avgSessionsPerWeek: 6.2, revenuePerUser: 38, featureDepth: 6.1 },
      { newUsers: 16, winback: 3,  chatActivRate: 77, avgDaysActivation: 1.9, dau: 47, wau: 91,  churnRate: 2.9, upsellToPremium: null, avgSessionsPerWeek: 6.5, revenuePerUser: 38, featureDepth: 6.3 },
      { newUsers: 19, winback: 3,  chatActivRate: 79, avgDaysActivation: 1.8, dau: 51, wau: 94,  churnRate: 2.7, upsellToPremium: null, avgSessionsPerWeek: 6.8, revenuePerUser: 38, featureDepth: 6.5 },
      { newUsers: 21, winback: 4,  chatActivRate: 81, avgDaysActivation: 1.6, dau: 54, wau: 96,  churnRate: 2.5, upsellToPremium: null, avgSessionsPerWeek: 7.0, revenuePerUser: 38, featureDepth: 6.7 },
      { newUsers: 24, winback: 4,  chatActivRate: 83, avgDaysActivation: 1.5, dau: 58, wau: 97,  churnRate: 2.3, upsellToPremium: null, avgSessionsPerWeek: 7.2, revenuePerUser: 38, featureDepth: 6.9 },
      { newUsers: 27, winback: 5,  chatActivRate: 86, avgDaysActivation: 1.3, dau: 63, wau: 98,  churnRate: 2.1, upsellToPremium: null, avgSessionsPerWeek: 7.5, revenuePerUser: 38, featureDepth: 7.1 },
      { newUsers: 30, winback: 5,  chatActivRate: 87, avgDaysActivation: 1.2, dau: 66, wau: 100, churnRate: 2.0, upsellToPremium: null, avgSessionsPerWeek: 7.7, revenuePerUser: 38, featureDepth: 7.3 },
      { newUsers: 33, winback: 6,  chatActivRate: 88, avgDaysActivation: 1.1, dau: 70, wau: 102, churnRate: 1.9, upsellToPremium: null, avgSessionsPerWeek: 7.9, revenuePerUser: 38, featureDepth: 7.5 },
      { newUsers: 36, winback: 6,  chatActivRate: 89, avgDaysActivation: 1.1, dau: 73, wau: 104, churnRate: 1.8, upsellToPremium: null, avgSessionsPerWeek: 8.1, revenuePerUser: 38, featureDepth: 7.7 },
      { newUsers: 39, winback: 7,  chatActivRate: 90, avgDaysActivation: 1.0, dau: 77, wau: 106, churnRate: 1.7, upsellToPremium: null, avgSessionsPerWeek: 8.3, revenuePerUser: 38, featureDepth: 7.9 },
      { newUsers: 42, winback: 8,  chatActivRate: 91, avgDaysActivation: 1.0, dau: 81, wau: 108, churnRate: 1.6, upsellToPremium: null, avgSessionsPerWeek: 8.5, revenuePerUser: 38, featureDepth: 8.1 },
      { newUsers: 46, winback: 9,  chatActivRate: 92, avgDaysActivation: 0.9, dau: 85, wau: 111, churnRate: 1.5, upsellToPremium: null, avgSessionsPerWeek: 8.7, revenuePerUser: 38, featureDepth: 8.3 },
    ]),
  },

  // ── Enterprise ───────────────────────────────────────────────────────────
  enterprise: {
    starter: makeSeries([
      { newUsers: 18, winback: 3,  chatActivRate: 55, avgDaysActivation: 6.2, dau: 38, wau: 74,  churnRate: 4.8, upsellToPremium: 3.5, avgSessionsPerWeek: 3.9, revenuePerUser: 22, featureDepth: 3.8 },
      { newUsers: 20, winback: 3,  chatActivRate: 58, avgDaysActivation: 5.8, dau: 41, wau: 77,  churnRate: 4.5, upsellToPremium: 3.8, avgSessionsPerWeek: 4.1, revenuePerUser: 22, featureDepth: 4.0 },
      { newUsers: 22, winback: 4,  chatActivRate: 61, avgDaysActivation: 5.5, dau: 44, wau: 80,  churnRate: 4.2, upsellToPremium: 4.1, avgSessionsPerWeek: 4.3, revenuePerUser: 22, featureDepth: 4.2 },
      { newUsers: 24, winback: 4,  chatActivRate: 63, avgDaysActivation: 5.1, dau: 46, wau: 82,  churnRate: 4.0, upsellToPremium: 4.5, avgSessionsPerWeek: 4.5, revenuePerUser: 22, featureDepth: 4.4 },
      { newUsers: 26, winback: 5,  chatActivRate: 66, avgDaysActivation: 4.8, dau: 50, wau: 85,  churnRate: 3.7, upsellToPremium: 4.8, avgSessionsPerWeek: 4.8, revenuePerUser: 22, featureDepth: 4.6 },
      { newUsers: 28, winback: 6,  chatActivRate: 68, avgDaysActivation: 4.5, dau: 53, wau: 88,  churnRate: 3.5, upsellToPremium: 5.2, avgSessionsPerWeek: 5.0, revenuePerUser: 22, featureDepth: 4.8 },
      { newUsers: 30, winback: 6,  chatActivRate: 70, avgDaysActivation: 4.2, dau: 56, wau: 91,  churnRate: 3.3, upsellToPremium: 5.5, avgSessionsPerWeek: 5.2, revenuePerUser: 22, featureDepth: 5.0 },
      { newUsers: 32, winback: 7,  chatActivRate: 72, avgDaysActivation: 4.0, dau: 59, wau: 93,  churnRate: 3.1, upsellToPremium: 5.8, avgSessionsPerWeek: 5.4, revenuePerUser: 22, featureDepth: 5.2 },
      { newUsers: 34, winback: 7,  chatActivRate: 74, avgDaysActivation: 3.7, dau: 62, wau: 96,  churnRate: 2.9, upsellToPremium: 6.2, avgSessionsPerWeek: 5.6, revenuePerUser: 22, featureDepth: 5.4 },
      { newUsers: 36, winback: 8,  chatActivRate: 76, avgDaysActivation: 3.5, dau: 65, wau: 99,  churnRate: 2.7, upsellToPremium: 6.5, avgSessionsPerWeek: 5.8, revenuePerUser: 22, featureDepth: 5.6 },
      { newUsers: 38, winback: 9,  chatActivRate: 77, avgDaysActivation: 3.3, dau: 68, wau: 101, churnRate: 2.5, upsellToPremium: 6.9, avgSessionsPerWeek: 6.0, revenuePerUser: 22, featureDepth: 5.8 },
      { newUsers: 41, winback: 10, chatActivRate: 79, avgDaysActivation: 3.1, dau: 71, wau: 104, churnRate: 2.3, upsellToPremium: 7.3, avgSessionsPerWeek: 6.2, revenuePerUser: 22, featureDepth: 6.0 },
    ]),
    premium: makeSeries([
      { newUsers: 9,  winback: 2,  chatActivRate: 88, avgDaysActivation: 1.2, dau: 72, wau: 97,  churnRate: 1.4, upsellToPremium: null, avgSessionsPerWeek: 9.1, revenuePerUser: 72, featureDepth: 8.2 },
      { newUsers: 10, winback: 2,  chatActivRate: 90, avgDaysActivation: 1.1, dau: 75, wau: 98,  churnRate: 1.3, upsellToPremium: null, avgSessionsPerWeek: 9.3, revenuePerUser: 72, featureDepth: 8.4 },
      { newUsers: 12, winback: 2,  chatActivRate: 91, avgDaysActivation: 1.0, dau: 79, wau: 98,  churnRate: 1.2, upsellToPremium: null, avgSessionsPerWeek: 9.5, revenuePerUser: 72, featureDepth: 8.5 },
      { newUsers: 13, winback: 3,  chatActivRate: 92, avgDaysActivation: 0.9, dau: 82, wau: 99,  churnRate: 1.1, upsellToPremium: null, avgSessionsPerWeek: 9.6, revenuePerUser: 72, featureDepth: 8.7 },
      { newUsers: 14, winback: 3,  chatActivRate: 93, avgDaysActivation: 0.9, dau: 85, wau: 99,  churnRate: 1.0, upsellToPremium: null, avgSessionsPerWeek: 9.7, revenuePerUser: 72, featureDepth: 8.8 },
      { newUsers: 16, winback: 4,  chatActivRate: 95, avgDaysActivation: 0.8, dau: 89, wau: 99,  churnRate: 0.9, upsellToPremium: null, avgSessionsPerWeek: 9.8, revenuePerUser: 72, featureDepth: 9.0 },
      { newUsers: 17, winback: 4,  chatActivRate: 95, avgDaysActivation: 0.8, dau: 91, wau: 100, churnRate: 0.9, upsellToPremium: null, avgSessionsPerWeek: 9.9, revenuePerUser: 72, featureDepth: 9.1 },
      { newUsers: 18, winback: 4,  chatActivRate: 96, avgDaysActivation: 0.7, dau: 93, wau: 100, churnRate: 0.8, upsellToPremium: null, avgSessionsPerWeek: 10.0,revenuePerUser: 72, featureDepth: 9.2 },
      { newUsers: 19, winback: 5,  chatActivRate: 96, avgDaysActivation: 0.7, dau: 95, wau: 100, churnRate: 0.8, upsellToPremium: null, avgSessionsPerWeek: 10.1,revenuePerUser: 72, featureDepth: 9.3 },
      { newUsers: 20, winback: 5,  chatActivRate: 97, avgDaysActivation: 0.7, dau: 97, wau: 100, churnRate: 0.7, upsellToPremium: null, avgSessionsPerWeek: 10.2,revenuePerUser: 72, featureDepth: 9.4 },
      { newUsers: 21, winback: 5,  chatActivRate: 97, avgDaysActivation: 0.6, dau: 98, wau: 100, churnRate: 0.7, upsellToPremium: null, avgSessionsPerWeek: 10.3,revenuePerUser: 72, featureDepth: 9.5 },
      { newUsers: 23, winback: 6,  chatActivRate: 98, avgDaysActivation: 0.6, dau: 99, wau: 100, churnRate: 0.6, upsellToPremium: null, avgSessionsPerWeek: 10.4,revenuePerUser: 72, featureDepth: 9.6 },
    ]),
  },

  // ── Consumer ─────────────────────────────────────────────────────────────
  consumer: {
    starter: makeSeries([
      { newUsers: 88,  winback: 22, chatActivRate: 31, avgDaysActivation: 8.4, dau: 55,  wau: 140, churnRate: 14.2, upsellToPremium: 0.8, avgSessionsPerWeek: 1.9, revenuePerUser: 0,  featureDepth: 1.4 },
      { newUsers: 96,  winback: 25, chatActivRate: 33, avgDaysActivation: 8.0, dau: 60,  wau: 152, churnRate: 13.8, upsellToPremium: 0.9, avgSessionsPerWeek: 2.0, revenuePerUser: 0,  featureDepth: 1.5 },
      { newUsers: 108, winback: 29, chatActivRate: 35, avgDaysActivation: 7.6, dau: 66,  wau: 168, churnRate: 13.2, upsellToPremium: 1.0, avgSessionsPerWeek: 2.2, revenuePerUser: 0,  featureDepth: 1.6 },
      { newUsers: 116, winback: 31, chatActivRate: 36, avgDaysActivation: 7.2, dau: 70,  wau: 178, churnRate: 12.7, upsellToPremium: 1.1, avgSessionsPerWeek: 2.3, revenuePerUser: 0,  featureDepth: 1.7 },
      { newUsers: 128, winback: 34, chatActivRate: 38, avgDaysActivation: 6.9, dau: 77,  wau: 192, churnRate: 12.2, upsellToPremium: 1.2, avgSessionsPerWeek: 2.5, revenuePerUser: 0,  featureDepth: 1.8 },
      { newUsers: 138, winback: 38, chatActivRate: 40, avgDaysActivation: 6.5, dau: 83,  wau: 205, churnRate: 11.8, upsellToPremium: 1.3, avgSessionsPerWeek: 2.6, revenuePerUser: 0,  featureDepth: 1.9 },
      { newUsers: 148, winback: 41, chatActivRate: 41, avgDaysActivation: 6.2, dau: 89,  wau: 218, churnRate: 11.4, upsellToPremium: 1.4, avgSessionsPerWeek: 2.8, revenuePerUser: 0,  featureDepth: 2.0 },
      { newUsers: 158, winback: 44, chatActivRate: 43, avgDaysActivation: 5.9, dau: 95,  wau: 231, churnRate: 11.0, upsellToPremium: 1.5, avgSessionsPerWeek: 2.9, revenuePerUser: 0,  featureDepth: 2.1 },
      { newUsers: 168, winback: 47, chatActivRate: 44, avgDaysActivation: 5.6, dau: 101, wau: 244, churnRate: 10.6, upsellToPremium: 1.6, avgSessionsPerWeek: 3.1, revenuePerUser: 0,  featureDepth: 2.2 },
      { newUsers: 178, winback: 50, chatActivRate: 46, avgDaysActivation: 5.3, dau: 107, wau: 257, churnRate: 10.2, upsellToPremium: 1.7, avgSessionsPerWeek: 3.2, revenuePerUser: 0,  featureDepth: 2.3 },
      { newUsers: 188, winback: 53, chatActivRate: 47, avgDaysActivation: 5.0, dau: 113, wau: 270, churnRate: 9.8,  upsellToPremium: 1.8, avgSessionsPerWeek: 3.4, revenuePerUser: 0,  featureDepth: 2.4 },
      { newUsers: 199, winback: 57, chatActivRate: 49, avgDaysActivation: 4.8, dau: 120, wau: 284, churnRate: 9.5,  upsellToPremium: 1.9, avgSessionsPerWeek: 3.5, revenuePerUser: 0,  featureDepth: 2.5 },
    ]),
    premium: makeSeries([
      { newUsers: 22, winback: 5,  chatActivRate: 62, avgDaysActivation: 3.2, dau: 38,  wau: 74,  churnRate: 5.8, upsellToPremium: null, avgSessionsPerWeek: 4.8, revenuePerUser: 19, featureDepth: 5.0 },
      { newUsers: 25, winback: 6,  chatActivRate: 65, avgDaysActivation: 3.0, dau: 42,  wau: 80,  churnRate: 5.5, upsellToPremium: null, avgSessionsPerWeek: 5.0, revenuePerUser: 19, featureDepth: 5.2 },
      { newUsers: 29, winback: 7,  chatActivRate: 67, avgDaysActivation: 2.8, dau: 46,  wau: 86,  churnRate: 5.2, upsellToPremium: null, avgSessionsPerWeek: 5.2, revenuePerUser: 19, featureDepth: 5.4 },
      { newUsers: 32, winback: 8,  chatActivRate: 69, avgDaysActivation: 2.6, dau: 50,  wau: 92,  churnRate: 5.0, upsellToPremium: null, avgSessionsPerWeek: 5.4, revenuePerUser: 19, featureDepth: 5.6 },
      { newUsers: 36, winback: 9,  chatActivRate: 71, avgDaysActivation: 2.4, dau: 55,  wau: 98,  churnRate: 4.7, upsellToPremium: null, avgSessionsPerWeek: 5.6, revenuePerUser: 19, featureDepth: 5.8 },
      { newUsers: 40, winback: 10, chatActivRate: 73, avgDaysActivation: 2.2, dau: 60,  wau: 104, churnRate: 4.5, upsellToPremium: null, avgSessionsPerWeek: 5.8, revenuePerUser: 19, featureDepth: 6.0 },
      { newUsers: 44, winback: 11, chatActivRate: 74, avgDaysActivation: 2.1, dau: 64,  wau: 110, churnRate: 4.3, upsellToPremium: null, avgSessionsPerWeek: 6.0, revenuePerUser: 19, featureDepth: 6.2 },
      { newUsers: 48, winback: 12, chatActivRate: 76, avgDaysActivation: 2.0, dau: 69,  wau: 116, churnRate: 4.1, upsellToPremium: null, avgSessionsPerWeek: 6.2, revenuePerUser: 19, featureDepth: 6.4 },
      { newUsers: 52, winback: 13, chatActivRate: 77, avgDaysActivation: 1.9, dau: 73,  wau: 122, churnRate: 3.9, upsellToPremium: null, avgSessionsPerWeek: 6.4, revenuePerUser: 19, featureDepth: 6.6 },
      { newUsers: 56, winback: 14, chatActivRate: 79, avgDaysActivation: 1.8, dau: 78,  wau: 128, churnRate: 3.7, upsellToPremium: null, avgSessionsPerWeek: 6.6, revenuePerUser: 19, featureDepth: 6.8 },
      { newUsers: 60, winback: 15, chatActivRate: 80, avgDaysActivation: 1.7, dau: 83,  wau: 135, churnRate: 3.5, upsellToPremium: null, avgSessionsPerWeek: 6.8, revenuePerUser: 19, featureDepth: 7.0 },
      { newUsers: 65, winback: 17, chatActivRate: 82, avgDaysActivation: 1.6, dau: 88,  wau: 142, churnRate: 3.3, upsellToPremium: null, avgSessionsPerWeek: 7.0, revenuePerUser: 19, featureDepth: 7.2 },
    ]),
  },
}

// Latest-month (Dec) KPI snapshot per cohort × tier
export const tierKPIs = {
  smbc: {
    starter: { newUsers: '87K',  winback: '20K', chatActivRate: '72%', avgDaysActivation: '2.5d', dau: '56K',  wau: '124K', dauMau: '19%', churnRate: '4.9%', upsellToPremium: '5.8%', avgSessions: '5.1/wk', revenuePerUser: '$12',  featureDepth: '4.6' },
    premium: { newUsers: '46K',  winback: '9K',  chatActivRate: '92%', avgDaysActivation: '0.9d', dau: '85K',  wau: '111K', dauMau: '38%', churnRate: '1.5%', upsellToPremium: 'N/A',   avgSessions: '8.7/wk', revenuePerUser: '$38',  featureDepth: '8.3' },
  },
  enterprise: {
    starter: { newUsers: '41K',  winback: '10K', chatActivRate: '79%', avgDaysActivation: '3.1d', dau: '71K',  wau: '104K', dauMau: '44%', churnRate: '2.3%', upsellToPremium: '7.3%', avgSessions: '6.2/wk', revenuePerUser: '$22',  featureDepth: '6.0' },
    premium: { newUsers: '23K',  winback: '6K',  chatActivRate: '98%', avgDaysActivation: '0.6d', dau: '99K',  wau: '100K', dauMau: '82%', churnRate: '0.6%', upsellToPremium: 'N/A',   avgSessions: '10.4/wk',revenuePerUser: '$72',  featureDepth: '9.6' },
  },
  consumer: {
    starter: { newUsers: '199K', winback: '57K', chatActivRate: '49%', avgDaysActivation: '4.8d', dau: '120K', wau: '284K', dauMau: '16%', churnRate: '9.5%', upsellToPremium: '1.9%', avgSessions: '3.5/wk', revenuePerUser: '$0',   featureDepth: '2.5' },
    premium: { newUsers: '65K',  winback: '17K', chatActivRate: '82%', avgDaysActivation: '1.6d', dau: '88K',  wau: '142K', dauMau: '23%', churnRate: '3.3%', upsellToPremium: 'N/A',   avgSessions: '7.0/wk', revenuePerUser: '$19',  featureDepth: '7.2' },
  },
}
