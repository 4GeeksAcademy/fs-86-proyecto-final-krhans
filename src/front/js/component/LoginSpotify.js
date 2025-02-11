import React from 'react';

const LoginSpotify = () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = "http://localhost:3000"; 
    const scopes = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state"
    ];

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(" "))}`;

    return (
        <div className="App">
            <header className="App-header">
                <a className="btn-spotify" href={loginUrl}>
                    Login with Spotify
                </a>
            </header>
        </div>
    );
};

export default LoginSpotify;