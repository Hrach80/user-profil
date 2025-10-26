import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

// ----------------------------------------------------
// Ոճերը (Styles)
// ----------------------------------------------------

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
    // Ոճը փոխվում է կախված ռեժիմից
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

// ----------------------------------------------------
// Կոմպոնենտը (Component)
// ----------------------------------------------------

const RegistrationModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    // Սահմանում ենք ռեժիմը: true = Sign In (Մուտք), false = Sign Up (Գրանցում)
    const [isSignIn, setIsSignIn] = useState(true);

    // Փոփոխում ենք ոճերը կախված ռեժիմից
    const currentNeonColor = isSignIn ? 'var(--neon-blue)' : 'var(--neon-green)';

    // ՖՈՒՆԿՑԻԱ 1: ՄՈՒՏՔ ԳՈՐԾԵԼ (Sign In)
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        setLoading(false);
        if (error) {
            setMessage(`Սխալ մուտքի ժամանակ: ${error.message}`);
        } else {
            setMessage('Հաջող մուտք: Կուղղորդվեք պրոֆիլի էջ։');
            // Մուտքից հետո փակել մոդալը, App.jsx-ի AuthChecker-ը կկատարի redirect-ը:
            onClose();
        }
    };

    // ՖՈՒՆԿՑԻԱ 2: ԳՐԱՆՑՎԵԼ (Sign Up)
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        setLoading(false);
        if (error) {
            setMessage(`Սխալ գրանցման ժամանակ: ${error.message}`);
        } else {
            setMessage('Հաջողությամբ գրանցվեցիք։ Ստուգեք Ձեր էլ. փոստը հաստատելու համար։');
            // Մաքրել դաշտերը
            setEmail('');
            setPassword('');
        }
    };

    // ՖՈՐՄԱՅԻ ԳՈՐԾՈՂՈՒԹՅԱՆ ԸՆՏՐՈՒԹՅՈՒՆ
    const handleSubmit = isSignIn ? handleSignIn : handleSignUp;

    if (!isOpen) return null;

    return (
        <div style={modalStyle} onClick={onClose}>
            <div
                style={{
                    ...modalContentStyle,
                    boxShadow: `0 0 20px ${currentNeonColor}, 0 0 40px ${currentNeonColor}`,
                    border: `2px solid ${currentNeonColor}`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{
                    color: currentNeonColor,
                    textShadow: `0 0 10px ${currentNeonColor}`
                }}>
                    {isSignIn ? 'Մուտք Գործել' : 'Գրանցվել'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Էլ. փոստ"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        // Input-ի ոճը կարգավորում ենք ընթացիկ գույնով
                        style={{ ...inputStyle, border: `1px solid ${currentNeonColor}`, boxShadow: `0 0 5px ${currentNeonColor}` }}
                    />
                    <input
                        type="password"
                        placeholder="Գաղտնաբառ"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ ...inputStyle, border: `1px solid ${currentNeonColor}`, boxShadow: `0 0 5px ${currentNeonColor}` }}
                    />

                    <button
                        type="submit"
                        className="neon-button"
                        disabled={loading}
                        style={{
                            border: `2px solid ${currentNeonColor}`,
                            color: currentNeonColor
                        }}
                    >
                        {loading ? 'Բեռնվում է...' : isSignIn ? 'ՄՈՒՏՔ ԳՈՐԾԵԼ' : 'ԳՐԱՆՑՎԵԼ'}
                    </button>

                    {message && <p style={{ marginTop: '15px', color: message.includes('Սխալ') ? 'red' : currentNeonColor }}>{message}</p>}
                </form>

                {/* Փոխել Ռեժիմը Մուտքի/Գրանցման Կոճակ */}
                <button
                    className="neon-button"
                    onClick={() => {
                        setIsSignIn(!isSignIn); // Փոխում է ռեժիմը
                        setMessage(''); // Մաքրում է հաղորդագրությունը
                        setEmail('');
                        setPassword('');
                    }}
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#333',
                        border: '2px solid var(--neon-pink)',
                        color: 'var(--neon-pink)'
                    }}
                >
                    {isSignIn ? 'Չունե՞ք հաշիվ։ Գրանցվել' : 'Արդեն հաշիվ ունե՞ք։ Մուտք'}
                </button>

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