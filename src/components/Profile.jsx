import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { EditProfileModal } from './EditProfileModal';
import { 
  User, Mail, Phone, MapPin, 
  ShieldCheck, Smartphone, History, 
  Award, Calendar, ArrowRight, CreditCard, Plus, Edit, Trash2
} from 'lucide-react';
import { CardModal } from './CardModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import '../components.css';

export const Profile = () => {
  const { role, userProfile, updateUserProfile, cards, addCard, updateCard, deleteCard } = useContext(FinanceContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cardModal, setCardModal] = useState({ show: false, card: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, cardId: null });

  const securityItems = [
    { icon: <ShieldCheck size={18} />, label: 'Two-Factor Authentication', status: 'Enabled' },
    { icon: <Smartphone size={18} />, label: 'Trusted Devices', count: 3 },
    { icon: <History size={18} />, label: 'Last Login', date: 'Today, 10:45 AM' },
  ];

  const personalInfo = [
    { icon: <Mail size={18} />, label: 'Email', value: userProfile.email },
    { icon: <Phone size={18} />, label: 'Phone', value: userProfile.phone },
    { icon: <MapPin size={18} />, label: 'Location', value: userProfile.location },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      <CardModal 
        show={cardModal.show}
        onClose={() => setCardModal({ show: false, card: null })}
        card={cardModal.card}
        onSave={(data) => {
          if (cardModal.card) {
            updateCard(cardModal.card.id, data);
          } else {
            addCard(data);
          }
          setCardModal({ show: false, card: null });
        }}
      />

      <DeleteConfirmationModal 
        show={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, cardId: null })}
        onConfirm={() => {
          deleteCard(deleteModal.cardId);
          setDeleteModal({ show: false, cardId: null });
        }}
        title="Delete Card"
        message="Are you sure you want to remove this financial account? This will not delete transactions but will unassign this card from them."
      />

      <EditProfileModal 
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={userProfile}
        onSave={(data) => {
          updateUserProfile(data);
          setIsEditModalOpen(false);
        }}
      />

      {/* Profile Header */}
      <div className="card" style={{ padding: '3rem', borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'linear-gradient(225deg, var(--brand-light-green) 0%, transparent 70%)', opacity: 0.3 }}></div>
        
        <div className="profile-hero-inner" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '50%', background: 'var(--brand-green)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '3rem', fontWeight: 700, color: '#fff', border: '4px solid var(--bg-panel)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {userProfile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <h1 className="page-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', margin: 0 }}>{userProfile.name}</h1>
              <span className="badge badge-tech" style={{ padding: '0.4rem 1rem' }}>PREMIUM CLIENT</span>
            </div>
            <div className="text-muted" style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={18} color="var(--brand-green)" />
              Client since 2018 • <span style={{ color: 'var(--brand-green)', fontWeight: 600 }}>{role.toUpperCase()} ACCESS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2-col-equal">
        
        {/* Account Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Account Information</h3>
          <div className="card" style={{ padding: '2rem', gap: '1.5rem' }}>
            {personalInfo.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: idx < personalInfo.length - 1 ? '1.25rem' : 0, borderBottom: idx < personalInfo.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: 'var(--text-tertiary)' }}>{item.icon}</div>
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.label}</span>
                </div>
                <span className="text-muted" style={{ fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Security & Access</h3>
          <div className="card" style={{ padding: '2rem', gap: '1.5rem' }}>
            {securityItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: idx < securityItems.length - 1 ? '1.25rem' : 0, borderBottom: idx < securityItems.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: 'var(--text-tertiary)' }}>{item.icon}</div>
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.label}</span>
                </div>
                <span style={{ color: 'var(--brand-green)', fontWeight: 700, fontSize: '0.85rem' }}>
                  {item.status || item.count || item.date}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 0.5rem 0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Financial Accounts</h3>
            <button 
              className="btn btn-outline" 
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => setCardModal({ show: true, card: null })}
            >
              <Plus size={14} /> Add Card
            </button>
          </div>
          <div className="card" style={{ padding: '2rem', gap: '1.5rem' }}>
            {cards.filter(c => c.id !== 'all').map((card, idx) => (
              <div key={card.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: idx < cards.filter(c => c.id !== 'all').length - 1 ? '1.25rem' : 0, borderBottom: idx < cards.filter(c => c.id !== 'all').length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'var(--bg-panel-hover)', padding: '0.75rem', borderRadius: '8px', color: 'var(--brand-green)' }}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{card.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>**** {card.last4}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="icon-btn" style={{ padding: '0.4rem' }} onClick={() => setCardModal({ show: true, card })}>
                    <Edit size={16} />
                  </button>
                  <button className="icon-btn text-danger" style={{ padding: '0.4rem' }} onClick={() => setDeleteModal({ show: true, cardId: card.id })}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Stats & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Membership Stats</h3>
          <div className="card" style={{ padding: '2.5rem', background: 'var(--dark-card-bg)', color: 'white' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total Managed Assets</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 700 }}>$1.28M</div>
              </div>
              
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Risk Profile</div>
                  <div style={{ fontWeight: 600 }}>Aggressive</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Account Tier</div>
                  <div style={{ color: 'var(--brand-green)', fontWeight: 700 }}>Black Diamond</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--brand-green)', background: 'var(--bg-panel-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ background: 'var(--brand-green)', padding: '1rem', borderRadius: '12px', color: 'white' }}>
                <Calendar size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Annual Review</div>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>Your next strategy meeting is in 14 days.</div>
              </div>
              <ArrowRight size={20} color="var(--brand-green)" />
            </div>
          </div>
          
          <button 
            className="btn btn-black" 
            style={{ padding: '1.25rem', width: '100%', fontSize: '1rem' }}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile Details
          </button>
        </div>

      </div>

    </div>
  );
};
