import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FileText, Lock, Calendar, ClipboardList, KeyRound, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientDashboard = () => {
  const [records, setRecords] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMyRecords();
  }, []);

  const fetchMyRecords = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const { data } = await api.get('/records/my');
      setRecords(data);
      setSuccess('Showing records using your logged-in patient ID.');
    } catch (err) {
      setError('Failed to fetch records for your patient ID.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccess = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const { data } = await api.post('/records/access', {
        patientId: patientId.trim(),
        secretCode: secretCode.trim() || undefined
      });
      setRecords(data);
      setSuccess(
        secretCode.trim()
          ? 'Records loaded using secret code access.'
          : 'Records loaded using patient ID access.'
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Access failed. Check patient ID or secret code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Personal Health Vault</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            View reports created by doctors using your patient ID or a shared secret code.
          </p>
        </div>
        <div className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
          <Lock size={18} />
          <span style={{ fontWeight: 600 }}>End-to-End Encrypted</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        <div>
          <form className="glass-card" onSubmit={handleAccess} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserRound size={20} /> Secure Report Access
            </h3>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Patient MongoDB ID</label>
              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Paste patient ID"
                required
              />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Secret Code (Optional)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="If doctor shared a code, enter it"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <KeyRound size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', justifyContent: 'center' }}>
              {isLoading ? 'Verifying...' : 'Access Reports'}
            </button>
            <button type="button" className="btn-secondary" onClick={fetchMyRecords} disabled={isLoading} style={{ width: '100%', justifyContent: 'center' }}>
              Use My Logged-in Patient ID
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ClipboardList size={20} /> Your Reports</h3>
          {error && (
            <div className="glass-card" style={{ color: 'var(--error)', border: '1px solid var(--error)' }}>
              {error}
            </div>
          )}
          {success && (
            <div className="glass-card" style={{ color: 'var(--secondary)', border: '1px solid var(--secondary)' }}>
              {success}
            </div>
          )}
          {records.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <FileText size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No reports found for this access method.</p>
            </div>
          ) : (
            records.map((record) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={record._id} 
                className="glass-card" 
                style={{ padding: '1.25rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--primary)' }}>{record.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.35rem' }}>
                      <Calendar size={12} /> {new Date(record.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--secondary)' }}>
                    Integrity Verified
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px', fontSize: '0.9rem', borderLeft: '3px solid var(--primary)' }}>
                  {record.data}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
