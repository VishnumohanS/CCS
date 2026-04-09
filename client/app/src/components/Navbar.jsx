import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, LogOut, User, Activity } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      borderBottom: '1px solid var(--border)',
      background: 'var(--background)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
        <Shield size={28} />
        <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit' }}>SMARTHEALTH</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {user ? (
          <>
            <Link to={user.role === 'patient' ? '/patient-dashboard' : '/doctor-dashboard'} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
              Dashboard
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="glass-card" style={{ padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <User size={14} />
                {user.name} ({user.role})
              </span>
              <button 
                onClick={handleLogout}
                style={{ background: 'transparent', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Join Now</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
