import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import RegistrationModal from '../components/RegistrationModal';
import { useNavigate } from 'react-router-dom';
import '../pages/HonePages.css'; // ԿԱՐԵՎՈՐ. Ներառում ենք CSS ֆայլը

// ----------------------------------------------------
// Պատկերի Ճանապարհը
// ----------------------------------------------------
const HRACYA_IMAGE_PATH = '/hrach.png';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Ֆունկցիոնալ լոգիկան՝ session-ը ստուգելու համար (ԱՆՓՈՓՈԽ)
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
        // Բեռնման էկրան (Կիրառում ենք inline style, քանի որ սա ժամանակավոր վիճակ է)
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
        <div className="home-page">
            {/* <style>{ResponsiveStyles}</style> հեռացվել է */}

            <div className="main-container">

                {/* Ձախ մաս - Նկար */}
                <div className="image-section">
                    <img
                        src={HRACYA_IMAGE_PATH}
                        alt="Պրոֆիլի նկար"
                        className="image-style"
                    />
                    <p className="image-text">
                        Մուտք գործեք ինքնակենսագրությունը տեսնելու համար
                    </p>
                </div>

                {/* Աջ մաս - Տեքստ և Կոճակ */}
                <div className="text-section">
                    <h2 className="header-style">
                        Բարի գալուստ!
                    </h2>
                    <p className="sub-text">
                        Գրանցվեք և մուտք գործեք պրոֆիլ։
                        <strong>(Կայքի Bekend մասը ստեղծվել է supabase-ի միջոցով )</strong>
                    </p>

                    <button
                        className="neon-button home-button"
                        onClick={() => setIsModalOpen(true)}
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