// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabase/supabaseClient';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import './styles/GlobalStyles.css'; // Գլոբալ ոճերի ներմուծում

// Կոմպոնենտ, որը ստուգում է ավտորիզացիան և ուղղորդում
const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // Եթե ավտորիզացիան փոխվում է, ուղղորդել
        if (_event === 'SIGNED_IN') {
          navigate('/profile');
        }
        if (_event === 'SIGNED_OUT' && location.pathname === '/profile') {
          navigate('/');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Բեռնվում է...</div>;
  }

  // Եթե չկա սեսիա, իսկ էջը պահանջում է ավտորիզացիա, ուղղորդել գլխավոր
  const isProfileRoute = window.location.pathname === '/profile';
  if (isProfileRoute && !session) {
    navigate('/');
    return null;
  }

  return children;
};


const App = () => {
  return (
    <Router>
      <AuthChecker>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AuthChecker>
    </Router>
  );
};

export default App;