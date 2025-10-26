import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import RegistrationModal from '../components/RegistrationModal';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------
// Պատկերի Ճանապարհը (Համոզվեք, որ այն ճիշտ է)
// ----------------------------------------------------
const HRACYA_IMAGE_PATH = '/hrach.png';

// ----------------------------------------------------
// ՈՃԵՐ (Styles)
// ----------------------------------------------------

const homePageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--dark-bg, #0a0a0a)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
};

const mainContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap', 
    backgroundColor: 'var(--dark-surface, #1e1e1e)',
    padding: '40px',
    borderRadius: 'var(--border-radius, 10px)',
    maxWidth: '900px',
    width: '100%',
    boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), 0 0 40px rgba(0, 191, 255, 0.2)',
    border: '2px solid var(--neon-blue, #00bfff)',
};

const imageSectionStyle = {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: '40px',
    maxWidth: '300px', 
};

const imageStyle = {
    width: '280px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 0 10px var(--neon-green, #39ff14), 0 0 20px var(--neon-green, #39ff14)',
    border: '3px solid var(--neon-green, #39ff14)',
};

const imageTextStyle = {
    color: 'var(--neon-blue, #00bfff)',
    marginTop: '15px',
    fontSize: '0.9em',
};

const textSectionStyle = {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'var(--text-color, #f0f0f0)',
    minWidth: '300px', 
};

const headerStyle = {
    fontSize: '2em',
    marginBottom: '20px',
    color: 'var(--neon-green, #39ff14)',
    textShadow: '0 0 5px var(--neon-green, #39ff14)',
};

const ResponsiveStyles = `
    @media (max-width: 1024px) {
        .main-container {
            max-width: 98%;
            padding: 28px;
            flex-wrap: wrap;
        }
        .image-section {
            margin-right: 24px;
            max-width: 260px;
        }
        .image-style {
            width: 220px;
        }
        .image-text {
            font-size: 0.9em;
        }
        .text-section {
            min-width: 240px;
        }
        .text-section h2 {
            font-size: 1.6em;
        }
        .text-section p {
            font-size: 1em;
        }
        .neon-button {
            width: 170px;
            font-size: 1.05em;
            padding: 10px 22px;
        }
    }
    @media (max-width: 768px) {
        .main-container {
            flex-direction: column;
            align-items: center;
            padding: 22px 14px;
            box-shadow: none;
        }
        .image-section {
            margin: 0 0 18px 0;
            max-width: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
        }
        .image-style {
            width: 180px;
        }
        .image-text {
            font-size: 0.85em;
        }
        .text-section {
            min-width: 180px;
            width: 100%;
            padding: 0;
        }
        .text-section h2 {
            font-size: 1.3em;
            margin-bottom: 12px;
        }
        .text-section p {
            font-size: 0.95em;
            margin-bottom: 18px;
        }
        .neon-button {
            width: 130px;
            font-size: 0.9em;
            padding: 9px 15px;
        }
    }
    @media (max-width: 480px) {
        .main-container {
            padding: 12px 4px;
            border-width: 1px;
        }
        .image-style {
            width: 120px;
            border-width: 1.5px;
        }
        .image-text {
            font-size: 0.8em;
        }
        .text-section h2 {
            font-size: 1.05em;
        }
        .text-section p {
            font-size: 0.85em;
        }
        .neon-button {
            width: 100px;
            font-size: 0.8em;
            padding: 7px 8px;
        }
    }
`;


const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    // Ֆունկցիոնալ լոգիկան՝ session-ը ստուգելու համար
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
        // Բեռնման էկրան
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
                <div style={textSectionStyle} className="text-section">
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