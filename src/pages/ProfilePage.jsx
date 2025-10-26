

import React from 'react';
import { supabase } from '../supabase/supabaseClient';
const HRACYA_IMAGE_PATH = '/hrach.png';

const profileData = {
    title: "Հրաչյա Վաղարշակյանի / Հայկազունու Մանրամասն Ինքնակենսագրություն",
    image: HRACYA_IMAGE_PATH, 
    bio: [
        "Հրաչյա (ըստ պատմական աղբյուրների՝ Հրաչյա Հայկազունի) հայոց թագավոր, Պարույր Սկայորդու որդին և հաջորդը։ Մովսես Խորենացու «Հայոց պատմության» մեջ հիշատակվում է որպես Հայկազունիների թագավորության ութերորդ արքա։",
        "Ըստ Խորենացու նկարագրության՝ նա ժամանակակից է եղել Նոր Բաբելոնիայի թագավոր Նաբուգոդոնոսոր I-ին։ Հրաչյան համարվում է այն թագավորը, ով Հայաստանում տեղ է հատկացրել հրեա որոշ գաղթականների, մասնավորապես՝ Բագրատունիների նախնի Շամբատի տոհմին (մ. թ. ա. 597 թվականին)։",
        "Հրաչյա անունը ժողովրդի մեջ մնացել է որպես իմաստուն և հյուրընկալ թագավորի անուն։"
    ],
};

const profilePageStyle = {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
};

const profileHeaderStyle = {
    textAlign: 'center',
    marginBottom: '40px',
};

const profileContentStyle = {
    display: 'flex',
    gap: '30px',
};

const profileImageStyle = {
    flex: '0 0 350px',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 15px var(--neon-green), 0 0 30px var(--neon-green)',
};

const profileBioStyle = {
    flex: 1,
    lineHeight: 1.8,
    fontSize: '1.1em',
};

const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Սխալ մուտքից դուրս գալիս:', error.message);
    }
};

// Media Query Logic
const ProfileMediaStyles = `
    @media (max-width: 900px) {
        .profile-content {
            flex-direction: column;
            align-items: center;
        }
        .profile-image {
            flex: unset;
            width: 100%;
            max-width: 400px;
            margin-bottom: 20px;
        }
    }
`;

const ProfilePage = () => {
    return (
        <div style={profilePageStyle}>
            <style>{ProfileMediaStyles}</style>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
                <button className="neon-button" onClick={handleSignOut} style={{ border: '2px solid var(--neon-pink)' }}>
                    Դուրս գալ
                </button>
            </div>
            <div style={profileHeaderStyle}>
                <h1>{profileData.title}</h1>
            </div>

            <div style={profileContentStyle} className="profile-content">
                <img
                    src={profileData.image}
                    alt="Հրաչյա"
                    style={profileImageStyle}
                    className="profile-image"
                />
                <div style={profileBioStyle}>
                    {profileData.bio.map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: '15px' }}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;