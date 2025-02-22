export const SoundCloudDispatcher = {

    getAccessToken : async () => {
        const storedToken = localStorage.getItem("soundcloud_token");
        const tokenExpiration = localStorage.getItem("soundcloud_token_expiration");
    
        if (storedToken && tokenExpiration && Date.now() < parseInt(tokenExpiration, 10)) {
            return storedToken;
        }
    
        try {
            const response = await fetch("https://api.soundcloud.com/oauth2/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID,
                    client_secret: process.env.REACT_APP_SOUNDCLOUD_CLIENT_SECRET,
                }),
            });
    
            const data = await response.json();
            if (data.access_token) {
                const expirationTime = Date.now() + data.expires_in * 1000; 
                localStorage.setItem("soundcloud_token", data.access_token);
                localStorage.setItem("soundcloud_token_expiration", expirationTime.toString());
    
                return data.access_token;
            } else {
                console.error("Error obteniendo el token:", data);
                return null;
            }
        } catch (error) {
            console.error("Error al autenticar con OAuth:", error);
            return null;
        }
    },
    getTracksByGenre: async (genre) => {
        try {
            let token = localStorage.getItem("soundcloud_token");
            let tokenExpiration = localStorage.getItem("soundcloud_token_expiration");

            if (!token || !tokenExpiration || Date.now() >= parseInt(tokenExpiration, 10)) {
                token = await SoundCloudDispatcher.getAccessToken();
                if (!token) {
                    throw new Error("No se pudo obtener un token válido.");
                }
            }
    
            const response = await fetch(`https://api.soundcloud.com/tracks?genres=${encodeURIComponent(genre)}&limit=10`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error obteniendo tracks: ${errorData.error || response.statusText}`);
            }
    
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("❌ Error en getTracksByGenre:", error.message);
            return [];
        }
    },
    

    // getStreamUrl: async (trackId) => {
    //     const tokenData = JSON.parse(localStorage.getItem("soundcloud_token")) || await SoundCloudDispatcher.getAccessToken();
    //     const token = tokenData.access_token; 

    //     const response = await fetch(`https://api.soundcloud.com/tracks/${trackId}?client_id=${SoundCloudDispatcher.CLIENT_ID}`, {
    //         headers: {
    //             "Authorization": `Bearer ${token}` 
    //         }
    //     });

    //     const trackData = await response.json();
    //     if (!response.ok || !trackData.stream_url) {
    //         throw new Error(`Error obteniendo URL de streaming: ${trackData.error}`);
    //     }
    //     return trackData.stream_url;
    // },

    // createPlaylist: async (title, trackIds) => {
    //     if (!trackIds.length) {
    //         throw new Error("La lista de pistas está vacía");
    //     }

    //     const tokenData = JSON.parse(localStorage.getItem("soundcloud_token")) || await SoundCloudDispatcher.getAccessToken();
    //     const token = tokenData.access_token; 

    //     const response = await fetch("https://api.soundcloud.com/playlists", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": `Bearer ${token}`, 
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             playlist: {
    //                 title: title,
    //                 tracks: trackIds.map(id => ({ id })),
    //                 sharing: "public"
    //             }
    //         })
    //     });

    //     const data = await response.json();
    //     if (!response.ok) {
    //         throw new Error(`Error creando playlist: ${data.error}`);
    //     }
    //     return data;
    // }
};
