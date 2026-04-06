import { useContext, useState, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { TransactionModal } from './TransactionModal';
import { AnalysisModal } from './AnalysisModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { Plus, Edit, Trash2, Calendar, ChevronDown, ArrowRight, TrendingUp, TrendingDown, FileText, FilterX, Download } from 'lucide-react';
import '../components.css';

// Reusable Dropdown Component for filtering
const FilterDropdown = ({ label, value, options, onSelect, isOpen, onToggle, icon }) => (
  <div style={{ position: 'relative', flex: 1 }}>
    <div 
      onClick={onToggle}
      className={isOpen ? 'filter-card active' : 'filter-card'}
      style={{ 
        background: 'var(--bg-panel-hover)', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer',
        border: isOpen ? '1px solid var(--brand-green)' : '1px solid transparent',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
        {label} 
        <span style={{ color: isOpen ? 'var(--brand-green)' : 'var(--text-secondary)' }}>{icon}</span>
      </div>
      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
    
    {isOpen && (
      <div className="dropdown-menu" style={{ 
        position: 'absolute', top: '105%', left: 0, right: 0, zIndex: 100, 
        background: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '8px',
        boxShadow: 'var(--shadow-lg)', padding: '0.5rem', maxHeight: '200px', overflowY: 'auto'
      }}>
        {options.map(opt => (
          <div 
            key={opt}
            onClick={() => { onSelect(opt); onToggle(); }}
            style={{ 
              padding: '0.6rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px', cursor: 'pointer',
              background: value === opt ? 'var(--brand-light-green)' : 'transparent',
              color: value === opt ? 'var(--brand-green)' : 'var(--text-primary)',
              fontWeight: value === opt ? 700 : 500
            }}
            className="dropdown-item"
          >
            {opt}
          </div>
        ))}
      </div>
    )}
  </div>
);

export const Transactions = () => {
  const { transactions, role, addTransaction, updateTransaction, deleteTransaction, activeCardId } = useContext(FinanceContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [modalState, setModalState] = useState({ show: false, tx: null });
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, tx: null });
  const [activeDropdown, setActiveDropdown] = useState(null); // 'date', 'category', 'asset', 'status'

  // Filter States
  const [filters, setFilters] = useState({
    date: 'Oct 01 - Oct 31, 2023',
    category: 'All Categories',
    assetType: 'All Asset Types',
    status: 'All Statuses'
  });

  const filterOptions = {
    date: ['Oct 01 - Oct 31, 2023', 'Sep 01 - Sep 30, 2023', 'Aug 01 - Aug 31, 2023'],
    category: ['All Categories', ...new Set(transactions.map(t => t.category))],
    assetType: ['All Asset Types', 'Cash & Equivalents', 'Digital Assets', 'Equities', 'Real Estate'],
    status: ['All Statuses', 'Settled', 'Pending', 'Failed']
  };

  const filteredTransactions = useMemo(() => {
    let result = activeCardId === 'all' 
      ? transactions 
      : transactions.filter(t => t.cardId === activeCardId);
    
    // Type Filter (Income/Expense/All)
    if (typeFilter !== 'all') {
      const typeStr = typeFilter === 'expenses' ? 'expense' : 'income';
      result = result.filter(t => t.type === typeStr);
    }
    
    // Category Filter
    if (filters.category !== 'All Categories') {
      result = result.filter(t => t.category === filters.category);
    }

    // Status Filter (Mock for UI)
    if (filters.status !== 'All Statuses') {
      // In a real app we'd check t.status. Here we mock it by filtering some based on search/indices
    }

    // Search Term
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description?.toLowerCase().includes(lower) || 
        t.category.toLowerCase().includes(lower)
      );
    }
    
    return result;
  }, [transactions, searchTerm, typeFilter, filters]);

  const handleSave = (txData) => {
    if (modalState.tx) {
      updateTransaction(modalState.tx.id, txData);
    } else {
      addTransaction(txData);
    }
    setModalState({ show: false, tx: null });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `atelier_finance_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryBadge = (category) => {
    if (category.toLowerCase().includes('tech')) return { text: 'Technology', bg: '#f1f5f9', color: '#64748b' };
    if (category.toLowerCase().includes('invest')) return { text: 'Investment', bg: '#d1fae5', color: '#059669' };
    return { text: category, bg: '#f1f5f9', color: '#64748b' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <TransactionModal 
        show={modalState.show} 
        onClose={() => setModalState({ show: false, tx: null })} 
        transaction={modalState.tx}
        onSave={handleSave}
      />

      <AnalysisModal 
        show={showAnalysis} 
        onClose={() => setShowAnalysis(false)} 
      />

      <DeleteConfirmationModal 
        show={deleteModal.show}
        description={deleteModal.tx?.description}
        onClose={() => setDeleteModal({ show: false, tx: null })}
        onConfirm={() => {
          deleteTransaction(deleteModal.tx.id);
          setDeleteModal({ show: false, tx: null });
        }}
      />

      {/* Header and top controls */}
      <div className="page-header transactions-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Ledger</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Comprehensive history of your financial movements.</p>
        </div>
        
        <div className="transactions-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'var(--bg-panel-hover)', borderRadius: '100px', padding: '0.25rem' }}>
            {['all', 'income', 'expenses'].map(ft => (
              <button 
                key={ft}
                onClick={() => setTypeFilter(ft)}
                style={{
                  padding: '0.35rem 1rem', fontSize: '0.8rem', fontWeight: 600, border: 'none',
                  borderRadius: '100px', cursor: 'pointer', textTransform: 'capitalize',
                  background: typeFilter === ft ? 'var(--bg-panel)' : 'transparent',
                  color: typeFilter === ft ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: typeFilter === ft ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >{ft}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-outline" 
              onClick={exportToCSV}
              style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Download size={16} /> Export CSV
            </button>
            {(filters.category !== 'All Categories' || filters.status !== 'All Statuses' || typeFilter !== 'all') && (
              <button 
                className="btn btn-outline" 
                onClick={() => { setFilters({...filters, category: 'All Categories', status: 'All Statuses'}); setTypeFilter('all'); }}
                style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}
              >
                <FilterX size={14} style={{ marginRight: '6px' }} /> Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex-wrap-list" style={{ width: '100%', gap: '1rem' }}>
        <FilterDropdown 
          label="DATE RANGE" 
          value={filters.date} 
          options={filterOptions.date}
          isOpen={activeDropdown === 'date'}
          onToggle={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
          onSelect={(val) => setFilters({...filters, date: val})}
          icon={<Calendar size={14} />}
        />
        <FilterDropdown 
          label="CATEGORY" 
          value={filters.category} 
          options={filterOptions.category}
          isOpen={activeDropdown === 'category'}
          onToggle={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
          onSelect={(val) => setFilters({...filters, category: val})}
          icon={<ChevronDown size={14} />}
        />
        <FilterDropdown 
          label="ASSET TYPE" 
          value={filters.assetType} 
          options={filterOptions.assetType}
          isOpen={activeDropdown === 'asset'}
          onToggle={() => setActiveDropdown(activeDropdown === 'asset' ? null : 'asset')}
          onSelect={(val) => setFilters({...filters, assetType: val})}
          icon={<ChevronDown size={14} />}
        />
        <FilterDropdown 
          label="STATUS" 
          value={filters.status} 
          options={filterOptions.status}
          isOpen={activeDropdown === 'status'}
          onToggle={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
          onSelect={(val) => setFilters({...filters, status: val})}
          icon={<ChevronDown size={14} />}
        />
      </div>

      {/* Main Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: 'var(--bg-panel-hover)' }}>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.7rem' }}>DATE</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.7rem' }}>DESCRIPTION</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.7rem' }}>CATEGORY</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.7rem' }}>TYPE</th>
                <th style={{ textAlign: 'right', padding: '1rem 1.5rem', fontSize: '0.7rem' }}>AMOUNT</th>
                {role === 'admin' && <th style={{ textAlign: 'center', padding: '1rem 1.5rem', fontSize: '0.7rem' }}>ACTIONS</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.slice(0, 10).map(t => {
                const badge = getCategoryBadge(t.category);
                return (
                  <tr key={t.id}>
                    <td style={{ color: 'var(--text-secondary)', padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontSize: '0.85rem' }}>{t.date}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', background: t.type === 'income' ? 'var(--brand-light-green)' : 'var(--danger-bg)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {t.type === 'income' ? (
                            <TrendingUp size={14} color="var(--brand-green)" />
                          ) : (
                            <TrendingDown size={14} color="var(--danger-text)" />
                          )}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.description}</div>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{ background: badge.bg, color: badge.color, padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600 }}>
                        {badge.text}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: t.type === 'income' ? 'var(--brand-green)' : 'var(--danger)' }}></div>
                        {t.type.toUpperCase()}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.9rem', color: t.type === 'income' ? 'var(--brand-green)' : 'var(--danger-text)' }}>
                      {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                    </td>
                    {role === 'admin' && (
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                          <button 
                            className="icon-btn" 
                            style={{ padding: '6px', color: 'var(--text-secondary)' }}
                            onClick={() => setModalState({ show: true, tx: t })}
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="icon-btn" 
                            style={{ padding: '6px', color: 'var(--danger-text)' }}
                            onClick={() => setDeleteModal({ show: true, tx: t })}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div>Showing 1 to {Math.min(filteredTransactions.length, 10)} of 124 transactions</div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>&lt;</button>
            <button style={{ padding: '0.25rem 0.5rem', background: 'var(--dark-card-bg)', color: '#fff', border: 'none', borderRadius: '4px' }}>1</button>
            <button style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>2</button>
            <button style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>3</button>
            <span style={{ padding: '0.25rem 0.5rem' }}>...</span>
            <button style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>25</button>
            <button style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>&gt;</button>
          </div>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="grid-2-col-equal">
        
        {/* Dark Cash Flow Card */}
        <div style={{ background: 'linear-gradient(90deg, var(--dark-card-bg) 50%, #172554 100%)', padding: '2rem', borderRadius: '12px', color: '#fff' }}>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '1rem' }}>Net Cash Flow (Monthly)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.5px' }} className="cashflow-value">+₹1,54,200.00</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
              <TrendingUp size={16} /> 12.5%
            </div>
          </div>
        </div>

        {/* Strategy Insight */}
        <div style={{ background: 'var(--bg-panel-hover)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brand-green)' }}></div>
            STRATEGY INSIGHT
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Your discretionary spending on dining is up <strong>14%</strong> this month. Consider rebalancing into the <em style={{ color: 'var(--text-primary)' }}>Yield Portfolio</em>.
          </p>
          <div 
            onClick={() => setShowAnalysis(true)}
            style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-green)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            View Analysis <ArrowRight size={14} />
          </div>
        </div>

      </div>

    </div>
  );
};
