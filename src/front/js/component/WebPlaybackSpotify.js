import React, { useState, useEffect } from 'react';

function WebPlaybackSpotify({ token }) {
  const [player, setPlayer] = useState(undefined);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState({
    name: "",
    album: { images: [{ url: "" }] },
    artists: [{ name: "" }]
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', state => {
        if (!state) return;

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then(state => {
          (!state) ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, [token]);

  return (
    <div className="container">
      <div className="main-wrapper">
        <img src={currentTrack.album.images[0].url} className="now-playing__cover" alt="" />
        <div className="now-playing__side">
          <div className="now-playing__name">{currentTrack.name}</div>
          <div className="now-playing__artist">{currentTrack.artists[0].name}</div>
          <button className="btn-spotify" onClick={() => player.previousTrack()}>&lt;&lt;</button>
          <button className="btn-spotify" onClick={() => player.togglePlay()}>{isPaused ? "PLAY" : "PAUSE"}</button>
          <button className="btn-spotify" onClick={() => player.nextTrack()}>&gt;&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default WebPlaybackSpotify;