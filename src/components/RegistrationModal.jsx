// src/components/RegistrationModal.jsx

import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: '#1e1e1e',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 20px var(--neon-green), 0 0 40px var(--neon-green)',
    width: '90%',
    maxWidth: '400px',
    border: '2px solid var(--neon-green)',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#333',
    border: '1px solid var(--neon-blue)',
    color: 'var(--text-color)',
    borderRadius: '5px',
    boxShadow: '0 0 5px var(--neon-blue)',
};

const RegistrationModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(`Սխալ գրանցման ժամանակ: ${error.message}`);
        } else {
            setMessage('Հաջողությամբ գրանցվեցիք։ Ստուգեք Ձեր էլ. փոստը հաստատելու համար։');
            // Supabase-ի onAuthStateChange-ը App.jsx-ում ավտոմատ կուղղորդի դեպի /profile
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div style={modalStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ color: 'var(--neon-green)', textShadow: 'var(--shadow-green)' }}>Գրանցում</h2>
                <form onSubmit={handleSignUp}>
                    <input
                        type="email"
                        placeholder="Էլ. փոստ"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Գաղտնաբառ"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" className="neon-button" disabled={loading} style={{ border: '2px solid var(--neon-green)' }}>
                        {loading ? 'Բեռնվում է...' : 'Գրանցվել'}
                    </button>
                    {message && <p style={{ marginTop: '15px', color: message.includes('Սխալ') ? 'red' : 'var(--neon-green)' }}>{message}</p>}
                </form>
                <button
                    className="neon-button"
                    onClick={onClose}
                    style={{ marginTop: '20px', backgroundColor: '#333', border: '2px solid var(--neon-pink)' }}
                >
                    Փակել
                </button>
            </div>
        </div>
    );
};

export default RegistrationModal;