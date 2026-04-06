import { createPortal } from 'react-dom';
import { ShoppingCart, TrendingUp, ArrowRight, X, Info } from 'lucide-react';
import '../components.css';

export const AnalysisModal = ({ show, onClose }) => {
  if (!show) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', padding: '0' }}>
        
        {/* Modal Header (Dark background for premium look) */}
        <div style={{ background: 'var(--dark-card-bg)', padding: '2rem 2.5rem', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', position: 'relative' }}>
          <button 
            className="icon-btn" 
            onClick={onClose}
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#9ca3af' }}
          >
            <X size={20} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(52, 211, 153, 0.2)', padding: '0.5rem', borderRadius: '8px' }}>
              <TrendingUp size={20} color="var(--brand-green)" />
            </div>
            <span style={{ color: 'var(--brand-green)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>LEDGER ANALYSIS</span>
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.75rem', margin: 0, fontWeight: 700 }}>Yield Optimization Insight</h2>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2.5rem' }}>
          <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Our algorithm has detected a significant shift in your discretionary spending patterns. This analysis provides a breakdown of the <strong>14% increase</strong> in dining expenditures and how it impacts your long-term yield.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem' }}>Current Status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem' }}>Reduce Dining/Shopping</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--danger-text)' }}>-₹12,400</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem' }}>Monthly Yield Target</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-green)' }}>+₹45,000</span>
                </div>
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem' }}>Recommendation</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="badge badge-tech">Yield Portfolio</span>
                <span className="badge badge-div">Rebalance</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Redirecting $850/mo from discretionary dining to the <strong>Atelier Yield Portfolio</strong> would capture a projected <strong>6.5% APY</strong>, reinforcing your cash reserve targets.
              </p>
            </div>
          </div>

          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            <Info size={20} color="#d97706" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: 1.5 }}>
              <strong>Optimization Opportunity:</strong> You have several recurring dining expenses that can be converted into automated savings contributions.
            </div>
          </div>

          <button className="btn btn-black" style={{ width: '100%', padding: '1.25rem', fontSize: '1rem' }}>
            Schedule Rebalancing Session <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
