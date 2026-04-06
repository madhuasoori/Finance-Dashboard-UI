import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CreditCard } from 'lucide-react';
import '../components.css';

export const CardModal = ({ show, onClose, onSave, card }) => {
  const [formData, setFormData] = useState({
    name: '',
    last4: '',
    icon: '💳'
  });

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name,
        last4: card.last4,
        icon: card.icon || '💳'
      });
    } else {
      setFormData({
        name: '',
        last4: '',
        icon: '💳'
      });
    }
  }, [card, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h3 className="title" style={{ margin: 0 }}>
            {card ? 'Edit Card Details' : 'Add New Card'}
          </h3>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Card Label / Bank Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Visa Platinum"
              required
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Last 4 Digits</label>
              <input 
                type="text" 
                maxLength="4"
                pattern="\d{4}"
                className="form-input" 
                placeholder="4242"
                required
                value={formData.last4} 
                onChange={e => setFormData({...formData, last4: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Card Icon</label>
              <select 
                className="form-input"
                value={formData.icon}
                onChange={e => setFormData({...formData, icon: e.target.value})}
              >
                <option value="💳">💳 Standard</option>
                <option value="🏢">🏦 Bank Account</option>
                <option value="💎">💎 Premium</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Card</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
