import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FinanceContext } from '../context/FinanceContext';
import { 
  Shield, User, Lightbulb, Settings as SettingsIcon,
  LayoutDashboard, ReceiptText, 
  Wallet, Search, Bell, Menu, X, Sun, Moon, TrendingUp, ChevronDown
} from 'lucide-react';
import { TransactionModal } from './TransactionModal';
import '../components.css';

// We'll pass activeView to render the 4 main views
export const AppLayout = ({ activeView, setActiveView, children }) => {
  const { role, setRole, isAddModalOpen, setAddModalOpen, addTransaction, userProfile, transactions, cards, activeCardId, setActiveCardId } = useContext(FinanceContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  const toggleNotifications = () => {
    if (!isNotificationsOpen) {
      setHasUnreadNotifications(false);
    }
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className={`app-container ${theme}`}>
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <TransactionModal 
        show={isAddModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onSave={(data) => {
          addTransaction(data);
          setAddModalOpen(false);
        }} 
      />
      
      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-logo flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="sidebar-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 22h20L12 2z" />
                <path d="M12 22V12" />
              </svg>
            </div>
            <div className="sidebar-logo-text">
              <span className="sidebar-logo-title" style={{ color: 'var(--brand-green)' }}>Atelier Finance</span>
              <span className="sidebar-logo-subtitle" style={{ color: 'var(--text-tertiary)', letterSpacing: '1px', fontSize: '0.6rem' }}>PRIVATE WEALTH</span>
            </div>
          </div>
          <button className="icon-btn mobile-only" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav style={{ flex: 1 }}>
          <div 
            className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('dashboard')}
          >
            <LayoutDashboard size={20} strokeWidth={activeView === 'dashboard' ? 2.5 : 2} />
            Dashboard
          </div>
          <div 
            className={`nav-link ${activeView === 'transactions' ? 'active' : ''}`}
            onClick={() => handleNavClick('transactions')}
          >
            <ReceiptText size={20} strokeWidth={activeView === 'transactions' ? 2.5 : 2} />
            Transactions
          </div>
          <div 
            className={`nav-link ${activeView === 'insights' ? 'active' : ''}`}
            onClick={() => handleNavClick('insights')}
          >
            <Lightbulb size={20} strokeWidth={activeView === 'insights' ? 2.5 : 2} />
            Insights
          </div>

          {/* Removed New Report button */}
        </nav>

        {role === 'admin' && (
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn btn-black" style={{ width: '100%', padding: '0.85rem' }} onClick={() => setAddModalOpen(true)}>
              <span style={{ fontSize: '1.1rem', marginRight: '0.5rem', fontWeight: 400 }}>+</span> Add Transaction
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header" style={{ borderBottom: '1px solid var(--border-color)', padding: '0 2rem' }}>
          {/* Left: Search & Mobile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="icon-btn mobile-only" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} color="var(--text-primary)" />
            </button>
            <div className="header-search" style={{ width: '300px', position: 'relative' }}>
              <Search size={16} className="text-tertiary" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Search portfolio..." style={{ backgroundColor: 'var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }} />
            </div>
          </div>
          
          {/* Center: Card Switcher & Role Toggle */}
          <div className="header-center">
            {/* Card Switcher */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-panel-hover)', padding: '0.35rem 0.75rem', borderRadius: '100px', cursor: 'pointer' }}>
              <select 
                value={activeCardId} 
                onChange={(e) => setActiveCardId(e.target.value)}
                style={{
                  background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600,
                  cursor: 'pointer', appearance: 'none', paddingRight: '1.5rem', outline: 'none'
                }}
              >
                {cards.map(card => (
                  <option key={card.id} value={card.id} style={{ background: 'var(--bg-panel)', color: 'var(--text-primary)' }}>
                    {card.name} {card.last4 ? `(**** ${card.last4})` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', pointerEvents: 'none', color: 'var(--text-tertiary)' }} />
            </div>

            {/* Role Toggle */}
            <div style={{ display: 'flex', background: 'var(--bg-panel-hover)', borderRadius: '100px', padding: '0.25rem' }}>
              {['viewer', 'admin'].map(r => (
                <button 
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    padding: '0.35rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, border: 'none',
                    borderRadius: '100px', cursor: 'pointer', textTransform: 'capitalize',
                    background: role === r ? 'var(--bg-panel)' : 'transparent',
                    color: role === r ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginRight: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <button 
                  className="icon-btn" 
                  onClick={toggleNotifications}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Bell size={20} color={isNotificationsOpen ? 'var(--brand-green)' : 'var(--text-secondary)'} />
                  {hasUnreadNotifications && (
                    <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--bg-panel)' }}></span>
                  )}
                </button>
                
                {isNotificationsOpen && (
                  <>
                    <div 
                      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }} 
                      onClick={() => setIsNotificationsOpen(false)}
                    ></div>
                    <div className="notification-dropdown">
                      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Notifications</h4>
                        <span className="badge badge-tech" style={{ fontSize: '0.65rem' }}>3 NEW</span>
                      </div>
                      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {/* System Alert 1 */}
                        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-panel-hover)', display: 'flex', gap: '1rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--brand-light-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Shield size={18} color="var(--brand-green)" />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>Security Alert: New Sign-in</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>A new sign-in was detected from a Windows device in New York.</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>2 minutes ago</div>
                          </div>
                        </div>

                        {/* Dynamic alerts based on transactions */}
                        {[...transactions].slice(0, 3).map((t, idx) => (
                          <div key={idx} style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: t.type === 'income' ? 'var(--brand-light-green)' : 'var(--danger-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {t.type === 'income' ? <TrendingUp size={18} color="var(--brand-green)" /> : <ReceiptText size={18} color="var(--danger-text)" />}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                                {t.type === 'income' ? 'Deposit Received' : 'Payment Processed'}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                {t.description} of <strong>₹{t.amount.toLocaleString()}</strong> has been {t.type === 'income' ? 'credited' : 'deducted'}.
                              </div>
                              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>{t.date}</div>
                            </div>
                          </div>
                        ))}

                        {/* System Alert 2 */}
                        <div style={{ padding: '1.25rem', display: 'flex', gap: '1rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-panel-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Lightbulb size={18} color="var(--text-tertiary)" />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>Portfolio Insight Ready</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>Your tech sector allocation is 12% higher than target. Check Insights.</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Yesterday, 4:32 PM</div>
                          </div>
                        </div>
                      </div>
                      <div 
                        style={{ padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--brand-green)', fontWeight: 700, cursor: 'pointer', background: 'var(--bg-panel-hover)', borderTop: '1px solid var(--border-color)' }}
                        onClick={() => { setIsNotificationsOpen(false); setActiveView('transactions'); }}
                      >
                        View All Activity
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button className="icon-btn" onClick={toggleTheme} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button className="icon-btn" onClick={() => setActiveView('settings')} style={{ color: activeView === 'settings' ? 'var(--brand-green)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SettingsIcon size={20} />
              </button>
            </div>

            <div className="header-user-info" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{userProfile.name}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--brand-green)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{role}</span>
            </div>
            <div 
              className="avatar-container"
              onClick={() => setActiveView('profile')}
              style={{ 
                width: '42px', height: '42px', borderRadius: '12px', overflow: 'hidden', 
                background: 'var(--bg-panel-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                marginLeft: '0.5rem', 
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                border: activeView === 'profile' ? '2px solid var(--brand-green)' : '2px solid transparent',
                boxShadow: activeView === 'profile' ? '0 0 15px rgba(16, 185, 129, 0.2)' : 'none'
              }}
            >
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=10b981&color=fff&bold=true`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </header>
        
        <div className="page-container animate-fade-in" style={{ paddingTop: '2rem' }}>
          {children}
        </div>
      </main>

      {/* Mobile FAB — Add Transaction (admin only, visible on mobile) */}
      {role === 'admin' && (
        <button
          className="mobile-fab"
          onClick={() => setAddModalOpen(true)}
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 400, lineHeight: 1 }}>+</span>
          Add Transaction
        </button>
      )}
    </div>
  );
};
