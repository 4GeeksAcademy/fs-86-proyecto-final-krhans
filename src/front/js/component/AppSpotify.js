import React, { useState, useEffect } from 'react';
import WebPlaybackSpotify from './components/WebPlaybackSpotify';
import LoginSpotify from './components/LoginSpotify';
import '../../styles/AppSpotify.css';


function AppSpotify() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
      {token === '' ? <LoginSpotify /> : <WebPlaybackSpotify token={token} />}
    </>
  );
}

export default AppSpotify;