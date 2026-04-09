import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Shield, Key, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate(data.role === 'patient' ? '/patient-dashboard' : '/doctor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)', padding: '1rem' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ color: 'var(--primary)', display: 'inline-block', marginBottom: '1rem' }}>
            <Shield size={48} />
          </div>
          <h2 style={{ fontSize: '2rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)' }}>Securely access your health records</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label><Mail size={14} style={{ marginRight: '4px' }}/> Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" />
          </div>
          <div className="input-group">
            <label><Key size={14} style={{ marginRight: '4px' }}/> Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
