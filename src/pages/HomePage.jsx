
import React, { useState } from 'react';
import RegistrationModal from '../components/RegistrationModal';

const HRACYA_IMAGE_PATH = '/hrach.png';
const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
};

const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    maxWidth: '1000px',
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 0 30px var(--neon-blue), 0 0 60px var(--neon-blue)',
    border: '2px solid var(--neon-blue)',
};

const imageContainerStyle = {
    flex: 1,
    minWidth: '300px',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink)',
};

const modalSectionStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
};

const MobileMediaStyles = `
    @media (max-width: 768px) {
        .content-container {
            flex-direction: column; 
            padding: 20px;
        }
        .image-container, .modal-section {
            min-width: unset;
            width: 100%;
        }
    }
`;


const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={pageStyle}>
            <style>{MobileMediaStyles}</style>
            <div style={contentContainerStyle} className="content-container">
                <div style={imageContainerStyle} className="image-container">
                    <img src={HRACYA_IMAGE_PATH} alt="Հրաչյա" style={imageStyle} />
                    <h3 style={{ marginTop: '20px', textAlign: 'center', color: 'var(--neon-pink)' }}>Մուտք գործեք ինքնակենսագրությունը տեսնելու համար</h3>
                </div>
                <div style={modalSectionStyle} className="modal-section">
                    <h2>Բարի գալուստ!</h2>
                    <p style={{ marginBottom: '30px', color: 'var(--text-color)' }}>
                        Գրանցվեք կամ մուտք գործեք, որպեսզի տեսնեք Հրաչյայի մանրամասն ինքնակենսագրությունը։
                    </p>
                    <button className="neon-button" onClick={() => setIsModalOpen(true)}>
                        Գրանցվել / Մուտք
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