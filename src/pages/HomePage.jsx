import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import RegistrationModal from '../components/RegistrationModal';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------
// ԿԱՐԵՎՈՐ. Պատկերի Ճանապարհը
// ----------------------------------------------------
const HRACYA_IMAGE_PATH = '/hrach.png'; // ԿԱՐԳԱՎՈՐԵՔ: Ենթադրում եմ, որ նկարը այս ճանապարհով է

// ----------------------------------------------------
// Ոճեր (Styles)
// ----------------------------------------------------

// Հիմնական էջի ոճ (Ամբողջ էկրան, կենտրոնացված)
const homePageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--dark-bg, #0a0a0a)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
};

// Կենտրոնական բլոկի ոճը
const mainContainerStyle = {
    display: 'flex',
    backgroundColor: 'var(--dark-surface, #1e1e1e)',
    padding: '40px',
    borderRadius: 'var(--border-radius, 10px)',
    maxWidth: '900px',
    width: '100%',
    boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), 0 0 40px rgba(0, 191, 255, 0.2)', // Ընդգծված նեոնային շրջանակ
    border: '2px solid var(--neon-blue, #00bfff)',
};

// Ձախ մաս (Նկարը)
const imageSectionStyle = {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: '40px',
};

const imageStyle = {
    width: '280px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 0 10px var(--neon-green, #39ff14), 0 0 20px var(--neon-green, #39ff14)', // Նեոնային շրջանակ նկարի շուրջ
    border: '3px solid var(--neon-green, #39ff14)',
};

const imageTextStyle = {
    color: 'var(--neon-blue, #00bfff)',
    marginTop: '15px',
    fontSize: '0.9em',
};

// Աջ մաս (Տեքստը և Կոճակը)
const textSectionStyle = {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'var(--text-color, #f0f0f0)',
};

const headerStyle = {
    fontSize: '2em',
    marginBottom: '20px',
    color: 'var(--neon-green, #39ff14)',
    textShadow: '0 0 5px var(--neon-green, #39ff14)',
};

// ----------------------------------------------------
// ՌԵՍՊՈՆՍԻՎ ՈՃԵՐ (CSS ՏՈՂԵՐՈՎ)
// ----------------------------------------------------

const ResponsiveStyles = `
    @media (max-width: 768px) {
        .main-container {
            flex-direction: column;
            padding: 30px;
        }
        .image-section {
            margin-right: 0;
            margin-bottom: 30px;
            flex: unset;
        }
        .image-style {
            width: 200px;
            height: 200px;
        }
    }
`;

// ----------------------------------------------------
// ԿՈՄՊՈՆԵՆՏԸ (Component)
// ----------------------------------------------------

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Ֆունկցիոնալ լոգիկան մնում է նույնը
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    navigate('/profile');
                }
            } catch (error) {
                console.error("Session check failed:", error);
            } finally {
                setLoading(false);
            }
        };
        checkUserSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setLoading(false);
                if (session) {
                    navigate('/profile');
                }
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [navigate]);

    if (loading) {
        return <div style={{
            textAlign: 'center',
            paddingTop: '150px',
            color: 'var(--neon-blue)',
            fontSize: '2em',
            minHeight: '100vh',
            backgroundColor: 'var(--dark-bg, #0a0a0a)'
        }}>Բեռնում...</div>;
    }

    return (
        <div style={homePageStyle}>
            {/* Ավելացնում ենք ռեսպոնսիվ ոճերը */}
            <style>{ResponsiveStyles}</style>

            <div style={mainContainerStyle} className="main-container">

                {/* Ձախ մաս - Նկար */}
                <div style={imageSectionStyle} className="image-section">
                    <img
                        src={HRACYA_IMAGE_PATH}
                        alt="Պրոֆիլի նկար"
                        style={imageStyle}
                        className="image-style"
                    />
                    <p style={imageTextStyle}>
                        Մուտք գործեք ինքնակենսագրությունը տեսնելու համար
                    </p>
                </div>

                {/* Աջ մաս - Տեքստ և Կոճակ */}
                <div style={textSectionStyle}>
                    <h2 style={headerStyle}>
                        Բարի գալուստ!
                    </h2>
                    <p style={{ marginBottom: '30px', fontSize: '1.1em' }}>
                        Գրանցվեք կամ մուտք գործեք, որպեսզի տեսնեք Հրաչյայի զինվորական մանրամասն և ֆրոնտենդի հմտությունները։
                    </p>

                    <button
                        className="neon-button"
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            border: '2px solid var(--neon-pink, #ff10f0)',
                            color: 'var(--neon-pink, #ff10f0)',
                            padding: '12px 30px',
                            fontSize: '1.2em',
                            alignSelf: 'center',
                            width: '200px'
                        }}
                    >
                        ԳՐԱՆՑՎԵԼ / ՄՈՒՏՔ
                    </button>
                </div>
            </div>

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default HomePage;