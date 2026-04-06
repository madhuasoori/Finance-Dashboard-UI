import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { Lightbulb, TrendingDown, PieChart as PieIcon, TrendingUp, Target, Rocket, AlertTriangle, ShieldCheck, BarChart3, Fingerprint, Activity, Zap } from 'lucide-react';
import '../components.css';

export const Insights = () => {
  const { transactions, activeCardId, cards } = useContext(FinanceContext);

  const CARD_BASELINE = {
    'all': { name: 'All Accounts', baseAsset: 84200000, labels: ['Real Estate', 'Equities', 'Cash Reserve', 'Digital Assets'], pcts: [45, 32, 15, 8] },
    'card_1': { name: 'Visa Platinum', baseAsset: 58000000, labels: ['Real Estate', 'Equities', 'Private Equity', 'Venture'], pcts: [60, 25, 10, 5] },
    'card_2': { name: 'Mastercard Gold', baseAsset: 26200000, labels: ['Digital Assets', 'Equities', 'Cash Reserve', 'Commodities'], pcts: [40, 30, 20, 10] }
  };

  const iden = CARD_BASELINE[activeCardId] || CARD_BASELINE['all'];

  // FILTER FOR ACTIVE CARD
  const cardTransactions = useMemo(() => {
    return activeCardId === 'all' 
      ? transactions 
      : transactions.filter(t => t.cardId === activeCardId);
  }, [transactions, activeCardId]);

  const { topCategory, topAmount, largestExpense, totalIncome, totalExpense } = useMemo(() => {
    // CURRENT MONTH ONLY
    const now = new Date();
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();

    const monthly = cardTransactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === curMonth && d.getFullYear() === curYear;
    });

    const expenses = monthly.filter(t => t.type === 'expense');
    const income = monthly.filter(t => t.type === 'income');

    // Total income vs expense
    const tInc = income.reduce((sum, t) => sum + Number(t.amount), 0);
    const tExp = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

    if (expenses.length === 0) return { topCategory: 'None', topAmount: 0, largestExpense: null, totalIncome: tInc, totalExpense: tExp };

    // Highest category
    const catMap = {};
    expenses.forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });
    const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

    // Largest single expense
    const largest = [...expenses].sort((a, b) => b.amount - a.amount)[0];

    return {
      topCategory: sortedCats[0][0],
      topAmount: sortedCats[0][1],
      largestExpense: largest,
      totalIncome: tInc,
      totalExpense: tExp
    };
  }, [cardTransactions]);

  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;

  // EXECUTIVE METRICS
  const liveNetWorth = iden.baseAsset + (totalIncome - totalExpense);
  const diversificationScore = Math.min(100, (iden.labels.length * 20) + (Number(savingsRate) / 2));
  
  const isHighRisk = iden.labels.includes('Digital Assets') || iden.labels.includes('Venture');
  const riskLabel = isHighRisk ? 'AGGRESSIVE' : (iden.labels.includes('Cash') ? 'CONSERVATIVE' : 'BALANCED');

  const cashReservePct = iden.labels.indexOf('Cash Reserve') !== -1 ? iden.pcts[iden.labels.indexOf('Cash Reserve')] : 5;
  const cashAmount = (liveNetWorth * (cashReservePct / 100));
  const runwayMonths = totalExpense > 0 ? (cashAmount / totalExpense).toFixed(1) : 12;

  return (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      
      {/* EXECUTIVE PROFILE ANALYSIS - Full Width */}
      <div className="card" style={{ 
        gridColumn: '1 / -1', padding: '2.5rem', borderRadius: '20px', 
        background: 'linear-gradient(135deg, var(--dark-card-bg) 0%, #1e1b4b 100%)', color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Fingerprint size={20} color="var(--brand-green)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.15em' }}>EXECUTIVE PROFILE ANALYSIS</span>
            </div>
            <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{iden.name}</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Portfolio Valuation</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹{liveNetWorth.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#94a3b8' }}>
              <Activity size={16} /> <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>DIVERSIFICATION</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{diversificationScore}/100</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-green)', marginTop: '0.5rem', fontWeight: 600 }}>Optimal Range</div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#94a3b8' }}>
              <BarChart3 size={16} /> <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>RISK STRATEGY</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{riskLabel}</div>
            <div style={{ fontSize: '0.75rem', color: riskLabel === 'AGGRESSIVE' ? '#f43f5e' : '#10b981', marginTop: '0.5rem', fontWeight: 600 }}>
              {riskLabel === 'AGGRESSIVE' ? 'Alpha Focused' : 'Preservation Mindset'}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#94a3b8' }}>
              <Zap size={16} /> <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>LIQUIDITY RUNWAY</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{runwayMonths} MONTHS</div>
            <div style={{ fontSize: '0.75rem', color: '#6366f1', marginTop: '0.5rem', fontWeight: 600 }}>Operational Cushion</div>
          </div>
        </div>
      </div>

      {/* Highest Spending Category */}
      <div className="card" style={{ padding: '2rem', borderRadius: '12px', background: 'var(--bg-panel)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '8px', background: '#ffe4e6', color: '#e11d48' }}>
            <PieIcon size={24} />
          </div>
          <div className="card">
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '1rem', display: 'block' }}>TOTAL DRAWDOWN</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--danger-text)' }}>₹54,500.00</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 600 }}>12.4% from peak</div>
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>{topCategory}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          You've allocated <strong>₹{topAmount.toLocaleString()}</strong> in this sector.
        </div>
      </div>

      {/* Largest Single Expense */}
      <div className="card" style={{ padding: '2rem', borderRadius: '12px', background: 'var(--bg-panel)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--danger-bg)', color: 'var(--danger-text)' }}>
            <TrendingDown size={24} />
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Highest Single Drawdown</div>
        </div>
        {largestExpense ? (
          <>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>₹{largestExpense.amount.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ textTransform: 'capitalize', fontWeight: 600, color: 'var(--text-primary)' }}>{largestExpense.description || largestExpense.category}</span> on {largestExpense.date}
            </div>
          </>
        ) : (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No expenses recorded yet.</div>
        )}
      </div>

      {/* General Observation */}
      <div className="card" style={{ padding: '2rem', borderRadius: '12px', background: 'var(--bg-panel)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '8px', background: '#e0e7ff', color: '#4f46e5' }}>
            <Lightbulb size={24} />
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Capital Efficiency Rating</div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>{savingsRate}% Retention</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {savingsRate >= 20 ?
            "Excellent framework. You are retaining a highly recommended portion of gross yield." :
            savingsRate > 5 ?
              "Stable yield relative to outflow. Scaling retention to 20% is recommended." :
              "Alert: Operational outflow is consuming almost all gross yield. Immediate reassessment advised."}
        </div>
      </div>

      {/* Strategic Recommendation Tool */}
      <div className="card" style={{
        gridColumn: '1 / -1', padding: '2.5rem', borderRadius: '16px', background: 'var(--bg-panel)',
        border: `1px solid ${savingsRate >= 20 ? 'var(--brand-green)' : 'var(--danger)'}`,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
          background: savingsRate >= 20 ? 'var(--brand-green)' : 'var(--danger)'
        }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Target size={18} color="var(--brand-green)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-green)', letterSpacing: '0.1em' }}>STRATEGIC ACTION</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>
                {savingsRate >= 20 ? 'Capital Deployment Strategy' : 'Expense Optimization Required'}
              </h2>
            </div>
            {savingsRate >= 20 ? (
              <div style={{ background: 'var(--brand-light-green)', padding: '0.75rem', borderRadius: '12px' }}>
                <Rocket size={24} color="var(--brand-green)" />
              </div>
            ) : (
              <div style={{ background: 'var(--danger-bg)', padding: '0.75rem', borderRadius: '12px' }}>
                <AlertTriangle size={24} color="var(--danger-text)" />
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {savingsRate >= 20 ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Invest Surplus Capital</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Your retention rate is exceptional. Instead of holding cash, deploy your assets into high-yield vehicles to maintain your {savingsRate}% efficiency.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <ShieldCheck size={16} color="var(--brand-green)" />
                      Increase SIP in Diversified Equity by ₹25,000
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <ShieldCheck size={16} color="var(--brand-green)" />
                      Lock 10% in High-Yield Fixed Income
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <ShieldCheck size={16} color="var(--brand-green)" />
                      Explore Alternative Assets (e.g., Gold or REITs)
                    </li>
                  </ul>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Scaling Income Streams</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Given your strong base, focus on diversifying your income sources to further reduce risk and increase asset velocity.
                  </p>
                  <button className="btn btn-black" style={{ width: '100%', marginTop: 'auto' }}>Explore Growth Models</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Emergency Cost-Cutting: {topCategory}</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Your outflow in **{topCategory}** (₹{topAmount.toLocaleString()}) is currently unsustainable. Immediatley reassess your discretionary spending.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <AlertTriangle size={16} color="var(--danger)" />
                      Cut {topCategory} budget by at least 30% next month
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <AlertTriangle size={16} color="var(--danger)" />
                      Review recurring subscriptions in {topCategory}
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <AlertTriangle size={16} color="var(--danger)" />
                      Consolidate highest expense: **{largestExpense?.description}**
                    </li>
                  </ul>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Liquidity Preservation</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Stop all non-essential investments until your retention rate recovers to at least 20%. Focus on building a 6-month cash reserve.
                  </p>
                  <button className="btn btn-black" style={{ width: '100%', marginTop: 'auto', background: 'var(--danger)', color: '#fff' }}>Generate Survival Plan</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
