import React from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../pages/ProfilePage.css';

const HRACYA_IMAGE_PATH = '/hrach.png';

const profileData = {
    title: "Հրաչյա Մնացականի Վաղարշակյան",
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
            content: "Այժմ զբաղվում է ծրագրավորմով՝ մասնագիտանալով որպես **Ֆրոնտենդ Ծրագրավորող**։ Ունի փորձ ժամանակակից տեխնոլոգիաների հետ, որոնք թույլ են տալիս ստեղծել դինամիկ և արդյունավետ վեբ հավելվածներ։",
        }
    ],
    skills: [
        'JavaScript (ES6+)', 'React.js / Redux', 'HTML5 / CSS3', 'Sass / Styled Components',
        'Domain Setup', 'Git / GitHub', 'Vite / Webpack', 'Supabase (Authentication/Database)',
        'REST APIs','Responsive Design', 'Vercel Deployment'
    ]
};

const handleSignOut = async (navigate) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Սխալ մուտքից դուրս գալիս:', error.message);
    } else {
        navigate('/');
    }
};

const ProfilePage = () => {
    const [hoveredSkill, setHoveredSkill] = React.useState(null);
    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <div className="top-bar">
                <button
                    className="neon-button"
                    onClick={() => handleSignOut(navigate)}
                >
                    Դուրս գալ (Sign Out)
                </button>
            </div>

        
            <div className="profile-content">
                <img
                    src={profileData.image}
                    alt="Հրաչյա Վաղարշակյան"
                    className="profile-image"
                />
                <div className="profile-header">
                    <h1>{profileData.title}</h1>
                </div>

                <div className="profile-bio">
                    {profileData.bio.map((section, index) => (
                        <div key={index}>
                            <h3>{section.subtitle}</h3>
                            <p>{section.content}</p>
                        </div>
                    ))}

                    <div className="skills-container">
                        <h2>Տեխնիկական Հմտություններ (Tech Stack)</h2>
                        <div>
                            {profileData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className={`skill-badge ${hoveredSkill === index ? 'hovered' : ''}`}
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
