import { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import { FinanceContext } from '../context/FinanceContext';
import '../components.css';

export const TransactionModal = ({ show, onClose, onSave, transaction }) => {
  const { cards } = useContext(FinanceContext);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: '',
    amount: '',
    type: 'expense',
    cardId: cards?.[1]?.id || 'card_1'
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        amount: transaction.amount.toString()
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        type: 'expense',
        cardId: cards?.[1]?.id || 'card_1'
      });
    }
  }, [transaction, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="title" style={{ margin: 0 }}>
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select 
              className="form-input" 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Date</label>
            <input 
              type="date" 
              className="form-input" 
              required
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Grocery"
              required
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Food"
                required
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', fontWeight: 600 }}>₹</span>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  className="form-input" 
                  style={{ paddingLeft: '2rem' }}
                  required
                  value={formData.amount} 
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Payment Source (Card)</label>
            <div style={{ position: 'relative' }}>
              <select 
                className="form-input" 
                value={formData.cardId}
                onChange={e => setFormData({...formData, cardId: e.target.value})}
                required
                style={{ appearance: 'none' }}
              >
                {cards.filter(c => c.id !== 'all').map(card => (
                  <option key={card.id} value={card.id}>
                    {card.name} {card.last4 ? `(**** ${card.last4})` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-tertiary)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
