
const axios = require('axios');

// Reemplaza con tus credenciales de Spotify desde el archivo .env
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;
let tokenExpirationTime = null;

// Obtén el token de acceso
export const getAccessToken = async () => {
    const currentTime = new Date().getTime();

    // Verifica si el token es válido y no ha expirado
    if (accessToken && tokenExpirationTime && currentTime < tokenExpirationTime) {
        return accessToken;
    }

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await axios.post(tokenUrl, params, { headers });
        const data = response.data;

        // Actualiza el token de acceso y el tiempo de expiración
        accessToken = data.access_token;
        tokenExpirationTime = currentTime + data.expires_in * 1000; // expires_in está en segundos

        return accessToken;
    } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
    }
}

