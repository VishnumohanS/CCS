import React, { useState } from 'react';
import api from '../services/api';
import { Search, User, Lock, ShieldCheck, Activity, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorDashboard = () => {
  const [patientId, setPatientId] = useState('');
  const [patientRecords, setPatientRecords] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [title, setTitle] = useState('');
  const [data, setData] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!patientId || !title || !data) return;
    setIsCreating(true);
    setError('');
    setSuccess('');
    try {
      const response = await api.post('/records', {
        patientId,
        title,
        data,
        secretCode: secretCode.trim() || undefined
      });
      setTitle('');
      setData('');
      setSecretCode('');
      setSuccess(
        response.data.hasSecretCode
          ? 'Report created. Share patient ID and secret code with patient.'
          : 'Report created. Patient can use their MongoDB patient ID to view.'
      );
      await handleSearch();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create report.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!patientId) return;
    setIsSearching(true);
    setSuccess('');
    try {
      const { data } = await api.get(`/records/patient/${patientId}`);
      setPatientRecords(data);
      if (data.length === 0) setError('No records found for this Patient ID.');
    } catch (err) {
      setError('Unauthorized access or invalid Patient ID.');
      setPatientRecords([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Medical Professional Gateway</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Create encrypted reports for patients. Patients can access them using patient ID or secret code.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '3rem' }}>
        <form className="glass-card" onSubmit={handleCreateReport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Create Patient Report
          </h3>
          <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Patient MongoDB ID</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Paste patient MongoDB ID..."
                style={{ paddingLeft: '3rem' }}
                required
              />
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Report Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Blood Test Result" />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Report Details</label>
            <textarea
              rows="5"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter patient report details..."
              required
              style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', color: 'white', resize: 'vertical' }}
            />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Secret Code (Optional)</label>
            <input
              type="text"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              placeholder="Optional: share this secret code with patient"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isCreating}>
            {isCreating ? 'Saving...' : 'Encrypt & Save Report'}
          </button>
        </form>

        <form className="glass-card" onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Search Reports by Patient ID</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient MongoDB ID"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-end', height: '48px' }}>
            {isSearching ? 'Loading...' : 'View Reports'}
          </button>
        </form>
      </div>

      <div>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} /> Record Results
        </h3>

        {error && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--error)', background: 'rgba(239, 68, 68, 0.05)' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '1.25rem', color: 'var(--secondary)', background: 'rgba(16, 185, 129, 0.08)', marginBottom: '1rem' }}>
            {success}
          </div>
        )}

        {!error && patientRecords.length === 0 && !isSearching && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <User size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p>Create or search reports using patient ID.</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem' }}>
          {patientRecords.map((record) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={record._id} 
              className="glass-card" 
              style={{ borderLeft: '4px solid var(--secondary)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--primary)' }}>{record.title}</h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--secondary)' }} title="Hash Verified" />
                  <Lock size={18} style={{ color: 'var(--secondary)' }} title="AES Decrypted" />
                </div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '6px', fontSize: '0.95rem' }}>
                {record.data}
              </div>
              <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Patient: {record.patientId}</span>
                <span>ID: {record._id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
