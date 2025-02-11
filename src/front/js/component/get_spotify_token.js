const axios = require('axios');

// Reemplaza con tus credenciales de Spotify
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

// Obtén el token de acceso
async function getAccessToken() {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await axios.post(tokenUrl, params, { headers });
        return response.data.access_token;
    } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
    }
}

module.exports = { getAccessToken };