import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Shield, Mail, Key, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', formData);
      login(data);
      navigate(data.role === 'patient' ? '/patient-dashboard' : '/doctor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)', padding: '1rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '500px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)' }}>Join our secure healthcare network</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label><User size={14} style={{ marginRight: '4px' }}/> Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label><Mail size={14} style={{ marginRight: '4px' }}/> Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="john@example.com" />
          </div>
          <div className="input-group">
            <label><Key size={14} style={{ marginRight: '4px' }}/> Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required placeholder="••••••••" />
          </div>
          <div className="input-group">
            <label>I am a...</label>
            <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ width: '100%', background: 'var(--surface)', color: 'white', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}>
            Get Started <Shield size={18} style={{ marginLeft: '8px' }} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
