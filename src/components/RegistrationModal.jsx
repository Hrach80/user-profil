import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom'; // ԿԱՐԵՎՈՐ. Ավելացվել է

// ----------------------------------------------------
// Ոճերը (Styles)
// ----------------------------------------------------

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out',
};

const modalContentStyle = {
    backgroundColor: 'var(--dark-surface)',
    padding: '30px',
    borderRadius: 'var(--border-radius)',
    width: '90%',
    maxWidth: '400px',
    transition: 'box-shadow 0.3s ease-in-out',
    animation: 'slideIn 0.4s ease-out',
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '12px 0',
    backgroundColor: 'var(--dark-bg)',
    border: '1px solid transparent',
    color: 'var(--text-color)',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontSize: '1em',
};

// ----------------------------------------------------
// CSS Անիմացիա և Ռեսպոնսիվ ոճեր
// ----------------------------------------------------

const ModalAnimationStyles = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .modal-input:focus {
        background-color: #2a2a2a;
        box-shadow: 0 0 10px var(--input-shadow-color); 
        border-color: var(--input-shadow-color);
    }
    @media (max-width: 500px) {
        .modal-content {
            padding: 20px;
        }
    }
`;

// ----------------------------------------------------
// Կոմպոնենտը (Component)
// ----------------------------------------------------

const RegistrationModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);

    const navigate = useNavigate(); // ԿԱՐԵՎՈՐ ԼՐԱՑՈՒՄ: useNavigate-ի կանչը

    const currentNeonColor = isSignIn ? 'var(--neon-blue)' : 'var(--neon-green)';
    const headerText = isSignIn ? 'ՄՈՒՏՔ ԳՈՐԾԵԼ' : 'ԳՐԱՆՑՎԵԼ';
    const mainButtonText = loading ? 'Բեռնվում է...' : isSignIn ? 'ՄՈՒՏՔ ԳՈՐԾԵԼ' : 'ԳՐԱՆՑՎԵԼ';
    const switchButtonText = isSignIn ? 'Չունե՞ք հաշիվ։ Գրանցվել' : 'Արդեն հաշիվ ունե՞ք։ Մուտք';

    // ՖՈՒՆԿՑԻԱ 1: ՄՈՒՏՔ ԳՈՐԾԵԼ (Sign In)
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setMessage(`Սխալ մուտքի ժամանակ: ${error.message}`);
            } else {
                setMessage('Հաջող մուտք: Կուղղորդվեք պրոֆիլի էջ։');
                onClose();
                navigate('/profile'); // ԿԱՐԵՎՈՐ: Նավիգացիա
            }
        } catch (error) {
            setMessage(`Անսպասելի սխալ: ${error.message}`);
        } finally {
            setLoading(false); // Ամեն դեպքում անջատում ենք loading-ը
        }
    };

    // ՖՈՒՆԿՑԻԱ 2: ԳՐԱՆՑՎԵԼ (Sign Up)
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                setMessage(`Սխալ գրանցման ժամանակ: ${error.message}`);
            } else {
                setMessage('Հաջողությամբ գրանցվեցիք։ Ստուգեք Ձեր էլ. փոստը հաստատելու համար։');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setMessage(`Անսպասելի սխալ: ${error.message}`);
        } finally {
            setLoading(false); // Ամեն դեպքում անջատում ենք loading-ը
        }
    };

    const handleSubmit = isSignIn ? handleSignIn : handleSignUp;

    if (!isOpen) return null;

    return (
        <div style={modalStyle} onClick={onClose}>
            <style>{ModalAnimationStyles}</style>

            <div
                style={{
                    ...modalContentStyle,
                    boxShadow: `0 0 20px ${currentNeonColor}, 0 0 40px ${currentNeonColor}`,
                    border: `2px solid ${currentNeonColor}`
                }}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: currentNeonColor,
                    textShadow: `0 0 10px ${currentNeonColor}`
                }}>
                    {headerText}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* INPUT - Էլ. փոստ */}
                    <input
                        type="email"
                        placeholder="Էլ. փոստ"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="modal-input"
                        style={{ ...inputStyle, '--input-shadow-color': currentNeonColor }}
                    />
                    {/* INPUT - Գաղտնաբառ */}
                    <input
                        type="password"
                        placeholder="Գաղտնաբառ"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="modal-input"
                        style={{ ...inputStyle, '--input-shadow-color': currentNeonColor }}
                    />

                    {/* ՀԻՄՆԱԿԱՆ ԳՈՐԾՈՂՈՒԹՅԱՆ ԿՈՃԱԿ */}
                    <button
                        type="submit"
                        className="neon-button"
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: '20px',
                            border: `2px solid ${currentNeonColor}`,
                            color: currentNeonColor
                        }}
                    >
                        {mainButtonText}
                    </button>

                    {message && <p style={{ marginTop: '15px', textAlign: 'center', color: message.includes('Սխալ') ? 'var(--neon-pink)' : currentNeonColor }}>{message}</p>}
                </form>

                {/* Փոխել Ռեժիմը Կոճակ */}
                <button
                    className="neon-button"
                    onClick={() => {
                        setIsSignIn(!isSignIn);
                        setMessage('');
                        setEmail('');
                        setPassword('');
                    }}
                    style={{
                        width: '100%',
                        marginTop: '20px',
                        backgroundColor: '#333',
                        border: '2px solid var(--neon-pink)',
                        color: 'var(--neon-pink)'
                    }}
                >
                    {switchButtonText}
                </button>

                {/* Փակել Կոճակ */}
                <button
                    className="neon-button"
                    onClick={onClose}
                    style={{
                        width: '100%',
                        marginTop: '10px',
                        backgroundColor: 'transparent',
                        border: '2px solid #555',
                        color: '#aaa',
                        boxShadow: 'none'
                    }}
                >
                    Փակել
                </button>
            </div>
        </div>
    );
};

export default RegistrationModal;