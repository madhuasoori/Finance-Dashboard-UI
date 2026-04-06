import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { 
  AreaChart, Area, ResponsiveContainer, CartesianGrid, YAxis, XAxis, Tooltip
} from 'recharts';
import { Wallet, FileText, ArrowRight, TrendingUp, TrendingDown, Building2, LayoutDashboard, Coins, Briefcase } from 'lucide-react';
import { AllocationAnalysisModal } from './AllocationAnalysisModal';
import '../components.css';

export const Dashboard = ({ setActiveView }) => {
  const { transactions, userProfile, activeCardId, cards } = useContext(FinanceContext);
  const [chartRange, setChartRange] = useState('ALL');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Filter transactions based on active card
  const filteredTransactions = activeCardId === 'all' 
    ? transactions 
    : transactions.filter(t => t.cardId === activeCardId);

  // CARD-SPECIFIC IDENTITIES
  const CARD_BASELINE = {
    'all': { baseAsset: 84200000, multiplier: 1, labels: ['Real Estate', 'Equities', 'Cash Reserve', 'Digital Assets'], pcts: [45, 32, 15, 8] },
    'card_1': { baseAsset: 58000000, multiplier: 0.7, labels: ['Real Estate', 'Equities', 'Private Equity', 'Venture'], pcts: [60, 25, 10, 5] },
    'card_2': { baseAsset: 26200000, multiplier: 0.3, labels: ['Digital Assets', 'Equities', 'Cash Reserve', 'Commodities'], pcts: [40, 30, 20, 10] }
  };

  const iden = CARD_BASELINE[activeCardId] || CARD_BASELINE['all'];

  // Dynamic Chart Data mapping (based on card identity)
  const chartDataMap = {
    '6M': [
      { name: 'JUL', val: 38 * iden.multiplier }, { name: 'AUG', val: 42 * iden.multiplier }, { name: 'SEP', val: 45 * iden.multiplier },
      { name: 'OCT', val: 52 * iden.multiplier }, { name: 'NOV', val: 56 * iden.multiplier }, { name: 'DEC', val: 60 * iden.multiplier }
    ],
    '1Y': [
      { name: 'JAN', val: 20 * iden.multiplier }, { name: 'FEB', val: 22 * iden.multiplier }, { name: 'MAR', val: 20 * iden.multiplier },
      { name: 'APR', val: 25 * iden.multiplier }, { name: 'MAY', val: 28 * iden.multiplier }, { name: 'JUN', val: 32 * iden.multiplier },
      { name: 'JUL', val: 38 * iden.multiplier }, { name: 'AUG', val: 42 * iden.multiplier }, { name: 'SEP', val: 45 * iden.multiplier },
      { name: 'OCT', val: 52 * iden.multiplier }, { name: 'NOV', val: 56 * iden.multiplier }, { name: 'DEC', val: 60 * iden.multiplier }
    ],
    'ALL': [
      { name: '2021', val: 12 * iden.multiplier }, { name: '2022', val: 24 * iden.multiplier }, { name: '2023', val: 45 * iden.multiplier }, { name: '2024', val: 60 * iden.multiplier }
    ]
  };

  const areaData = chartDataMap[chartRange] || chartDataMap['ALL'];

  const allocations = iden.labels.map((label, idx) => ({
    name: label,
    pct: iden.pcts[idx],
    icon: label.includes('Real Estate') ? <Building2 size={16} /> : 
          label.includes('Equities') ? <TrendingUp size={16} /> : 
          label.includes('Cash') ? <Coins size={16} /> : <Briefcase size={16} />
  }));

  // CALCULATE LIVE METRICS (Current Month Only for "Monthly" labels)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = filteredTransactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0);
    
  const totalExpense = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const netDelta = totalIncome - totalExpense;
  const liveTotalAsset = iden.baseAsset + netDelta;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <AllocationAnalysisModal 
        show={showAnalysis} 
        onClose={() => setShowAnalysis(false)} 
      />

      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div className="page-title-group">
          <span className="page-subtitle" style={{ color: 'var(--brand-green)' }}>PORTFOLIO OVERVIEW</span>
          <h1 className="page-title">Hello, {userProfile.name.split(' ')[0]}.</h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
          <div style={{ color: 'var(--text-secondary)' }}>Last updated</div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Today, 10:45 AM</div>
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid-3-col">
        
        {/* Dark Card */}
        <div className="card" style={{ backgroundColor: 'var(--dark-card-bg)', color: 'white', padding: '1.5rem 2rem', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Total Assets</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
            {liveTotalAsset.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
            <TrendingUp size={14} style={{ marginRight: '6px' }} /> {(4.2 + iden.multiplier * 2).toFixed(1)}% this quarter
          </div>
        </div>

        {/* Regular Metric 1 */}
        <div className="card" style={{ padding: '1.5rem 2rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: 'var(--brand-light-green)', padding: '0.75rem', borderRadius: '8px' }}>
              <Wallet size={20} color="var(--brand-green)" />
            </div>
            <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
              +4.2%
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Monthly Income</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              {totalIncome.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        {/* Regular Metric 2 */}
        <div className="card" style={{ padding: '1.5rem 2rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: 'var(--danger-bg)', padding: '0.75rem', borderRadius: '8px' }}>
              <TrendingDown size={20} color="var(--danger-text)" />
            </div>
            <div style={{ color: 'var(--danger-text)', fontSize: '0.85rem', fontWeight: 600 }}>
              -1.8%
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Monthly Expenses</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              {totalExpense.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

      </div>

      {/* Charts row */}
      <div className="grid-2-col-content" style={{ marginTop: '1rem' }}>
        
        {/* Area Chart Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0 }}>
              Wealth Projection <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>({activeCardId === 'all' ? 'All Accounts' : cards.find(c => c.id === activeCardId)?.name})</span>
            </h3>
            <div style={{ display: 'flex', background: 'var(--bg-panel-hover)', borderRadius: '100px', padding: '0.25rem', gap: '0.25rem' }}>
              {['6M', '1Y', 'ALL'].map(r => (
                <button 
                  key={r}
                  onClick={() => setChartRange(r)}
                  style={{
                    padding: '0.25rem 1rem', fontSize: '0.75rem', fontWeight: 600, border: 'none',
                    borderRadius: '100px', cursor: 'pointer',
                    background: chartRange === r ? 'var(--bg-panel)' : 'transparent',
                    color: chartRange === r ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: chartRange === r ? 'var(--shadow-sm)' : 'none'
                  }}
                >{r}</button>
              ))}
            </div>
          </div>
          <div style={{ height: '320px', width: '100%', background: 'var(--bg-panel)', borderRadius: '12px', padding: '1rem 0' }}>
            <ResponsiveContainer>
              <AreaChart data={areaData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand-green)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="var(--brand-green)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border-color)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--text-secondary)', dy: 10 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} 
                  tickFormatter={(val) => '₹' + val + 'L'} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', fontWeight: 600 }}
                  formatter={(value) => [`₹${value}L`, 'Value']}
                />
                <Area type="monotone" dataKey="val" stroke="var(--brand-green)" strokeWidth={3} fillOpacity={1} fill="url(#colorBrand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Asset Allocation + Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, marginBottom: '1.5rem' }}>Asset Allocation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {allocations.map((item, idx) => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ background: idx === 0 ? 'var(--dark-card-bg)' : idx === 1 ? 'var(--brand-green)' : idx === 2 ? '#cbd5e1' : 'var(--brand-light-green)', color: idx < 2 ? '#fff' : 'var(--dark-card-bg)', padding: '0.4rem', borderRadius: '6px', display: 'flex' }}>
                        {item.icon}
                      </div>
                      {item.name}
                    </div>
                    <span>{item.pct}%</span>
                  </div>
                  <div style={{ height: '6px', width: '100%', background: 'var(--border-color)', borderRadius: '100px' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: idx === 0 ? 'var(--dark-card-bg)' : idx === 1 ? 'var(--brand-green)' : idx === 2 ? '#94a3b8' : 'var(--success)', borderRadius: '100px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--brand-light-green)', padding: '1.5rem', borderRadius: '12px', marginTop: 'auto' }}>
            <div style={{ fontWeight: 700, color: 'var(--brand-green)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Portfolio Insights</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--brand-green)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Your tech sector <strong>allocation is 12% higher</strong> than your target profile. Consider rebalancing.
            </p>
            <div 
              onClick={() => setShowAnalysis(true)}
              style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-green)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Run Analysis <ArrowRight size={14} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

