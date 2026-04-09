import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Activity, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem' }}>
            Next Generation Healthcare Security
          </span>
          <h1 style={{ fontSize: '4rem', marginTop: '1rem', lineHeight: 1.1 }}>
            Secure your <span style={{ color: 'var(--primary)' }}>Health Records</span> with Advanced Encryption.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '2rem auto' }}>
            A unified platform for patients and doctors to manage medical history with AES-256 grade confidentiality and real-time integrity verification.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {[
          { icon: <Lock size={32} />, title: "AES Encryption", desc: "Military-grade encryption ensures your medical data is unreadable to unauthorized entities." },
          { icon: <Activity size={32} />, title: "Data Integrity", desc: "Cryptographic hashing prevents unnoticed tampering with your vital medical history." },
          { icon: <Users size={32} />, title: "Role Control", desc: "Fine-grained access control specifically designed for patient-doctor ecosystems." }
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            className="glass-card"
            whileHover={{ y: -10, borderColor: 'var(--primary)' }}
            style={{ padding: '2.5rem' }}
          >
            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{feature.icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Landing;
