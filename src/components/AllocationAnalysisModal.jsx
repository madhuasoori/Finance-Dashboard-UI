import { createPortal } from 'react-dom';
import { PieChart, TrendingDown, ArrowRight, X, Info, LayoutTemplate } from 'lucide-react';
import '../components.css';

export const AllocationAnalysisModal = ({ show, onClose }) => {
  if (!show) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', padding: '0' }}>
        
        {/* Modal Header */}
        <div style={{ background: 'var(--brand-green)', padding: '2rem 2.5rem', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', position: 'relative' }}>
          <button 
            className="icon-btn" 
            onClick={onClose}
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'rgba(255,255,255,0.6)' }}
          >
            <X size={20} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '0.5rem', borderRadius: '8px' }}>
              <LayoutTemplate size={20} color="#fff" />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>PORTFOLIO ANALYSIS</span>
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.75rem', margin: 0, fontWeight: 700 }}>Allocation Overweight Alert</h2>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2.5rem' }}>
          <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            A detailed scan of your current sector exposures shows a significant overweight position in <strong>Technology</strong>. This analysis provides the rationale for rebalancing.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Technology Sector</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-green)' }}>12% Over Target</span>
              </div>
              <div style={{ height: '8px', width: '100%', background: 'var(--border-color)', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '45%', background: 'var(--brand-green)', borderRadius: '10px' }}></div>
                <div style={{ height: '100%', width: '33%', borderRight: '2px solid #fff', position: 'absolute', top: 0, left: 0 }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                <span>Target: 33%</span>
                <span>Current: 45%</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-panel-hover)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <TrendingDown size={16} color="var(--danger-text)" /> Diversification Risk
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                High concentration in tech increases your portfolio's sensitivity to sector-specific volatility. Reallocating the extra 12% would decrease overall Beta from <strong>1.14</strong> to <strong>0.92</strong>.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>Rebalancing Recommendations</h4>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
               <span style={{ fontSize: '0.85rem' }}>Liquidate Tech Overshoot</span>
               <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>₹15,42,000</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
               <span style={{ fontSize: '0.85rem' }}>Allocate to Equities (Ex-Tech)</span>
               <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-green)' }}>+₹8,50,000</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem' }}>
               <span style={{ fontSize: '0.85rem' }}>Allocate to Real Estate</span>
               <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-green)' }}>+₹6,92,000</span>
             </div>
          </div>

          <button className="btn btn-black" style={{ width: '100%', padding: '1.25rem', fontSize: '1rem' }}>
            Execute Rebalancing <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
