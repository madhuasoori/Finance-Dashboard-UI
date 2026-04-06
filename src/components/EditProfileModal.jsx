import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Mail, Phone, MapPin, Save } from 'lucide-react';
import '../components.css';

export const EditProfileModal = ({ show, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState({ ...profile });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '450px' }}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Profile</h2>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Professional Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input 
                type="email" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Contact Phone</label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }}
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-black" style={{ marginTop: '1rem', padding: '1rem' }}>
            <Save size={18} style={{ marginRight: '8px' }} /> Save Changes
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
