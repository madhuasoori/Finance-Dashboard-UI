import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon, Shield, User, Download, Trash2, Settings as SettingsIcon } from 'lucide-react';
import '../components.css';

export const Settings = () => {
  const { role, setRole, transactions, clearAllTransactions } = useContext(FinanceContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleExportCSV = () => {
    if (transactions.length === 0) return;
    
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'finance_transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div className="page-title-group">
          <span className="page-subtitle" style={{ color: 'var(--brand-green)' }}>SYSTEM PREFERENCES</span>
          <h1 className="page-title" style={{ fontSize: '2rem' }}>Settings</h1>
        </div>
      </div>

      <div className="card" style={{ padding: '2.5rem', borderRadius: '12px', background: 'var(--bg-panel)', boxShadow: 'var(--shadow-sm)' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Theme Settings */}
          <div className="flex-between" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Appearance Mode</div>
              <div className="text-muted">Toggle between light and premium dark themes.</div>
            </div>
            <button className="btn btn-outline" onClick={toggleTheme} style={{ width: '150px', justifyContent: 'center' }}>
              {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
            </button>
          </div>

          {/* Role Settings */}
          <div className="flex-between" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Active Role <span className="badge badge-income" style={{ marginLeft: '0.5rem' }}>Simulation</span></div>
              <div className="text-muted">Switch between Viewer (readonly) and Admin (edit/add).</div>
            </div>
            <select 
              className="form-input" 
              style={{ width: '150px' }}
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Export Data */}
          <div className="flex-between" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Export Data</div>
              <div className="text-muted">Download all your records as a CSV file.</div>
            </div>
            <button className="btn btn-success" style={{ width: '150px', justifyContent: 'center' }} onClick={handleExportCSV}>
              <Download size={18} /> Export CSV
            </button>
          </div>

          {/* Danger Zone */}
          <div className="flex-between">
            <div>
              <div style={{ fontWeight: 600, color: 'var(--danger)' }}>Danger Zone</div>
              <div className="text-muted">Permanently delete all transaction data.</div>
            </div>
            <button 
              className="btn btn-danger" 
              style={{ width: '150px', justifyContent: 'center' }}
              onClick={() => {
                if (window.confirm("Are you sure? This cannot be undone.")) {
                  clearAllTransactions();
                }
              }}
            >
              <Trash2 size={18} /> Clear All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
