import requests
import base64
import os
from dotenv import load_dotenv

# Cargar las variables de entorno del archivo .env
load_dotenv()

# Obtener las credenciales de Spotify desde el archivo .env
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

def get_spotify_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode(),
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        print("Error obteniendo el token:", response.json())
        return None

def get_artist_info(artist_name):
    token = get_spotify_token()
    if not token:
        return "No se pudo obtener el token."

    url = f"https://api.spotify.com/v1/search?q={artist_name}&type=artist&limit=1"
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        if data["artists"]["items"]:
            artist = data["artists"]["items"][0]  # Tomamos el primer resultado
            return {
                "nombre": artist["name"],
                "popularidad": artist["popularity"],
                "followers": artist["followers"]["total"],
                "imagen": artist["images"][0]["url"] if artist["images"] else None
            }
        else:
            return "No se encontró el artista."
    else:
        return f"Error en la petición: {response.json()}"

# 🔹 Prueba la función con un artista (por ejemplo, Eminem)
if __name__ == "__main__":
    artista = get_artist_info("Eminem")
    print("Datos del artista:", artista)