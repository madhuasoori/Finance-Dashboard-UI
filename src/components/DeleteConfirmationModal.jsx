import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import '../components.css';

export const DeleteConfirmationModal = ({ show, onClose, onConfirm, description }) => {
  if (!show) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '450px', textAlign: 'center', padding: '2.5rem' }}>
        <button 
          className="icon-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        >
          <X size={20} />
        </button>

        <div style={{ background: 'var(--danger-bg)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <AlertTriangle size={32} color="var(--danger-text)" />
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Are you sure?</h3>
        <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          This will permanently delete the transaction: <br/> 
          <strong style={{ color: 'var(--text-primary)' }}>"{description}"</strong>. <br/>
          This action cannot be undone.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" style={{ flex: 1, backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={onConfirm}>
            <Trash2 size={16} style={{ marginRight: '8px' }} /> Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
