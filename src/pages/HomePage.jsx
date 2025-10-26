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
    backgroundColor: 'var(--dark-surface)',
    borderRadius: 'var(--border-radius)',
    padding: '30px',
    boxShadow: '0 0 30px rgba(0, 191, 255, 0.4), 0 0 60px rgba(0, 191, 255, 0.2)',
    border: '2px solid var(--neon-blue)',
    transition: 'box-shadow 0.5s ease-in-out',
};
const imageContainerStyle = {
    flex: 1,
    minWidth: '300px',
    background: 'linear-gradient(45deg, rgba(0, 255, 194, 0.05), rgba(0, 191, 255, 0.05))',
    padding: '15px',
    borderRadius: 'var(--border-radius)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink)',
    border: '2px solid var(--neon-pink)',
    transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
    maxWidth: '350px',
};

const modalSectionStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
};


const InteractiveStyles = `
    /* Hover ազդեցություն հիմնական կոնտեյների վրա */
    .content-container:hover {
        box-shadow: 0 0 40px var(--neon-blue), 0 0 80px rgba(0, 191, 255, 0.4);
    }
    
    /* Hover ազդեցություն նկարի վրա */
    .hrach-image {
        /* Անիմացիայի մուտքը */
        transform: scale(1);
    }
    .hrach-image:hover {
        transform: scale(1.03) rotate(1deg); /* Փոքր շարժում և թեքություն */
        box-shadow: 0 0 15px var(--neon-pink), 0 0 35px var(--neon-pink), 0 0 50px rgba(255, 0, 119, 0.6);
        cursor: pointer;
    }

    /* Ռեսպոնզիվ ոճեր */
    @media (max-width: 900px) {
        .content-container {
            flex-direction: column; 
            padding: 25px;
        }
        .image-container, .modal-section {
            min-width: unset;
            width: 100%;
        }
        .hrach-image {
            max-width: 80%; 
            height: auto;
        }
    }
    
    @media (max-width: 500px) {
        .hrach-image {
            max-width: 100%;
        }
    }
`;

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={pageStyle}>
            <style>{InteractiveStyles}</style>

            <div style={contentContainerStyle} className="content-container">
                <div style={imageContainerStyle} className="image-container">
                    <img
                        src={HRACYA_IMAGE_PATH}
                        alt="Հրաչյա"
                        style={imageStyle}
                        className="hrach-image"
                    />
                    <h3 style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        color: 'var(--neon-pink)',
                        textShadow: 'var(--shadow-pink)' 
                    }}>
                        Մուտք գործեք ինքնակենսագրությունը տեսնելու համար
                    </h3>
                </div>
                <div style={modalSectionStyle} className="modal-section">
                    <h2 style={{ color: 'var(--neon-green)', textShadow: 'var(--shadow-green)' }}>
                        ԲԱՐԻ ԳԱԼՈՒՍՏ!
                    </h2>
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