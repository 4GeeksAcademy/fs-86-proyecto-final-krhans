const axios = require('axios');
const { getAccessToken } = require('./get_spotify_token');

// Realiza una solicitud a la API de Spotify
async function searchTrack(query) {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await axios.get(url, { headers });
        console.log('Resultados de la búsqueda:', response.data);
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
    }
}

// Ejemplo de uso
searchTrack('Imagine Dragons');