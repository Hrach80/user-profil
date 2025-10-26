import React from 'react';
import { supabase } from '../supabase/supabaseClient';

const HRACYA_IMAGE_PATH = '/hrach.png';
const profileData = {
    title: "Հրաչյա Մնացականի Վաղարշակյան / Պրոֆիլի Ամփոփում",
    image: HRACYA_IMAGE_PATH,
    bio: [
        {
            subtitle: "Զինվորական Կարիերա",
            content: "Հրաչյա Մնացականի Վաղարշակյանը ծնվել է 1980թ. դեկտեմբերի 2-ին Երևանում։ 1997թ-ին ավարտել է թիվ 22 միջնակարգ դպրոցը և ընդունվել ՀՀ Բարձրագույն Զինվորական Բազմաբնույթ Հրամանատարական ուսումնարան, որը հետագայում վերանվանվեց Սպարապետ Վազգեն Սարգսյանի անվան ռազմական ինստիտուտ (ՌԻ)։",
        },
        {
            subtitle: "Ծառայություն և Կրթություն",
            content: "2001թ-ին ավարտելով ՌԻ-ը՝ ծառայությունը շարունակել է Լեռնային Ղարաբաղի Հանրապետությունում որպես դասակի հրամանատարի դաստիարակչական գծով տեղակալ։ 2007-2008թթ անցել է վերապատրաստում Չինաստանի Ժողովրդական Հանրապետության Նանկին քաղաքի Հրամանատարական ակադեմիայում։ Վերադառնալով նշանակվել է Գումարտակի Շտաբի պետ ՀՀ X զորամասում, որտեղ ծառայել է մինչև 2017թ-ը։ Այժմ գտնվում է պահեստազորում։",
        },
        {
            subtitle: "Frontend Development",
            content: "Այժմ զբաղվում է ծրագրավորումով՝ մասնագիտանալով որպես **Ֆրոնտենդ Ծրագրավորող**։ Ունի փորձ ժամանակակից տեխնոլոգիաների հետ, որոնք թույլ են տալիս ստեղծել դինամիկ և արդյունավետ վեբ հավելվածներ։",
        }
    ],
    skills: [
        'JavaScript (ES6+)', 'React.js / Redux', 'HTML5 / CSS3', 'Sass / Styled Components',
        'Node.js (Basic)', 'Git / GitHub', 'Vite / Webpack', 'Supabase (Authentication/Database)',
        'REST APIs', 'SQL (Basic)', 'Responsive Design', 'Vercel Deployment'
    ]
};



const profilePageStyle = {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    color: 'var(--text-color)',
};

const profileHeaderStyle = {
    textAlign: 'center',
    marginBottom: '40px',
};

const profileContentStyle = {
    display: 'flex',
    gap: '30px',
    padding: '30px',
    backgroundColor: 'var(--dark-surface)',
    borderRadius: 'var(--border-radius)',
    boxShadow: '0 0 15px rgba(0, 191, 255, 0.2)',
};

const profileImageStyle = {
    flex: '0 0 220px',
    width: '220px',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 0 15px var(--neon-blue), 0 0 30px var(--neon-blue)',
    border: '2px solid var(--neon-blue)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
};

const profileBioStyle = {
    flex: 1,
    lineHeight: 1.8,
    fontSize: '1.1em',
};

const skillsContainerStyle = {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid var(--neon-green)',
};

const skillBadgeStyle = {
    display: 'inline-block',
    padding: '8px 15px',
    margin: '5px',
    borderRadius: '5px',
    backgroundColor: 'var(--neon-green)',
    color: '#000',
    fontSize: '0.9em',
    fontWeight: 'bold',
    textShadow: '0 0 3px #fff',
    boxShadow: '0 0 5px var(--neon-green)',
    transition: 'transform 0.2s',
};

const skillBadgeHoverStyle = {
    transform: 'scale(1.05)',
    backgroundColor: 'var(--neon-blue)',
    boxShadow: '0 0 10px var(--neon-blue)',
    color: '#fff',
    cursor: 'pointer',
};


const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Սխալ մուտքից դուրս գալիս:', error.message);
    }
};

const ProfileMediaStyles = `
    @media (max-width: 900px) {
        .profile-content {
            flex-direction: column;
            align-items: center;
        }
        .profile-image {
            /* Բջջայինի վրա ավելի փոքր չափս */
            flex: unset;
            width: 150px; 
            height: 150px;
            max-width: 150px; 
            margin-bottom: 20px;
        }
    }
`;


const ProfilePage = () => {
    const [hoveredSkill, setHoveredSkill] = React.useState(null);

    return (
        <div style={profilePageStyle}>
            <style>{ProfileMediaStyles}</style>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
                <button className="neon-button" onClick={handleSignOut} style={{ border: '2px solid var(--neon-pink)' }}>
                    Դուրս գալ (Sign Out)
                </button>
            </div>

            <div style={profileHeaderStyle}>
                <h1 style={{ color: 'var(--neon-green)', textShadow: 'var(--shadow-green)' }}>{profileData.title}</h1>
            </div>

            <div style={profileContentStyle} className="profile-content">
                <img
                    src={profileData.image}
                    alt="Հրաչյա Վաղարշակյան"
                    style={profileImageStyle}
                    className="profile-image"
                />
                <div style={profileBioStyle}>
                    {profileData.bio.map((section, index) => (
                        <div key={index} style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: 'var(--neon-blue)', marginBottom: '10px' }}>
                                {section.subtitle}
                            </h3>
                            <p>{section.content}</p>
                        </div>
                    ))}

                    <div style={skillsContainerStyle}>
                        <h2 style={{ color: 'var(--neon-green)', textShadow: 'var(--shadow-green)', marginBottom: '20px' }}>
                            Տեխնիկական Հմտություններ (Tech Stack)
                        </h2>
                        <div>
                            {profileData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    style={{
                                        ...skillBadgeStyle,
                                        ...(hoveredSkill === index ? skillBadgeHoverStyle : {})
                                    }}
                                    onMouseEnter={() => setHoveredSkill(index)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;